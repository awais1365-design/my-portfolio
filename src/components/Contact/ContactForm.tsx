"use client";

import { useState } from "react";
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const [status, setStatus] = useState<any>(null);
  const [isPending, setPending] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPending(true);

    const form = new FormData(e.target);

    // Web3Forms API (FREE)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form
    }).then((res) => res.json());

    setPending(false);

    if (response.success) {
      setStatus({
        success: true,
        message: "Message sent successfully!"
      });
      e.target.reset();
    } else {
      setStatus({
        success: false,
        message: "Failed to send message. Try again."
      });
    }
  };

  // Success message UI
  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">
        {status.message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Required for Web3Forms */}
      <input type="hidden" name="access_key" value="b650637c-9aa2-4154-9826-d3fca935688a" />

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

      {/* Error message */}
      {status?.success === false && (
        <p className="my-2 font-light text-red-600">{status.message}</p>
      )}

      <Button text={isPending ? "Submitting..." : "Submit"} disabled={isPending} />
    </form>
  );
};

export default ContactForm;
