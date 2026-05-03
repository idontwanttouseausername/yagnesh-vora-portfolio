import { projects, messages, type Project, type InsertProject, type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private messages: Map<string, Message>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.messages = new Map();
    this.currentId = 1;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.category === category);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.featured === "true");
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = (this.currentId++).toString();
    const newProject: Project = { 
      ...project, 
      id, 
      createdAt: new Date(),
      tags: project.tags || null,
      projectImages: project.projectImages || null,
      technologies: project.technologies || null,
      featured: project.featured || "false",
      detailedDescription: project.detailedDescription || null,
      challenges: project.challenges || null,
      solutions: project.solutions || null,
      outcomes: project.outcomes || null,
      duration: project.duration || null,
      role: project.role || null,
      projectUrl: project.projectUrl || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.projects.set(id, updated as Project);
    return updated as Project;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = (this.currentId++).toString();
    const newMessage: Message = { 
      ...message, 
      id, 
      createdAt: new Date(),
      projectType: message.projectType || null
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
}

export const storage = new MemStorage();