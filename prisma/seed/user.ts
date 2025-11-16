import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface UserSeedData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  website: string;
  password: string;
}

const users: UserSeedData[] = [
  {
    firstName: "Kabelo",
    lastName: "Moobi",
    email: "giftmoobi@gmail.com",
    phone: "0787735258",
    companyName: "Payloft",
    industry: "Finance",
    website: "https://www.payloft.com",
    password: "SecurePassword123",
  },
];

export const seedUsers = async (): Promise<void> => {
  console.log("🌱 Seeding users...");

  const results = await Promise.allSettled(
    users.map(async (userData) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: userData.email,
          },
        });

        if (existingUser) {
          console.log(`⚠️  User ${userData.email} already exists, skipping...`);
          return { success: false, skipped: true, email: userData.email };
        }

        const { user } = await authClient.api.signUpEmail({
          body: {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            password: userData.password,
          },
        });

        await prisma.$transaction(async (tx) => {
          const newCompany = await tx.company.create({
            data: {
              name: userData.companyName,
              industry: userData.industry,
              website: userData.website,
              phone: userData.phone,
            },
          });

          await tx.admin.create({
            data: {
              userId: user.id,
              companyId: newCompany.id,
              phone: userData.phone,
            },
          });
        });

        console.log(
          `✅ Created admin profile for: ${userData.firstName} ${userData.lastName}`
        );
        return { success: true, email: userData.email };
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
        return { success: false, error, email: userData.email };
      }
    })
  );

  const successCount = results.filter(
    (result) => result.status === "fulfilled" && result.value.success
  ).length;
  const errorCount = results.filter(
    (result) =>
      result.status === "rejected" ||
      (result.status === "fulfilled" &&
        !result.value.success &&
        !result.value.skipped)
  ).length;

  console.log(
    `✅ Users seeding completed. Success: ${successCount}, Errors: ${errorCount}`
  );
};
