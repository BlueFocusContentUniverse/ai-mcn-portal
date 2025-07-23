"use client";

import { AlertCircle, Building2, CheckCircle, Send, Users, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/actions";
import { useTranslation } from "react-i18next";

import { useContactForm } from "./ContactFormProvider";

interface ContactFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  serviceType?: "brand" | "creator";
  clickPosition?: { x: number; y: number };
}

export function ContactForm({
  isOpen: propIsOpen,
  onClose: propOnClose,
  serviceType: propServiceType,
}: ContactFormProps) {
  const { formState, closeForm } = useContactForm();
  const { t } = useTranslation(["home"]);
  // Use context state if no props provided, otherwise use props
  const isOpen = propIsOpen !== undefined ? propIsOpen : formState.isOpen;
  const onClose = propOnClose || closeForm;
  const initialServiceType = propServiceType || formState.serviceType;
  const clickPositionFromContext = formState.clickPosition;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    phoneCountryCode: "+1",
    message: "",
    serviceType: initialServiceType,
    // Brand-specific fields
    brandName: "",
    // Creator-specific fields
    platform: "tiktok",
    otherPlatform: "",
    socialMediaId: "",
    contactType: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Update form data when serviceType changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: initialServiceType,
    }));
  }, [initialServiceType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();

      // Add all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSubmit.append(key, value);
        }
      });

      const result = await submitContactForm(formDataToSubmit);

      if (result.error) {
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            phoneCountryCode: "+1",
            message: "",
            serviceType: initialServiceType,
            brandName: "",
            platform: "tiktok",
            otherPlatform: "",
            socialMediaId: "",
            contactType: "email",
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Calculate transform origin based on click position
  const getTransformOrigin = () => {
    if (!clickPositionFromContext) return "center";

    const { x, y } = clickPositionFromContext;
    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;

    return `${xPercent}% ${yPercent}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-300"
        style={{
          transformOrigin: getTransformOrigin(),
        }}
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("contact.title")}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{t("contact.subtitle")}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="p-6 space-y-6">
          {/* Service Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">I&apos;m interested in:</Label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  name="serviceType"
                  value="brand"
                  checked={formData.serviceType === "brand"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.serviceType === "brand"
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">Brand Partnership</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Scale your content production</div>
                  </div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  name="serviceType"
                  value="creator"
                  checked={formData.serviceType === "creator"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.serviceType === "creator"
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">Creator Application</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Join our creator network</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Brand-specific fields */}
          {formData.serviceType === "brand" && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Brand Information</span>
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="brandName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Brand Name *
                  </Label>
                  <Input
                    id="brandName"
                    name="brandName"
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Your brand name"
                  />
                </div>
              </div>
            </>
          )}

          {/* Creator-specific fields */}
          {formData.serviceType === "creator" && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Creator Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Platform</Label>
                    <Select value={formData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialMediaId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Social Media ID/Username *
                    </Label>
                    <Input
                      id="socialMediaId"
                      name="socialMediaId"
                      type="text"
                      required
                      value={formData.socialMediaId}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder={
                        formData.platform === "tiktok"
                          ? "@username"
                          : formData.platform === "instagram"
                            ? "@username"
                            : formData.platform === "youtube"
                              ? "Channel name or ID"
                              : formData.platform === "twitter"
                                ? "@username"
                                : "Your platform username"
                      }
                    />
                  </div>
                </div>

                {formData.platform === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherPlatform" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Platform Name
                    </Label>
                    <Input
                      id="otherPlatform"
                      name="otherPlatform"
                      type="text"
                      value={formData.otherPlatform}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="e.g., Twitch, LinkedIn, etc."
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tell us about your project *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full resize-none"
              placeholder={
                formData.serviceType === "brand"
                  ? "Describe your content goals, current challenges, and what you're looking to achieve..."
                  : "Tell us about your content, audience, and what you're looking to achieve..."
              }
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="cta-button min-w-[120px]">
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : submitStatus === "success" ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sent!</span>
                </div>
              ) : submitStatus === "error" ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Try Again</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Submit</span>
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mx-6 mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Message sent successfully!</span>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mx-6 mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Something went wrong</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">Please try again or contact us directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
