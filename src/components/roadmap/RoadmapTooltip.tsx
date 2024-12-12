interface RoadmapTooltipProps {
  name: string;
  category?: "topic" | "resource";
  completed?: boolean;
}

export const RoadmapTooltip = ({ name, category, completed }: RoadmapTooltipProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold">{name}</p>
      {category && (
        <p className="text-sm text-gray-600 capitalize mt-1">
          {category}
        </p>
      )}
      {category === "topic" && (
        <p className="text-sm text-gray-600 mt-1">
          {completed ? "✅ Completed" : "Click to mark as complete"}
        </p>
      )}
    </div>
  );
};