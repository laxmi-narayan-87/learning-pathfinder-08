import { ChartContainer } from "@/components/ui/chart";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { ReactElement } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { CheckCircle2, BookOpen, Lightbulb, Code } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Section {
  title: string;
  topics: string[];
}

interface FlowchartProps {
  sections: Section[];
}

interface TreemapContentProps {
  root: any;
  depth: number;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: any;
  colors: any;
  rank: any;
  name: string;
  category?: "topic" | "course" | "stage";
}

export const Flowchart = ({ sections }: FlowchartProps) => {
  const { progress, markTopicComplete } = useUserProgress();
  const { toast } = useToast();

  const data = sections.map((section, index) => ({
    name: `Stage ${index + 1}: ${section.title}`,
    size: section.topics.length + 3,
    category: "stage" as const,
    children: [
      ...section.topics.map((topic) => ({
        name: topic,
        size: 1,
        category: "topic" as const,
        completed: progress.completedTopics.includes(topic)
      })),
      {
        name: "Learning Resources",
        size: 3,
        children: [
          { 
            name: "Interactive Tutorials", 
            size: 1, 
            category: "course" as const,
            icon: "tutorial"
          },
          { 
            name: "Documentation", 
            size: 1, 
            category: "course" as const,
            icon: "docs"
          },
          { 
            name: "Practice Projects", 
            size: 1, 
            category: "course" as const,
            icon: "project"
          }
        ]
      }
    ]
  }));

  const COLORS = {
    stage: "#3b82f6",
    topic: "#6366f1",
    course: "#8b5cf6",
    completed: "#22c55e",
    hover: "#4f46e5"
  };

  const handleTopicClick = (topic: string) => {
    if (!progress.completedTopics.includes(topic)) {
      markTopicComplete(topic);
      toast({
        title: "Topic Completed! 🎉",
        description: `Great job completing "${topic}"!`,
        duration: 3000
      });
    }
  };

  const getResourceIcon = (icon?: string) => {
    switch (icon) {
      case "tutorial":
        return <Lightbulb className="text-yellow-300" size={16} />;
      case "docs":
        return <BookOpen className="text-blue-300" size={16} />;
      case "project":
        return <Code className="text-purple-300" size={16} />;
      default:
        return null;
    }
  };

  const renderContent = (props: TreemapContentProps): ReactElement => {
    const { x, y, width, height, name, category, payload } = props;
    const isStage = category === "stage";
    const isCourse = category === "course";
    const isTopic = category === "topic";
    
    // Add safety check for payload and completed property
    const isCompleted = isTopic && payload && 'completed' in payload ? payload.completed : false;
    const icon = payload?.icon;
    
    const backgroundColor = isCompleted ? COLORS.completed : 
      isStage ? COLORS.stage : 
      isCourse ? COLORS.course : 
      COLORS.topic;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={backgroundColor}
          stroke="#fff"
          strokeWidth={isStage ? 2 : 1}
          rx={isStage ? 8 : 4}
          className={isTopic ? "cursor-pointer transition-colors duration-200 hover:fill-[#4f46e5]" : ""}
          onClick={() => isTopic && handleTopicClick(name)}
        />
        {width > 50 && height > 30 && (
          <>
            <text
              x={x + (isCompleted || icon ? 24 : width / 2)}
              y={y + height / 2}
              textAnchor={isCompleted || icon ? "start" : "middle"}
              fill="#fff"
              fontSize={isStage ? 14 : 12}
              fontWeight={isStage ? "bold" : "normal"}
              className="select-none pointer-events-none"
            >
              {name}
            </text>
            {isCompleted && (
              <CheckCircle2
                className="text-white/90"
                x={x + 6}
                y={y + height / 2 - 8}
                width={16}
                height={16}
              />
            )}
            {icon && getResourceIcon(icon)}
          </>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-[600px] overflow-auto bg-white rounded-xl shadow-lg p-6">
      <ChartContainer
        config={{
          colors: {
            theme: {
              light: COLORS.stage,
              dark: COLORS.topic
            },
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={[{ name: "Frontend Development Path", children: data }]}
            dataKey="size"
            stroke="#fff"
            fill="#4f46e5"
            content={renderContent as any}
            animationDuration={300}
          >
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold">{data.name}</p>
                      {data.category && (
                        <p className="text-sm text-gray-600 capitalize mt-1">
                          {data.category}
                        </p>
                      )}
                      {data.category === "topic" && (
                        <p className="text-sm text-gray-600 mt-1">
                          {data.completed ? "✅ Completed" : "Click to mark as complete"}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};