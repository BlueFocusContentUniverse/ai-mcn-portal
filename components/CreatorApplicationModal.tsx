"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitCreatorApplication } from "@/lib/actions";
import { countryCodes } from "@/lib/constants";

const creatorFormSchema = z.object({
  contactType: z.enum(["email", "phone"]),
  email: z.string().email().optional(),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  socialMediaId: z.string().min(1, "Social media ID is required"),
  platform: z.enum(["tiktok", "instagram", "youtube", "twitter", "other"]),
  otherPlatform: z.string().optional(),
});

type CreatorFormData = z.infer<typeof creatorFormSchema>;

interface CreatorApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatorApplicationModal({ open, onOpenChange }: CreatorApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatorFormData>({
    resolver: zodResolver(creatorFormSchema),
    defaultValues: {
      contactType: "email",
      platform: "tiktok",
    },
  });

  const contactType = form.watch("contactType");
  const platform = form.watch("platform");

  const onSubmit = async (data: CreatorFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("contactType", data.contactType);
      if (data.email) formData.append("email", data.email);
      if (data.phoneCountryCode) formData.append("phoneCountryCode", data.phoneCountryCode);
      if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
      formData.append("socialMediaId", data.socialMediaId);
      formData.append("platform", data.platform);
      if (data.otherPlatform) formData.append("otherPlatform", data.otherPlatform);

      const result = await submitCreatorApplication(formData);

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
      <DialogContent className="sm:max-w-[500px] bg-brand-black border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Apply as a Creator</DialogTitle>
          <DialogDescription className="text-gray-300">
            Join our network and start monetizing your content. Fill out the form below to get started.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Method */}
            <div className="space-y-4">
              <Label className="text-white">Contact Method</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="email-contact"
                    value="email"
                    {...form.register("contactType")}
                    className="text-brand-red"
                  />
                  <Label htmlFor="email-contact" className="flex items-center space-x-2 text-white">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="phone-contact"
                    value="phone"
                    {...form.register("contactType")}
                    className="text-brand-red"
                  />
                  <Label htmlFor="phone-contact" className="flex items-center space-x-2 text-white">
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
                          placeholder="your.email@example.com"
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

            {/* Social Media Platform */}
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Primary Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-brand-black border-white/10">
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Media ID */}
            <FormField
              control={form.control}
              name="socialMediaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Social Media ID/Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={
                        platform === "tiktok"
                          ? "@username"
                          : platform === "instagram"
                            ? "@username"
                            : platform === "youtube"
                              ? "Channel name or ID"
                              : platform === "twitter"
                                ? "@username"
                                : "Your platform username"
                      }
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">Enter your {platform} username or ID</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {platform === "other" && (
              <FormField
                control={form.control}
                name="otherPlatform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Platform Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Twitch, LinkedIn, etc."
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
