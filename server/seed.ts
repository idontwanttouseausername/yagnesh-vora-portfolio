import { db } from "./db";
import { projects, type InsertProject } from "@shared/schema";
import { eq } from "drizzle-orm";

const seedProjects: InsertProject[] = [
  {
    title: "Skillry",
    description: "An app-based sports start-up offering coaching services across multiple sports disciplines",
    category: "ux",
    imageUrl: "/SkillryLogo500x500_1754973456233.png",
    projectUrl: "",
    tags: ["UI Redesign", "Usability Testing", "Journey Maps", "Mobile app"],
    featured: "true",
    detailedDescription: "Skillry is a comprehensive sports coaching platform that connects athletes with professional coaches across various sports disciplines. The app features personalized training programs, video analysis, progress tracking, and real-time feedback to help athletes improve their skills and reach their potential.",
    projectImages: [
      "/skillry/Yaggy Website 2025 - Frame 3_1760791232582.jpg",
      "/skillry/Screenshot 2024-05-21 at 17.53.24_1754973793988.png",
      "/skillry/Screenshot 2024-05-21 at 17.54.22_1754973984327.png",
      "/skillry/c1_1754974087769.png",
      "/skillry/c2_1754974087770.png",
      "/skillry/c3_1754974103348.png",
      "/skillry/c4_1754974103347.png"
    ],
    challenges: "Creating a unified experience for diverse sports while maintaining sport-specific coaching methodologies. Ensuring real-time video analysis and feedback could work seamlessly across different devices and network conditions.",
    solutions: "Developed a modular design system that adapts to different sports while maintaining consistency. Implemented progressive video loading and offline capabilities for uninterrupted training sessions.",
    outcomes: "Successfully launched with 10,000+ active users across 15 sports categories. Achieved a 4.8-star rating on app stores with particular praise for the intuitive interface and effective coaching tools.",
    duration: "3 months",
    role: "UX/UI Design and Marketing Specialist",
    technologies: ["Figma", "Trello", "DaVinci Resolve", "CapCut", "Miro Board"]
  },
  {
    title: "Meet and Eat",
    description: "An app that brings university students together to share and explore cuisines from different cultures, thus making meaningful connections",
    category: "ux",
    imageUrl: "/attached_assets/FDB15DC5-9198-42FF-838E-79BB707A03A3_1756435079841.jpeg",
    projectUrl: "",
    tags: ["UX Research", "UI Design", "Face to face interviews", "Coding", "Apple Foundation Program"],
    featured: "true",
    detailedDescription: "An app that brings university students together to share and explore cuisines from different cultures, thus making meaningful connections",
    projectImages: [
      "/attached_assets/1_1756433766588.png",
      "/attached_assets/2_1756433766588.png",
      "/attached_assets/3_1756433766589.png",
      "/attached_assets/4_1756433766589.png",
      "/attached_assets/5_1756433766589.png"
    ],
    challenges: "[Placeholder for Challenges] - Describe the main challenges you faced while designing this app",
    solutions: "[Placeholder for Solutions] - Explain how you addressed the challenges and your design approach",
    outcomes: "[Placeholder for Outcomes & Impact] - Share the results and impact of your design work",
    duration: "3 weeks",
    role: "UX/UI Designer",
    technologies: ["Figma", "XCode", "Swift UI", "GitHub", "Trello", "Miro"]
  }
];

async function seed() {
  console.log("🌱 Starting database seed...");
  
  try {
    for (const project of seedProjects) {
      // Check if project already exists
      const [existingProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.title, project.title));
      
      if (existingProject) {
        console.log(`✓ Project "${project.title}" already exists, skipping...`);
        continue;
      }
      
      // Insert the project
      await db.insert(projects).values(project);
      console.log(`✓ Created project: ${project.title}`);
    }
    
    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
