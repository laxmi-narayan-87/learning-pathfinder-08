import { ChartContainer } from "@/components/ui/chart";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
  Tree,
  TreeProps
} from "recharts";

interface Section {
  title: string;
  topics: string[];
}

interface FlowchartProps {
  sections: Section[];
}

export const Flowchart = ({ sections }: FlowchartProps) => {
  // Transform sections data for the tree
  const data = {
    name: "Learning Path",
    children: sections.map((section) => ({
      name: section.title,
      children: [
        {
          name: "Topics",
          children: section.topics.map((topic) => ({
            name: topic,
          })),
        },
        {
          name: "Recommended Courses",
          children: [
            { name: "Udemy Course" },
            { name: "Coursera Course" },
            { name: "edX Course" },
          ],
        },
      ],
    })),
  };

  return (
    <div className="w-full h-[600px] overflow-auto">
      <ChartContainer
        config={{
          colors: {
            theme: {
              background: "transparent",
            },
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <Tree
            data={data}
            nodeSize={{ x: 200, y: 100 }}
            orientation="vertical"
            separation={{ siblings: 1, nonSiblings: 2 }}
            nodePadding={20}
            fill="#4f46e5"
            stroke="#fff"
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
          </Tree>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};