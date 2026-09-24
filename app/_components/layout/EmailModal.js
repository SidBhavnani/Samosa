"use client";

import { useEmailModal } from "@/app/_contexts/EmailModalContext";
import { PrismicNextImage } from "@prismicio/next";
import { Mail, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function EmailModal({ data }) {
  const { isOpen, closeEmailModal } = useEmailModal();

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(true);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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
    setIsSubscribed(true);
  };

  const notSubmitted = (
    <>
      <p className="text-center font-extrabold text-lg md:text-2xl w-4/5 md:w-3/4 mx-auto md:mb-4 text-samosa-magenta">
        {data.email_pop_up_heading}
      </p>
      <p className="text-center text-sm md:text-lg w-9/10 md:w-4/5 mx-auto mb-2 md:mb-4 text-samosa-magenta">
        {data.email_pop_up_subheading}
      </p>

      <form
        onSubmit={handleSubscribe}
        className="mb-2 md:mb-4 w-9/10 md:w-4/5 mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-5 py-3 w-full mb-2 md:mb-4 rounded-full bg-samosa-cream text-foreground font-sans text-sm border-none outline-none shadow-sm"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-sans font-bold"
        >
          {data.email_pop_up_button_text}
        </Button>
      </form>

      <p className="text-center text-xs md:text-sm w-4/5 md:w-3/4 mx-auto mb-2 md:mb-4 text-samosa-magenta">
        {data.email_pop_up_footer}
      </p>
    </>
  );

  const submitted = (
    <>
      <Mail className="h-12 w-12 text-primary mb-2 md:mb-4 mx-auto" />
      <p className="text-foreground font-semibold text-xl text-center mx-auto">
        {submittedSuccess
          ? "Thanks for subscribing!"
          : "Oops, something went wrong."}
      </p>
      <p className="text-muted-foreground text-lg font-sans text-center mb-2 md:mb-4 mx-auto">
        {submittedSuccess
          ? "Check your inbox for a welcome surprise 🎉"
          : "Please try again later!"}
      </p>
    </>
  );

  return (
    <div
      className={`${isOpen ? "" : "hidden "}fixed left-0 top-0 right-0 bottom-0 z-50`}
    >
      <div
        className="fixed inset-0 bg-black/50 z-51"
        onClick={closeEmailModal}
      />
      <div className="absolute w-4/5 md:w-120 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-[#f3f0a1] rounded-md z-52">
        <X
          className="absolute top-2 right-2 cursor-pointer"
          onClick={closeEmailModal}
        />
        <PrismicNextImage
          field={data.email_pop_up_image}
          className="object-cover w-auto h-14 md:h-18 mx-auto my-2 md:my-4"
        />
        {isSubscribed ? submitted : notSubmitted}
      </div>
    </div>
  );
}
