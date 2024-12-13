import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/components/ui/use-toast";
import { RoadmapNode } from "./roadmap/RoadmapNode";
import { RoadmapEdge } from "./roadmap/RoadmapEdge";
import { RoadmapTooltip } from "./roadmap/RoadmapTooltip";
import { SkillAssessment } from "./SkillAssessment";
import { Dialog, DialogContent } from "./ui/dialog";

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

const topicQuestions = {
  "HTML Syntax & Structure": [
    {
      id: 1,
      text: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hybrid Text Making Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "Which tag is used for creating a paragraph in HTML?",
      options: ["<paragraph>", "<p>", "<para>", "<text>"],
      correctAnswer: 1
    }
  ],
  "CSS Selectors & Properties": [
    {
      id: 1,
      text: "Which selector has the highest specificity?",
      options: [
        "Class selector",
        "ID selector",
        "Element selector",
        "Universal selector"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "What is the correct CSS syntax?",
      options: [
        "body:color=black",
        "{body;color:black}",
        "body {color: black;}",
        "{body:color=black}"
      ],
      correctAnswer: 2
    }
  ]
  // Add more topic-specific questions as needed
};

export const Flowchart = ({ sections }: FlowchartProps) => {
  const { progress, markTopicComplete } = useUserProgress();
  const { toast } = useToast();
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");

  const createNodes = useCallback(() => {
    const nodes = [];
    let yOffset = 0;

    sections.forEach((section, sectionIndex) => {
      // Add section header node
      nodes.push({
        id: `section-${sectionIndex}`,
        type: 'roadmapNode',
        position: { x: 800, y: yOffset }, // Increased x position for more space
        data: { 
          label: `Stage ${sectionIndex + 1}: ${section.title}`,
          type: 'resource'
        }
      });

      yOffset += 200; // Increased vertical spacing

      // Add topic nodes
      section.topics.forEach((topic, topicIndex) => {
        const isCompleted = progress.completedTopics.includes(topic);
        nodes.push({
          id: `topic-${sectionIndex}-${topicIndex}`,
          type: 'roadmapNode',
          position: { 
            x: 800 + (topicIndex % 2 ? 400 : -400), // Increased horizontal spacing
            y: yOffset + topicIndex * 200 // Increased vertical spacing
          },
          data: {
            label: topic,
            type: 'topic',
            completed: isCompleted
          }
        });
      });

      yOffset += (section.topics.length + 1) * 200; // Increased section spacing
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
      setCurrentTopic(node.data.label);
      if (topicQuestions[node.data.label]) {
        setShowAssessment(true);
      } else {
        // If no questions available, just mark as complete
        markTopicComplete(node.data.label);
        toast({
          title: "Topic Completed! 🎉",
          description: `Great job completing "${node.data.label}"!`,
          duration: 3000
        });
      }
    }
  };

  const handleAssessmentComplete = () => {
    setShowAssessment(false);
    markTopicComplete(currentTopic);
    toast({
      title: "Topic Completed! 🎉",
      description: `Great job completing "${currentTopic}"!`,
      duration: 3000
    });
  };

  return (
    <>
      <div className="w-full h-[800px] md:h-[1200px] overflow-hidden bg-white rounded-xl shadow-lg"> {/* Updated height */}
        <ReactFlow
          nodes={createNodes()}
          edges={createEdges()}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={handleNodeClick}
          fitView
          minZoom={0.2}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          className="w-full h-full" // Added full width and height
        >
          <Background size={2} gap={20} />
          <Controls 
            showInteractive={true}
            className="bg-white rounded-lg p-2"
          />
          <MiniMap 
            nodeColor={(node) => {
              if (node.data?.completed) return '#22c55e';
              return node.data?.type === 'topic' ? '#6366f1' : '#8b5cf6';
            }}
            style={{ 
              height: 200, // Increased minimap size
              width: 300,
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
            }}
            className="bg-white rounded-lg shadow-lg"
          />
        </ReactFlow>
      </div>

      <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
        <DialogContent className="max-w-2xl">
          {currentTopic && topicQuestions[currentTopic] && (
            <SkillAssessment
              topic={currentTopic}
              questions={topicQuestions[currentTopic]}
              onComplete={handleAssessmentComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};