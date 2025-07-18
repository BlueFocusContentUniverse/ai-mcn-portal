"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/prisma";

// Validation schemas for server actions
const creatorApplicationSchema = z.object({
  contactType: z.enum(["email", "phone"]),
  email: z.email().optional().nullable(),
  phoneCountryCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  socialMediaId: z.string().min(1, "Social media ID is required"),
  platform: z.enum(["tiktok", "instagram", "youtube", "twitter", "other"]),
  otherPlatform: z.string().nullable().optional(),
});

const brandApplicationSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  industry: z.enum([
    "fashion",
    "beauty",
    "technology",
    "food",
    "fitness",
    "education",
    "entertainment",
    "finance",
    "healthcare",
    "automotive",
    "travel",
    "sports",
    "other",
  ]),
  otherIndustry: z.string().optional().nullable(),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]).nullable(),
  website: z.url().optional().or(z.literal("")).nullable(),
  description: z.string().min(10, "Please provide a brief description of your brand").nullable(),
  contactType: z.enum(["email", "phone"]),
  email: z.email().optional().nullable(),
  phoneCountryCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  contactName: z.string().min(1, "Contact person name is required").nullable(),
  contactTitle: z.string().min(1, "Contact person title is required").nullable(),
});

// Helper function to map form platform to database enum
function mapPlatformToEnum(platform: string): "TIKTOK" | "INSTAGRAM" | "YOUTUBE" | "TWITTER" | "OTHER" {
  switch (platform) {
    case "tiktok":
      return "TIKTOK";
    case "instagram":
      return "INSTAGRAM";
    case "youtube":
      return "YOUTUBE";
    case "twitter":
      return "TWITTER";
    case "other":
      return "OTHER";
    default:
      return "OTHER";
  }
}

// Helper function to map form industry to database enum
function mapIndustryToEnum(
  industry: string,
):
  | "FASHION"
  | "BEAUTY"
  | "TECHNOLOGY"
  | "FOOD"
  | "FITNESS"
  | "EDUCATION"
  | "ENTERTAINMENT"
  | "FINANCE"
  | "HEALTHCARE"
  | "AUTOMOTIVE"
  | "TRAVEL"
  | "SPORTS"
  | "OTHER" {
  switch (industry) {
    case "fashion":
      return "FASHION";
    case "beauty":
      return "BEAUTY";
    case "technology":
      return "TECHNOLOGY";
    case "food":
      return "FOOD";
    case "fitness":
      return "FITNESS";
    case "education":
      return "EDUCATION";
    case "entertainment":
      return "ENTERTAINMENT";
    case "finance":
      return "FINANCE";
    case "healthcare":
      return "HEALTHCARE";
    case "automotive":
      return "AUTOMOTIVE";
    case "travel":
      return "TRAVEL";
    case "sports":
      return "SPORTS";
    case "other":
      return "OTHER";
    default:
      return "OTHER";
  }
}

// Helper function to map form company size to database enum
function mapCompanySizeToEnum(companySize: string): "STARTUP" | "SMALL" | "MEDIUM" | "LARGE" | "ENTERPRISE" {
  switch (companySize) {
    case "startup":
      return "STARTUP";
    case "small":
      return "SMALL";
    case "medium":
      return "MEDIUM";
    case "large":
      return "LARGE";
    case "enterprise":
      return "ENTERPRISE";
    default:
      return "MEDIUM";
  }
}

export async function submitCreatorApplication(formData: FormData) {
  const validatedFields = creatorApplicationSchema.safeParse({
    contactType: formData.get("contactType"),
    email: formData.get("email"),
    phoneCountryCode: formData.get("phoneCountryCode"),
    phoneNumber: formData.get("phoneNumber"),
    socialMediaId: formData.get("socialMediaId"),
    platform: formData.get("platform"),
    otherPlatform: formData.get("otherPlatform"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { contactType, email, phoneCountryCode, phoneNumber, socialMediaId, platform, otherPlatform } =
    validatedFields.data;

  try {
    await prisma.creatorApplication.create({
      data: {
        contactType: contactType === "email" ? "EMAIL" : "PHONE",
        email: email || "",
        phoneCountryCode: phoneCountryCode || "",
        phoneNumber: phoneNumber || "",
        platform: mapPlatformToEnum(platform),
        otherPlatform: otherPlatform || "",
        socialMediaId,
      },
    });

    revalidatePath("/");
    return { success: "Creator application submitted successfully!" };
  } catch (error) {
    console.error("Error submitting creator application:", error);
    return { error: "Failed to submit application. Please try again." };
  }
}

export async function submitBrandApplication(formData: FormData) {
  const validatedFields = brandApplicationSchema.safeParse({
    brandName: formData.get("brandName"),
    industry: formData.get("industry"),
    otherIndustry: formData.get("otherIndustry"),
    companySize: formData.get("companySize"),
    website: formData.get("website"),
    description: formData.get("description"),
    contactType: formData.get("contactType"),
    email: formData.get("email"),
    phoneCountryCode: formData.get("phoneCountryCode"),
    phoneNumber: formData.get("phoneNumber"),
    contactName: formData.get("contactName"),
    contactTitle: formData.get("contactTitle"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const {
    brandName,
    industry,
    otherIndustry,
    companySize,
    website,
    description,
    contactType,
    email,
    phoneCountryCode,
    phoneNumber,
    contactName,
    contactTitle,
  } = validatedFields.data;

  try {
    await prisma.brandApplication.create({
      data: {
        brandName,
        industry: mapIndustryToEnum(industry),
        otherIndustry: otherIndustry || null,
        companySize: mapCompanySizeToEnum(companySize ?? "startup"),
        website: website || null,
        description: description || "",
        contactType: contactType === "email" ? "EMAIL" : "PHONE",
        email: email || null,
        phoneCountryCode: phoneCountryCode || null,
        phoneNumber: phoneNumber || null,
        contactName: contactName || "",
        contactTitle: contactTitle || "",
      },
    });

    revalidatePath("/");
    return { success: "Brand application submitted successfully!" };
  } catch (error) {
    console.error("Error submitting brand application:", error);
    return { error: "Failed to submit application. Please try again." };
  }
}
