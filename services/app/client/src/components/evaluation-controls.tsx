import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";

interface EvaluationControlsProps {
  onEvaluate: (evaluation: string) => void;
  isSubmitting: boolean;
}

export function EvaluationControls({ onEvaluate, isSubmitting }: EvaluationControlsProps) {
  const evaluationOptions = [
    {
      value: "positive",
      label: "Positive",
      icon: ThumbsUp,
      className: "bg-mint-green hover:bg-mint-green/90 text-white",
    },
    {
      value: "borderline",
      label: "Borderline",
      icon: Minus,
      className: "bg-scientific-amber hover:bg-scientific-amber/90 text-white",
    },
    {
      value: "negative",
      label: "Negative",
      icon: ThumbsDown,
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-4">Evaluate this structure:</h4>
      <div className="flex items-center justify-center space-x-4">
        {evaluationOptions.map((option) => {
          const Icon = option.icon;
          
          return (
            <Button
              key={option.value}
              onClick={() => onEvaluate(option.value)}
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 font-medium transition-colors ${option.className}`}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Icon className="h-4 w-4 mr-2" />
              )}
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
