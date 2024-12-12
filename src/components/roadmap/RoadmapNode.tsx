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
      return <Lightbulb className="text-yellow-300" size={16} />;
    case "docs":
      return <BookOpen className="text-blue-300" size={16} />;
    case "project":
      return <Code className="text-purple-300" size={16} />;
    default:
      return null;
  }
};

export const RoadmapNode = ({ data, isConnectable }: RoadmapNodeProps) => {
  const isTopic = data.type === "topic";
  const isResource = data.type === "resource";
  
  return (
    <div className={`
      px-4 py-2 shadow-lg rounded-lg border
      ${isTopic ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-purple-500 hover:bg-purple-600'}
      ${data.completed ? 'bg-green-500 hover:bg-green-600' : ''}
      transition-colors duration-200
    `}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      
      <div className="flex items-center gap-2 text-white">
        {data.completed && <CheckCircle2 size={16} />}
        {isResource && getResourceIcon(data.icon)}
        <span className="font-medium">{data.label}</span>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};