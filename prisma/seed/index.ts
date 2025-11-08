import { prisma } from "@/lib/prisma";
import { seedUsers } from "./user";

export async function runAllSeeders() {
  console.log("🚀 Starting database seeding...");

  try {
    await seedUsers();

    console.log("🎉 All seeders completed successfully!");
  } catch (error) {
    console.error("💥 Error running seeders:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  runAllSeeders()
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
