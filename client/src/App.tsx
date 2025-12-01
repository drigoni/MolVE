import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import UserEvaluation from "@/pages/user-evaluation";
import GuestViewer from "@/pages/guest-viewer";
import NotFound from "@/pages/not-found";
import Guide from "@/pages/guide";
import UserApiTokens from "@/pages/user-api-tokens";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Check if guest viewing is allowed
  const { data: publicSettings, isLoading: settingsLoading } = useQuery<{ allowGuestViewing: boolean }>({
    queryKey: ["/api/public/settings"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (isLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-lab-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          {/* If guest viewing is enabled, show guest viewer on root, otherwise show login */}
          <Route path="/" component={publicSettings?.allowGuestViewing ? GuestViewer : Login} />
          <Route path="/login" component={Login} />
          <Route path="/guest" component={GuestViewer} />
        </>
      ) : user?.role === 'admin' ? (
        <>
          <Route path="/" component={AdminDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/evaluate" component={UserEvaluation} />
          <Route path="/api-tokens" component={UserApiTokens} />
          <Route path="/guest" component={GuestViewer} />
          <Route path="/guide" component={Guide} />
        </>
      ) : (
        <>
          <Route path="/" component={UserEvaluation} />
          <Route path="/evaluate" component={UserEvaluation} />
          <Route path="/api-tokens" component={UserApiTokens} />
          <Route path="/guest" component={GuestViewer} />
          <Route path="/guide" component={Guide} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
