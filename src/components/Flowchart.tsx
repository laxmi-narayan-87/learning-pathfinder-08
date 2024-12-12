import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { useCallback } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/components/ui/use-toast";
import { RoadmapNode } from "./roadmap/RoadmapNode";
import { RoadmapEdge } from "./roadmap/RoadmapEdge";
import { RoadmapTooltip } from "./roadmap/RoadmapTooltip";

interface Section {
  title: string;
  topics: string[];
}

interface FlowchartProps {
  sections: Section[];
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const edgeTypes = {
  roadmapEdge: RoadmapEdge,
};

export const Flowchart = ({ sections }: FlowchartProps) => {
  const { progress, markTopicComplete } = useUserProgress();
  const { toast } = useToast();

  const createNodes = useCallback(() => {
    const nodes = [];
    let yOffset = 0;

    sections.forEach((section, sectionIndex) => {
      // Add section header node
      nodes.push({
        id: `section-${sectionIndex}`,
        type: 'roadmapNode',
        position: { x: 400, y: yOffset },
        data: { 
          label: `Stage ${sectionIndex + 1}: ${section.title}`,
          type: 'resource'
        }
      });

      yOffset += 100;

      // Add topic nodes
      section.topics.forEach((topic, topicIndex) => {
        const isCompleted = progress.completedTopics.includes(topic);
        nodes.push({
          id: `topic-${sectionIndex}-${topicIndex}`,
          type: 'roadmapNode',
          position: { 
            x: 400 + (topicIndex % 2 ? 200 : -200), 
            y: yOffset + topicIndex * 100 
          },
          data: {
            label: topic,
            type: 'topic',
            completed: isCompleted
          }
        });
      });

      yOffset += (section.topics.length + 1) * 100;
    });

    return nodes;
  }, [sections, progress.completedTopics]);

  const createEdges = useCallback(() => {
    const edges = [];
    
    sections.forEach((section, sectionIndex) => {
      // Connect section to its first topic
      edges.push({
        id: `e-section-${sectionIndex}`,
        source: `section-${sectionIndex}`,
        target: `topic-${sectionIndex}-0`,
        type: 'roadmapEdge'
      });

      // Connect topics within section
      section.topics.forEach((_, topicIndex) => {
        if (topicIndex < section.topics.length - 1) {
          edges.push({
            id: `e-topic-${sectionIndex}-${topicIndex}`,
            source: `topic-${sectionIndex}-${topicIndex}`,
            target: `topic-${sectionIndex}-${topicIndex + 1}`,
            type: 'roadmapEdge'
          });
        }
      });

      // Connect last topic to next section
      if (sectionIndex < sections.length - 1) {
        edges.push({
          id: `e-section-connect-${sectionIndex}`,
          source: `topic-${sectionIndex}-${section.topics.length - 1}`,
          target: `section-${sectionIndex + 1}`,
          type: 'roadmapEdge'
        });
      }
    });

    return edges;
  }, [sections]);

  const handleNodeClick = (event: React.MouseEvent, node: any) => {
    if (node.data.type === 'topic') {
      markTopicComplete(node.data.label);
      toast({
        title: "Topic Completed! 🎉",
        description: `Great job completing "${node.data.label}"!`,
        duration: 3000
      });
    }
  };

  return (
    <div className="w-full h-[600px] overflow-hidden bg-white rounded-xl shadow-lg">
      <ReactFlow
        nodes={createNodes()}
        edges={createEdges()}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            if (node.data?.completed) return '#22c55e';
            return node.data?.type === 'topic' ? '#6366f1' : '#8b5cf6';
          }}
        />
      </ReactFlow>
    </div>
  );
};