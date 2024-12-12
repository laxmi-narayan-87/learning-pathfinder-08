import { ChartContainer } from "@/components/ui/chart";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { ReactElement } from "react";

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
  // Transform sections data for the treemap with stages
  const data = sections.map((section, index) => ({
    name: `Stage ${index + 1}: ${section.title}`,
    size: section.topics.length + 3, // Add extra size for courses
    category: "stage" as const,
    children: [
      ...section.topics.map((topic) => ({
        name: topic,
        size: 1,
        category: "topic" as const
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
    stage: "#2563eb", // Primary blue for stages
    topic: "#4f46e5", // Indigo for topics
    course: "#7c3aed", // Purple for courses
    default: "#2563eb"
  };

  const renderContent = (props: TreemapContentProps): ReactElement => {
    const { x, y, width, height, name, category } = props;
    const isStage = category === "stage";
    const isCourse = category === "course";
    const color = isStage ? COLORS.stage : isCourse ? COLORS.course : COLORS.topic;

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
        />
        {width > 50 && height > 30 && (
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