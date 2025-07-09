import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  role: string;
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
