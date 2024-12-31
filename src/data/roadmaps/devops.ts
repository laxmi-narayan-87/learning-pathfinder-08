export const devopsRoadmap = {
  id: "devops",
  title: "DevOps Engineer",
  description: "Complete guide to becoming a DevOps engineer",
  sections: [
    {
      title: "Operating Systems & Linux",
      topics: [
        "Linux Administration",
        "Shell Scripting",
        "System Performance",
        "Process Management",
        "File System & Storage"
      ]
    },
    {
      title: "Networking & Security",
      topics: [
        "TCP/IP Fundamentals",
        "DNS Management",
        "Load Balancing",
        "Firewalls & Security",
        "SSL/TLS",
        "VPN & Tunneling"
      ]
    },
    {
      title: "Containerization & Orchestration",
      topics: [
        "Docker",
        "Kubernetes",
        "Container Security",
        "Microservices Architecture",
        "Service Mesh",
        "Container Registries"
      ]
    },
    {
      title: "Infrastructure as Code",
      topics: [
        "Terraform",
        "Ansible",
        "CloudFormation",
        "Infrastructure Design",
        "Configuration Management",
        "Version Control for IaC"
      ]
    },
    {
      title: "CI/CD & Automation",
      topics: [
        "Jenkins",
        "GitHub Actions",
        "GitLab CI",
        "Pipeline Design",
        "Automated Testing",
        "Deployment Strategies"
      ]
    }
  ],
  resources: [
    {
      title: "DevOps Roadmap",
      url: "https://roadmap.sh/devops",
      type: "guide" as const
    },
    {
      title: "Kubernetes Documentation",
      url: "https://kubernetes.io/docs/home/",
      type: "documentation" as const
    },
    {
      title: "Docker Documentation",
      url: "https://docs.docker.com/",
      type: "documentation" as const
    }
  ]
};