import { Client } from "@replit/object-storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Client();

async function uploadFile(localPath: string, destinationPath: string): Promise<string> {
  try {
    const fileContent = await fs.promises.readFile(localPath);
    const objectPath = `public/${destinationPath}`;
    
    const { ok, error } = await client.uploadFromBytes(objectPath, fileContent);
    
    if (!ok) {
      throw new Error(String(error) || "Upload failed");
    }
    
    // The public URL format for Replit object storage
    const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
    const publicUrl = `https://storage.googleapis.com/${bucketId}/public/${destinationPath}`;
    
    console.log(`✓ Uploaded: ${destinationPath}`);
    return publicUrl;
  } catch (error) {
    console.error(`✗ Failed to upload ${localPath}:`, error);
    throw error;
  }
}

async function uploadProjectImages() {
  console.log("📤 Starting image upload to object storage...\n");
  
  const rootDir = path.resolve(__dirname, "..");
  
  // Skillry images (from client/public/skillry/)
  const skillryImages = [
    "client/public/skillry/Yaggy Website 2025 - Frame 3_1760791232582.jpg",
    "client/public/skillry/Screenshot 2024-05-21 at 17.53.24_1754973793988.png",
    "client/public/skillry/Screenshot 2024-05-21 at 17.54.22_1754973984327.png",
    "client/public/skillry/c1_1754974087769.png",
    "client/public/skillry/c2_1754974087770.png",
    "client/public/skillry/c3_1754974103348.png",
    "client/public/skillry/c4_1754974103347.png",
  ];
  
  // Meet and Eat images (from attached_assets/)
  const meetAndEatImages = [
    "attached_assets/1_1756433766588.png",
    "attached_assets/2_1756433766588.png",
    "attached_assets/3_1756433766589.png",
    "attached_assets/4_1756433766589.png",
    "attached_assets/5_1756433766589.png",
  ];
  
  // Logo images
  const logoImages = [
    "client/public/SkillryLogo500x500_1754973456233.png",
    "attached_assets/FDB15DC5-9198-42FF-838E-79BB707A03A3_1756435079841.jpeg",
  ];
  
  // Create mapping of local path -> destination path in object storage
  const fileMapping: Array<{ local: string; dest: string }> = [
    // Skillry images - strip "client/public/" prefix for destination
    ...skillryImages.map(path => ({ 
      local: path, 
      dest: path.replace("client/public/", "") 
    })),
    // Meet and Eat and logo images stay as-is
    ...meetAndEatImages.map(path => ({ local: path, dest: path })),
    ...logoImages.map(path => ({ local: path, dest: path })),
  ];
  
  const uploadedUrls: Record<string, string> = {};
  
  for (const { local, dest } of fileMapping) {
    const localPath = path.join(rootDir, local);
    
    if (!fs.existsSync(localPath)) {
      console.log(`⚠ Skipping missing file: ${local}`);
      continue;
    }
    
    try {
      const url = await uploadFile(localPath, dest);
      uploadedUrls[dest] = url;
    } catch (error) {
      console.error(`Failed to upload ${local} -> ${dest}`);
    }
  }
  
  console.log("\n✅ Upload complete!");
  console.log("\nUploaded URLs:");
  console.log(JSON.stringify(uploadedUrls, null, 2));
  
  return uploadedUrls;
}

uploadProjectImages()
  .then(() => {
    console.log("\n🎉 All images uploaded successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Upload failed:", error);
    process.exit(1);
  });
