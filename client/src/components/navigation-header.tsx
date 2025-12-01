import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "wouter";
import { Atom, LogOut } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function NavigationHeader() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location] = useLocation();

  const isAdmin = user?.role === 'admin';
  
  const navigation = isAdmin
    ? [
        { name: "Admin Dashboard", href: "/" },
        { name: "Evaluate", href: "/evaluate" },
        { name: "API Access", href: "/api-tokens" },
        { name: "Guide", href: "/guide" },
      ]
    : [
        { name: "Evaluate", href: "/" },
        { name: "API Access", href: "/api-tokens" },
        { name: "Guide", href: "/guide" },
      ];

  const logout = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/logout", {});
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    },
  });

  const isActive = (href: string) => location === href;

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-source font-bold text-scientific-blue cursor-pointer">
                  <Atom className="inline mr-2 h-6 w-6" />
                  MolVE
                </h1>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? "text-scientific-blue border-b-2 border-scientific-blue"
                      : "text-gray-500 hover:text-scientific-blue"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.username}</span>
              <span className="text-gray-500 ml-2">
                | {isAdmin ? 'Administrator' : 'User'}
              </span>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-scientific-blue text-white">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
