import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function NotFound() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-lab-bg flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href={isAuthenticated ? "/" : "/login"}>
          <Button className="bg-scientific-blue hover:bg-scientific-blue/90">
            {isAuthenticated ? "Go Home" : "Go to Login"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
