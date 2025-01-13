export const getRoadmapImage = (id: string) => {
  switch (id.toLowerCase()) {
    case "frontend":
      return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
    case "backend":
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
    case "fullstack":
      return "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
    case "devops":
      return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
    case "mobile":
      return "https://images.unsplash.com/photo-1483058712412-4245e9b90334";
    default:
      return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  }
};