"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

// Unified validation schema for contact form
const contactFormSchema = z.object({
  serviceType: z.enum(["brand", "creator"]),
  // Common fields
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneCountryCode: z.string().optional().nullable(),
  message: z.string().optional(),
  // Brand-specific fields
  brandName: z.string().optional().nullable(),
  // Creator-specific fields
  platform: z.enum(["tiktok", "instagram", "youtube", "twitter", "other"]).optional().nullable(),
  otherPlatform: z.string().optional().nullable(),
  socialMediaId: z.string().optional().nullable(),
  contactType: z.enum(["email", "phone"]).optional().nullable(),
});

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

export async function submitContactForm(formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    serviceType: formData.get("serviceType"),
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    phoneCountryCode: formData.get("phoneCountryCode"),
    message: formData.get("message"),
    brandName: formData.get("brandName"),
    website: formData.get("website"),
    contactTitle: formData.get("contactTitle"),
    platform: formData.get("platform"),
    otherPlatform: formData.get("otherPlatform"),
    socialMediaId: formData.get("socialMediaId"),
    contactType: formData.get("contactType"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const {
    serviceType,
    name,
    email,
    company,
    phone,
    phoneCountryCode,
    message,
    brandName,
    platform,
    otherPlatform,
    socialMediaId,
    contactType,
  } = validatedFields.data;

  try {
    revalidatePath("/");
    return { success: `${serviceType === "brand" ? "Brand" : "Creator"} application submitted successfully!` };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { error: "Failed to submit application. Please try again." };
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
    revalidatePath("/");
    return { success: "Brand application submitted successfully!" };
  } catch (error) {
    console.error("Error submitting brand application:", error);
    return { error: "Failed to submit application. Please try again." };
  }
}
