import { useAuth } from "@/hooks/useAuth";
import { NavigationHeader } from "@/components/navigation-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Atom, BarChart3, History, HelpCircle } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-lab-bg">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-source font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Researcher'}!
          </h1>
          <p className="text-gray-600">
            Ready to evaluate some molecular structures today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-scientific-blue/10 rounded-lg flex items-center justify-center mr-3">
                  <Atom className="h-5 w-5 text-scientific-blue" />
                </div>
                <h3 className="text-lg font-semibold">Start Evaluating</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Input SMILES strings and evaluate molecular structures with our interactive visualization tools.
              </p>
              <Link href="/evaluate">
                <Button className="w-full bg-scientific-blue hover:bg-scientific-blue/90">
                  Start Evaluating
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-mint-green/10 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="h-5 w-5 text-mint-green" />
                </div>
                <h3 className="text-lg font-semibold">View Dashboard</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Check your evaluation statistics and track your progress over time.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  View Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-deep-magenta/10 rounded-lg flex items-center justify-center mr-3">
                  <History className="h-5 w-5 text-deep-magenta" />
                </div>
                <h3 className="text-lg font-semibold">Evaluation History</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Review your past evaluations and revisit previously analyzed molecules.
              </p>
              <Link href="/history">
                <Button variant="outline" className="w-full">
                  View History
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Preview */}
        <div className="mt-12">
          <h2 className="text-xl font-source font-semibold text-gray-900 mb-6">Quick Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-scientific-blue">--</div>
                  <div className="text-sm text-gray-600">Total Evaluated</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-green">--</div>
                  <div className="text-sm text-gray-600">Positive</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">--</div>
                  <div className="text-sm text-gray-600">Negative</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-scientific-amber">--</div>
                  <div className="text-sm text-gray-600">Borderline</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
