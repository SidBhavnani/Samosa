"use client";

import { useEmailModal } from "@/app/_contexts/EmailModalContext";
import { PrismicNextImage } from "@prismicio/next";
import { Check, Copy, Mail, X, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EventModal({ data }) {
  const { isOpen, closeEmailModal, openEmailModal, tabClosed, closeTab } =
    useEmailModal();

  return (
    <>
      <div
        className={`${isOpen ? "" : "hidden "}fixed left-0 top-0 right-0 bottom-0 z-50`}
      >
        <div
          className="fixed inset-0 bg-black/50 z-51"
          onClick={closeEmailModal}
        />
        <div
          className={`absolute flex flex-col-reverse overflow-hidden w-4/5 md:w-120 aspect-[${data.banner_aspect_ratio}] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-[#f3f0a1] rounded-md z-52`}
        >
          <X
            className="absolute top-2 right-2 cursor-pointer z-55"
            onClick={closeEmailModal}
          />
          <PrismicNextImage
            field={data.banner_image}
            className="object-cover"
            fill
          />
          {data.button_text && (
            <Button
              type="submit"
              className="mx-auto p-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-sans font-bold z-55"
              onClick={closeEmailModal}
            >
              <Link className="px-8 py-2" href={data.button_destination}>
                {data.button_text}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* <div
        className={`${isOpen || tabClosed ? "hidden " : ""}fixed top-[45%] transform -translate-y-1/2 right-0 z-55`}
      >
        
        <button
          type="button"
          className="absolute left-1 top-1 cursor-pointer z-10 flex h-5 w-5 -translate-1/2 items-center justify-center rounded-full bg-white text-samosa-magenta shadow-md"
          aria-label="Close"
          onClick={closeTab}
        >
          <XIcon className="h-3 w-3" />
        </button>
        <button
          onClick={openEmailModal}
          className="relative flex cursor-pointer h-[120px] w-[40px] md:h-[140px] md:w-[45px] items-center justify-center bg-samosa-yellow-light"
        >
          <span className="rotate-180 text-sm md:text-base font-bystander uppercase tracking-[1px] text-samosa-magenta [writing-mode:vertical-rl]">
            Get 10% off! ✨
          </span>
        </button>
      </div> */}
    </>
  );
}
