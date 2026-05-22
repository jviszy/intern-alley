import "dotenv/config";
import { Pool } from "pg";
import * as bcrypt from "bcryptjs";
import crypto from "crypto";

// Globally bypass TLS certificate validation for this seed script
// This is necessary because AWS RDS uses self-signed certificates and pg-pool's
// sslmode=require strictness overrides custom rejectUnauthorized config.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function main() {
  console.log("🌱 Seeding Intern Alley demo data...");

  const client = await pool.connect();

  try {
    const passwordHash = await bcrypt.hash("password123", 10);

    const companyUserId = crypto.randomUUID();
    const companyId = crypto.randomUUID();

    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO "User" ("id", "email", "passwordHash", "role", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, 'COMPANY_ADMIN', NOW(), NOW())
      ON CONFLICT ("email") DO UPDATE
      SET "passwordHash" = EXCLUDED."passwordHash",
          "role" = EXCLUDED."role",
          "updatedAt" = NOW()
      `,
      [companyUserId, "hr@technova.com", passwordHash]
    );

    const userResult = await client.query(
      `SELECT "id" FROM "User" WHERE "email" = $1`,
      ["hr@technova.com"]
    );

    const realCompanyUserId = userResult.rows[0].id;

    await client.query(
      `
      INSERT INTO "Company" ("id", "ownerUserId", "name", "description", "website", "industry", "location", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT ("ownerUserId") DO UPDATE
      SET "name" = EXCLUDED."name",
          "description" = EXCLUDED."description",
          "website" = EXCLUDED."website",
          "industry" = EXCLUDED."industry",
          "location" = EXCLUDED."location",
          "updatedAt" = NOW()
      `,
      [
        companyId,
        realCompanyUserId,
        "TechNova Labs",
        "A technology company building modern digital products.",
        "https://technova.example.com",
        "Technology",
        "Abuja",
      ]
    );

    const companyResult = await client.query(
      `SELECT "id" FROM "Company" WHERE "ownerUserId" = $1`,
      [realCompanyUserId]
    );

    const realCompanyId = companyResult.rows[0].id;

    await client.query(
      `
      DELETE FROM "Application"
      WHERE "jobId" IN (
        SELECT "id" FROM "Job" WHERE "companyId" = $1
      )
      `,
      [realCompanyId]
    );

    await client.query(
      `DELETE FROM "Job" WHERE "companyId" = $1`,
      [realCompanyId]
    );

    const jobs = [
      {
        title: "Frontend Intern",
        description:
          "Work with React and TypeScript to build beautiful, responsive interfaces for web applications.",
        location: "Abuja",
        jobType: "INTERNSHIP",
        workMode: "HYBRID",
        requiredSkills: ["React", "TypeScript", "CSS"],
        salaryMin: 80000,
        salaryMax: 150000,
      },
      {
        title: "UI/UX Design Intern",
        description:
          "Assist with user research, wireframes, prototypes, and interface design for mobile and web products.",
        location: "Lagos",
        jobType: "INTERNSHIP",
        workMode: "REMOTE",
        requiredSkills: ["Figma", "User Research", "Prototyping"],
        salaryMin: 70000,
        salaryMax: 120000,
      },
      {
        title: "Backend Developer Intern",
        description:
          "Support backend API development using Node.js, PostgreSQL, Prisma, and authentication systems.",
        location: "Remote",
        jobType: "INTERNSHIP",
        workMode: "REMOTE",
        requiredSkills: ["Node.js", "PostgreSQL", "Prisma"],
        salaryMin: 90000,
        salaryMax: 160000,
      },
      {
        title: "Product Management Intern",
        description:
          "Work with designers and engineers to document requirements, test features, and support product delivery.",
        location: "Abuja",
        jobType: "INTERNSHIP",
        workMode: "ONSITE",
        requiredSkills: ["Communication", "Research", "Documentation"],
        salaryMin: 60000,
        salaryMax: 100000,
      },
    ];

    for (const job of jobs) {
      await client.query(
        `
        INSERT INTO "Job" (
          "id",
          "companyId",
          "title",
          "description",
          "location",
          "jobType",
          "workMode",
          "requiredSkills",
          "salaryMin",
          "salaryMax",
          "deadline",
          "status",
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, NULL, 'OPEN', NOW(), NOW()
        )
        `,
        [
          crypto.randomUUID(),
          realCompanyId,
          job.title,
          job.description,
          job.location,
          job.jobType,
          job.workMode,
          job.requiredSkills,
          job.salaryMin,
          job.salaryMax,
        ]
      );
    }

    await client.query("COMMIT");

    console.log("✅ Demo company created:");
    console.log("   Email: hr@technova.com");
    console.log("   Password: password123");
    console.log("✅ Demo jobs created:", jobs.length);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();