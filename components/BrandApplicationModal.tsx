"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, Phone, Users } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitBrandApplication } from "@/lib/actions";
import { countryCodes } from "@/lib/constants";

const brandFormSchema = z.object({
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
  otherIndustry: z.string().optional(),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(10, "Please provide a brief description of your brand"),
  contactType: z.enum(["email", "phone"]),
  email: z.string().email().optional(),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  contactName: z.string().min(1, "Contact person name is required"),
  contactTitle: z.string().min(1, "Contact person title is required"),
});

type BrandFormData = z.infer<typeof brandFormSchema>;

interface BrandApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrandApplicationModal({ open, onOpenChange }: BrandApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      contactType: "email",
      companySize: "medium",
    },
  });

  const contactType = form.watch("contactType");
  const industry = form.watch("industry");

  const onSubmit = async (data: BrandFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("brandName", data.brandName);
      formData.append("industry", data.industry);
      if (data.otherIndustry) formData.append("otherIndustry", data.otherIndustry);
      formData.append("companySize", data.companySize);
      if (data.website) formData.append("website", data.website);
      formData.append("description", data.description);
      formData.append("contactType", data.contactType);
      if (data.email) formData.append("email", data.email);
      if (data.phoneCountryCode) formData.append("phoneCountryCode", data.phoneCountryCode);
      if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
      formData.append("contactName", data.contactName);
      formData.append("contactTitle", data.contactTitle);

      const result = await submitBrandApplication(formData);

      if (result.error) {
        alert(result.error);
      } else {
        // Close modal and show success message
        onOpenChange(false);
        form.reset();
        alert("Application submitted successfully! We'll get back to you soon.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-brand-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Partner as a Brand</DialogTitle>
          <DialogDescription className="text-gray-300">
            Scale your brand with our creator network. Fill out the form below to start your partnership.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Brand Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Brand Information</span>
              </h3>

              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your brand name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-brand-black border-white/10">
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="beauty">Beauty</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="fitness">Fitness & Health</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/20 text-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-brand-black border-white/10">
                          <SelectItem value="startup">Startup (1-10)</SelectItem>
                          <SelectItem value="small">Small (11-50)</SelectItem>
                          <SelectItem value="medium">Medium (51-200)</SelectItem>
                          <SelectItem value="large">Large (201-1000)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {industry === "other" && (
                <FormField
                  control={form.control}
                  name="otherIndustry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Industry Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please specify your industry"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Website (Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://your-brand.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Brand Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your brand, products, and target audience..."
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Help us understand your brand better to match you with the right creators.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Contact Information</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Contact Person Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Contact Person Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Marketing Manager"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-white">Preferred Contact Method</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="email-contact-brand"
                      value="email"
                      {...form.register("contactType")}
                      className="text-brand-red"
                    />
                    <Label htmlFor="email-contact-brand" className="flex items-center space-x-2 text-white">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="phone-contact-brand"
                      value="phone"
                      {...form.register("contactType")}
                      className="text-brand-red"
                    />
                    <Label htmlFor="phone-contact-brand" className="flex items-center space-x-2 text-white">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </Label>
                  </div>
                </div>

                {contactType === "email" && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="contact@your-brand.com"
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {contactType === "phone" && (
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneCountryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Country Code</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="+1" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-brand-black border-white/10">
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.code} ({country.country})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-brand-red hover:bg-red-600 text-white">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
