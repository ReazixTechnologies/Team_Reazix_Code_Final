import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormProgress } from "./FormProgress";
import { ChoiceGroup } from "./ChoiceGroup";
import { ThankYouAnimation } from "./ThankYouAnimation";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_mwnigch";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_ijr2sop";
const EMAILJS_CLIENT_TEMPLATE_ID = "template_1ru8nmb";
const EMAILJS_PUBLIC_KEY = "Jtp-DRQDLsD4xlZVQ";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  customService: string;
  budget: string;
  customBudget: string;
  message: string;
}

const SERVICE_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "ai-development", label: "AI Development" },
  { value: "custom-software", label: "Custom Software" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "seo-growth", label: "SEO & Growth" },
  { value: "custom", label: "Custom (Specify below)" },
];

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under ₹10,000" },
  { value: "10k-50k", label: "₹10,000 – ₹50,000" },
  { value: "50k-1lac", label: "₹50,000 – ₹1,00,000" },
  { value: "1lac-5lac", label: "₹1,00,000 – ₹5,00,000" },
  { value: "5lac+", label: "₹5,00,000+" },
  { value: "custom", label: "Custom (Specify below)" },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    customService: "",
    budget: "",
    customBudget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.service === "custom" && !formData.customService.trim()) {
      newErrors.customService = "Please specify your service";
    }
    if (formData.budget === "custom" && !formData.customBudget.trim()) {
      newErrors.customBudget = "Please specify your budget";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      const time = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "short",
      });

      const serviceLabel =
        formData.service === "custom"
          ? formData.customService
          : SERVICE_OPTIONS.find((s) => s.value === formData.service)?.label || "Not specified";

      const budgetLabel =
        formData.budget === "custom"
          ? formData.customBudget
          : BUDGET_OPTIONS.find((b) => b.value === formData.budget)?.label || "Not specified";

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || "Not specified",
        service: serviceLabel,
        budget: budgetLabel,
        message: formData.message,
        time: time,
        to_email: formData.email,   // ← this becomes the client's email
      };

      // 1. Admin notification — MUST succeed
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Client thank-you — if invalid email, don't crash the flow
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CLIENT_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } catch (clientErr) {
        console.warn("Client auto-reply failed (probably invalid email):", clientErr);
      }

      // 3. Success state
      setStatus("success");
      setShowThankYou(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        customService: "",
        budget: "",
        customBudget: "",
        message: "",
      });

      setTimeout(() => {
        setShowThankYou(false);
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };
  return (
    <>
      {/* Thank You Animation - PhonePe Style */}
      {showThankYou && <ThankYouAnimation />}

      {/* Form Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-light text-text">Send us a message</h3>
          <p className="text-text-faint text-xs">Fill in the details below</p>
        </div>
        <FormProgress
          steps={["Info", "Project", "Details"]}
          currentStep={formData.name && formData.email && formData.phone ? (formData.message ? 2 : 1) : 0}
        />
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Company */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Full Name *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            required
          />
          <FormField
            label="Company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label="Email Address *"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            error={errors.email}
            required
          />
          <FormField
            label="Phone Number *"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            error={errors.phone}
            required
          />
        </div>

        {/* Service + Custom Service */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <ChoiceGroup
              label="Service Interest"
              name="service"
              value={formData.service}
              onChange={handleChange}
              options={SERVICE_OPTIONS}
              placeholder="Select a service"
            />
          </div>
          {formData.service === "custom" && (
            <FormField
              label="Specify Your Service *"
              type="text"
              name="customService"
              value={formData.customService}
              onChange={handleChange}
              placeholder="e.g., AI Chatbot, ERP System"
              error={errors.customService}
              required
            />
          )}
        </div>

        {/* Budget + Custom Budget */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <ChoiceGroup
              label="Budget Range"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              options={BUDGET_OPTIONS}
              placeholder="Select a range"
            />
          </div>
          {formData.budget === "custom" && (
            <FormField
              label="Specify Your Budget *"
              type="text"
              name="customBudget"
              value={formData.customBudget}
              onChange={handleChange}
              placeholder="e.g., ₹2,00,000"
              error={errors.customBudget}
              required
            />
          )}
        </div>

        {/* Message */}
        <FormField
          label="Tell us about your project *"
          type="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What are you building? What challenges are you facing?"
          error={errors.message}
          rows={4}
          required
        />

        {/* Submit */}
        <SubmitButton status={status} />

        {/* Status Messages */}
        {status === "error" && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            ✗ Something went wrong. Please try again or email us directly.
          </div>
        )}

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-text-faint pt-2">
          <span>🔒 Secure</span>
          <span className="w-px h-3 bg-line/30" />
          <span>24hr Response</span>
          <span className="w-px h-3 bg-line/30" />
          <span>No Spam</span>
        </div>
      </form>
    </>
  );
}