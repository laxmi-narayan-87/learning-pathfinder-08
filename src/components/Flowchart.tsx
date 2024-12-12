import { ChartContainer } from "@/components/ui/chart";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { ReactElement } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { CheckCircle2 } from "lucide-react";
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

  // Transform sections data for the treemap with stages
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
        name: "Recommended Resources",
        size: 3,
        children: [
          { name: "Interactive Courses", size: 1, category: "course" as const },
          { name: "Documentation", size: 1, category: "course" as const },
          { name: "Practice Projects", size: 1, category: "course" as const }
        ]
      }
    ]
  }));

  const COLORS = {
    stage: "#2563eb",
    topic: "#4f46e5",
    course: "#7c3aed",
    default: "#2563eb"
  };

  const handleTopicClick = (topic: string) => {
    if (!progress.completedTopics.includes(topic)) {
      markTopicComplete(topic);
      toast({
        title: "Progress Updated",
        description: `Marked "${topic}" as completed!`,
        duration: 3000
      });
    }
  };

  const renderContent = (props: TreemapContentProps): ReactElement => {
    const { x, y, width, height, name, category, payload } = props;
    const isStage = category === "stage";
    const isCourse = category === "course";
    const isTopic = category === "topic";
    const color = isStage ? COLORS.stage : isCourse ? COLORS.course : COLORS.topic;
    // Add a safety check for payload and completed property
    const isCompleted = isTopic && payload && 'completed' in payload ? payload.completed : false;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="#fff"
          strokeWidth={isStage ? 2 : 1}
          rx={isStage ? 6 : 3}
          className={isTopic ? "cursor-pointer hover:opacity-90" : ""}
          onClick={() => isTopic && handleTopicClick(name)}
        />
        {width > 50 && height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2}
              textAnchor="middle"
              fill="#fff"
              fontSize={isStage ? 14 : 12}
              fontWeight={isStage ? "bold" : "normal"}
              className="select-none"
            >
              {name}
            </text>
            {isCompleted && (
              <CheckCircle2
                className="text-green-300"
                x={x + width - 20}
                y={y + 10}
                width={16}
                height={16}
              />
            )}
          </>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-[600px] overflow-auto bg-white rounded-lg shadow-lg p-4">
      <ChartContainer
        config={{
          colors: {
            theme: {
              light: COLORS.default,
              dark: COLORS.topic
            },
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={[{ name: "Career Path", children: data }]}
            dataKey="size"
            stroke="#fff"
            fill="#4f46e5"
            content={renderContent as any}
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
                          {data.completed ? "Completed" : "Click to mark as complete"}
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