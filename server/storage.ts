import { type Project, type InsertProject, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private messages: Map<string, Message>;

  constructor() {
    this.projects = new Map();
    this.messages = new Map();
    this.seedProjects();
  }

  private seedProjects() {
    const sampleProjects: Omit<Project, "id">[] = [
      {
        title: "E-commerce Mobile App",
        description: "Complete UX/UI redesign for enhanced user experience",
        category: "ux",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["UX Design", "Mobile", "E-commerce"],
        featured: "true",
        createdAt: new Date(),
      },
      {
        title: "Analytics Dashboard",
        description: "Data-driven interface design for business intelligence",
        category: "ux",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["UX Design", "Dashboard", "Analytics"],
        featured: "false",
        createdAt: new Date(),
      },
      {
        title: "Portrait Series",
        description: "Professional headshots and creative portraits",
        category: "photography",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Photography", "Portrait", "Professional"],
        featured: "true",
        createdAt: new Date(),
      },
      {
        title: "Nature & Landscapes",
        description: "Capturing the beauty of natural environments",
        category: "photography",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Photography", "Nature", "Landscape"],
        featured: "false",
        createdAt: new Date(),
      },
      {
        title: "Corporate Video",
        description: "Brand storytelling through compelling visuals",
        category: "videography",
        imageUrl: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Videography", "Corporate", "Branding"],
        featured: "false",
        createdAt: new Date(),
      },
      {
        title: "Creative Film",
        description: "Artistic video content with innovative techniques",
        category: "videography",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Videography", "Creative", "Artistic"],
        featured: "true",
        createdAt: new Date(),
      },
      {
        title: "Brand Identity",
        description: "Complete visual identity system and logo design",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Graphic Design", "Branding", "Identity"],
        featured: "false",
        createdAt: new Date(),
      },
      {
        title: "Print Design",
        description: "Editorial layouts and marketing materials",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["Graphic Design", "Print", "Editorial"],
        featured: "false",
        createdAt: new Date(),
      },
      {
        title: "Website Redesign",
        description: "Responsive web design with focus on conversion",
        category: "ux",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "",
        tags: ["UX Design", "Web", "Responsive"],
        featured: "false",
        createdAt: new Date(),
      }
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured === "true")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
