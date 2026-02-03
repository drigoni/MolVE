import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NavigationHeader } from "@/components/navigation-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Key, Trash2 } from "lucide-react";

export default function UserApiTokens() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [apiTokens, setApiTokens] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user?.role !== "user" && user?.role !== "admin"))) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: apiTokensData } = useQuery<any[]>({
    queryKey: ["/api/api-tokens"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (apiTokensData) setApiTokens(apiTokensData);
  }, [apiTokensData]);

  const createApiToken = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/api-tokens", {});
      return response.json();
    },
    onSuccess: (token) => {
      toast({
        title: "API Token Created",
        description: "Copy this token now.",
      });
      setApiTokens((prev) => [token, ...prev]);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create API token",
        variant: "destructive",
      });
    },
  });

  const deleteApiToken = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/api-tokens/${id}`, {});
      return response.json();
    },
    onSuccess: (_data, id) => {
      toast({
        title: "Token Revoked",
        description: "API token has been revoked.",
      });
      setApiTokens((prev) => prev.filter((t) => t.id !== id));
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to revoke API token",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-lab-bg">
      <NavigationHeader />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create and manage API tokens for programmatic access to this application.
            </p>
            <Button
              onClick={() => createApiToken.mutate()}
              disabled={createApiToken.isPending}
              className="bg-scientific-blue hover:bg-scientific-blue/90"
            >
              <Key className="h-4 w-4 mr-2" />
              {createApiToken.isPending ? "Creating token..." : "Create New API Token"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Use these tokens in your Python scripts as a Bearer token in the
              <code className="ml-1">Authorization</code> header.
            </p>
            {apiTokens && apiTokens.length > 0 ? (
              <div className="mt-4 space-y-2">
                {apiTokens.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs break-all">{token.token}</div>
                      <div className="text-xs text-muted-foreground">
                        Created {token.createdAt ? new Date(token.createdAt).toLocaleString() : ""}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteApiToken.mutate(token.id)}
                      disabled={deleteApiToken.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">No API tokens yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
