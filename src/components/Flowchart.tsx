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
    children: section.topics.map((topic) => ({
      name: topic,
      size: 1,
    })),
  }));

  const COLORS = [
    "#4f46e5",
    "#7c3aed",
    "#2563eb",
    "#0891b2",
    "#0d9488",
    "#059669",
  ];

  return (
    <div className="w-full h-[400px]">
      <ChartContainer
        config={{
          colors: {
            theme: {
              light: COLORS[0],
              dark: COLORS[1],
            },
          },
        }}
      >
        <Treemap
          data={[{ name: "roadmap", children: data }]}
          dataKey="size"
          stroke="#fff"
          fill="#4f46e5"
        >
          <Tooltip content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 rounded shadow">
                  <p className="text-sm">{payload[0].payload.name}</p>
                </div>
              );
            }
            return null;
          }} />
        </Treemap>
      </ChartContainer>
    </div>
  );
};