"use client";

import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";

interface StatusType {
  success: boolean;
  message: string;
}

const ContactForm = () => {
  const [status, setStatus] = useState<StatusType | null>(null);
  const [isPending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log("📨 Sending Form Data →", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      console.log("📡 Raw Response:", response);

      const data = await response.json();

      console.log("🔍 Web3Forms JSON Response →", data);

      setPending(false);

      if (data.success) {
        setStatus({
          success: true,
          message: "Message sent successfully!",
        });

        form.reset();
      } else {
        setStatus({
          success: false,
          message: `Error: ${data.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("❌ Submit Error →", error);
      setPending(false);
      setStatus({
        success: false,
        message: "Network error. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Web3Forms Required Access Key */}
      <input
        type="hidden"
        name="access_key"
        value="YOUR_REAL_ACCESS_KEY_HERE"
      />

      <Input
        label="Full name"
        id="name"
        name="name"
        placeholder="Your name here"
        required
      />

      <Input
        label="Email address"
        id="email"
        type="email"
        name="email"
        placeholder="Your email address here"
        required
      />

      <Input
        label="Subject"
        id="subject"
        name="subject"
        placeholder="Your subject here"
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        placeholder="Your message here"
        rows={7}
        required
      />

      {/* Feedback Message */}
      {status && (
        <p
          className={`my-3 text-center ${
            status.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <Button
        type="submit"
        text={isPending ? "Submitting..." : "Submit"}
        disabled={isPending}
      />
    </form>
  );
};

export default ContactForm;
