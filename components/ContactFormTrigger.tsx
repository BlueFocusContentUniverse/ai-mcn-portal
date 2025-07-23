"use client";

import { Button } from "@/components/ui/button";

import { useContactForm } from "./ContactFormProvider";

interface ContactFormTriggerProps {
  serviceType?: "brand" | "creator";
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ContactFormTrigger({
  serviceType = "brand",
  children,
  variant = "default",
  size = "default",
  className = "",
}: ContactFormTriggerProps) {
  const { openForm } = useContactForm();

  const handleClick = (e: React.MouseEvent) => {
    const clickPosition = {
      x: e.clientX,
      y: e.clientY,
    };
    openForm(serviceType, clickPosition);
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}
