"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    topic: "general",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setLoading(true);
    // Client-side simulation of message receipt
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center rounded-xl bg-[var(--card)] border border-[var(--primary)]/30 space-y-4">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">
          Thank you for reaching out!
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
          Your feedback has been received locally. The editorial team reviews user suggestions and
          prompt submissions to keep the library fresh, relevant, and accurate.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", topic: "general", subject: "", message: "" });
            }}
          >
            Send Another Note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-semibold text-[var(--foreground)]">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <Input
            id="contact-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Jordan Smith"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-topic" className="text-xs font-semibold text-[var(--foreground)]">
            Topic / Reason
          </label>
          <select
            id="contact-topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="flex h-10 w-full rounded-[var(--radius-md)] border border-[var(--input)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
          >
            <option value="prompt_submission">Suggest a New Prompt</option>
            <option value="category_request">Suggest a Category</option>
            <option value="bug_report">Report an Issue / Bug</option>
            <option value="general">General Feedback & Inquiry</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="text-xs font-semibold text-[var(--foreground)]">
          Subject
        </label>
        <Input
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Brief summary of your note or prompt name"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-[var(--foreground)]">
          Message & Prompt Details <span className="text-rose-500">*</span>
        </label>
        <Textarea
          id="contact-message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Include prompt instructions, target category, why it is useful, or your feedback..."
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-[11px] text-[var(--muted-foreground)]">
          No personal registration required. Messages are processed safely.
        </p>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          rightIcon={loading ? undefined : <Send className="h-4 w-4" />}
        >
          {loading ? "Transmitting..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
