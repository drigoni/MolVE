import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Beaker, ThumbsUp, ThumbsDown, Minus, Star, Eye, Users } from "lucide-react";
import type { DashboardStats } from "@shared/schema";

interface DashboardStatsProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  const statItems = [
    {
      title: "Total Evaluated",
      value: stats?.total || 0,
      icon: Beaker,
      color: "text-scientific-blue",
      bgColor: "bg-scientific-blue/10",
    },
    {
      title: "Awesome",
      value: stats?.awesome || 0,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Good",
      value: stats?.positive || 0,
      icon: ThumbsUp,
      color: "text-mint-green",
      bgColor: "bg-mint-green/10",
    },
    {
      title: "Borderline",
      value: stats?.borderline || 0,
      icon: Minus,
      color: "text-scientific-amber",
      bgColor: "bg-scientific-amber/10",
    },
    {
      title: "Bad",
      value: stats?.negative || 0,
      icon: ThumbsDown,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Futuristic",
      value: stats?.futuristic || 0,
      icon: Eye,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
      {statItems.map((item) => {
        const Icon = item.icon;
        
        return (
          <Card key={item.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{item.value.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
