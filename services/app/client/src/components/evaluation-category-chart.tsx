import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { DashboardStats } from "@shared/schema";

interface EvaluationCategoryChartProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
}

export function EvaluationCategoryChart({ stats, isLoading }: EvaluationCategoryChartProps) {
  if (isLoading || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Categories Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scientific-blue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    {
      category: "Awesome",
      count: stats.awesome,
      color: "#9333ea",
    },
    {
      category: "Good",
      count: stats.positive,
      color: "#059669",
    },
    {
      category: "Borderline",
      count: stats.borderline,
      color: "#d97706",
    },
    {
      category: "Bad",
      count: stats.negative,
      color: "#dc2626",
    },
    {
      category: "Futuristic",
      count: stats.futuristic,
      color: "#0891b2",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation Categories Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}