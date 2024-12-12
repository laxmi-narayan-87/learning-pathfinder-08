import { ChartContainer } from "@/components/ui/chart";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface Section {
  title: string;
  topics: string[];
}

interface FlowchartProps {
  sections: Section[];
}

export const Flowchart = ({ sections }: FlowchartProps) => {
  // Transform sections data for the treemap
  const data = sections.map((section) => ({
    name: section.title,
    size: section.topics.length,
    children: [
      ...section.topics.map((topic) => ({
        name: topic,
        size: 1,
        category: "topic"
      })),
      {
        name: "Recommended Courses",
        size: 3,
        children: [
          { name: "Udemy Course", size: 1, category: "course" },
          { name: "Coursera Course", size: 1, category: "course" },
          { name: "edX Course", size: 1, category: "course" }
        ]
      }
    ]
  }));

  const COLORS = {
    topic: "#4f46e5",
    course: "#7c3aed",
    default: "#2563eb"
  };

  return (
    <div className="w-full h-[600px] overflow-auto">
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
            data={[{ name: "Learning Path", children: data }]}
            dataKey="size"
            stroke="#fff"
            fill="#4f46e5"
            content={({ root, depth, x, y, width, height, index, payload, colors, rank, name, category }) => {
              const isRoot = depth === 0;
              const isCourse = category === "course";
              const color = isCourse ? COLORS.course : COLORS.topic;

              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    stroke="#fff"
                  />
                  {width > 50 && height > 30 && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={12}
                      className="select-none"
                    >
                      {name}
                    </text>
                  )}
                </g>
              );
            }}
          >
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 rounded shadow">
                      <p className="text-sm">{payload[0].payload.name}</p>
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