import { CheckCircle2, BookOpen, Lightbulb, Code } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

interface RoadmapNodeProps {
  data: {
    label: string;
    type?: "topic" | "resource";
    completed?: boolean;
    icon?: "tutorial" | "docs" | "project";
  };
  isConnectable: boolean;
}

const getResourceIcon = (icon?: string) => {
  switch (icon) {
    case "tutorial":
      return <Lightbulb className="text-yellow-300" size={24} />; // Increased icon size
    case "docs":
      return <BookOpen className="text-blue-300" size={24} />;
    case "project":
      return <Code className="text-purple-300" size={24} />;
    default:
      return null;
  }
};

export const RoadmapNode = ({ data, isConnectable }: RoadmapNodeProps) => {
  const isTopic = data.type === "topic";
  const isResource = data.type === "resource";
  
  return (
    <div className={`
      px-6 py-4 shadow-lg rounded-lg border min-w-[250px] // Increased padding and minimum width
      ${isTopic ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-purple-500 hover:bg-purple-600'}
      ${data.completed ? 'bg-green-500 hover:bg-green-600' : ''}
      transition-colors duration-200
    `}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3" // Increased handle size
      />
      
      <div className="flex items-center gap-3 text-white">
        {data.completed && <CheckCircle2 size={24} />} {/* Increased icon size */}
        {isResource && getResourceIcon(data.icon)}
        <span className="font-medium text-lg">{data.label}</span> {/* Increased text size */}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3" // Increased handle size
      />
    </div>
  );
};