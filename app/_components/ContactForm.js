"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { AnimatedSection } from "./AnimatedSection";
import { Label } from "./ui/label";
import z from "zod";
import { Turnstile } from "@marsidev/react-turnstile";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    turnstileToken: "",
  });

  // const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.turnstileToken) {
      alert("Please complete the verification.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // console.log(data);

    if (data.success) {
      setSubmittedSuccess(true);
    } else {
      setSubmittedSuccess(false);
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div>
      <AnimatedSection variant="fade-right">
        <h2 className="text-[50px] font-bystander uppercase leading-[1.1] tracking-normal mb-8">
          <span className="text-primary">Send us a </span>
          <span className="text-secondary">Message.</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection variant="fade-up" delay={200}>
        {isSubmitted ? (
          <div className="bg-muted rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {submittedSuccess ? "Message Sent!" : "Error!"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {submittedSuccess
                ? "Thanks for reaching out. We'll get back to you within 24 hours."
                : "Something went wrong. Please try again."}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="rounded-full"
            >
              {submittedSuccess ? "Send Another Message" : "Try Again"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={"rounded-lg"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={"rounded-lg"}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className={"rounded-lg"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what's on your mind..."
                rows={5}
                className={"rounded-lg"}
              />
            </div>

            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              onSuccess={(token) =>
                setFormData((prev) => ({ ...prev, turnstileToken: token }))
              }
            />

            <Button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 font-semibold rounded-full shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </AnimatedSection>
    </div>
  );
}
