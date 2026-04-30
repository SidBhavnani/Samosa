"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  //   console.log(images);
  return (
    <>
      {/* Thumbnail Strip - far left, scrollable with max height */}
      <div className="hidden lg:flex flex-col gap-3 w-[80px] shrink-0 max-h-[480px] overflow-y-auto scroll-smooth scrollbar-hide pr-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-[80px] h-[80px] rounded-xl overflow-hidden border-[3px] shrink-0 transition-all duration-300 ${
              selectedImage === index
                ? "border-secondary shadow-lg opacity-100"
                : "border-primary/20 hover:border-primary/50 opacity-60 hover:opacity-100"
            }`}
            style={{
              animation: `fadeSlideIn 0.4s ease-out ${index * 0.08}s both`,
            }}
          >
            <div className="w-full h-full relative">
              <Image
                src={img.node.url}
                alt={`Samosa ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                fill
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main Image - large with thick white border */}
      <div className="relative w-full lg:flex-1 max-w-[420px] md:max-w-[460px] lg:max-w-[520px] shrink-0 mt-4 lg:mt-0 mx-auto">
        {/* Floating Badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-secondary text-secondary-foreground font-sans font-black text-xs md:text-sm uppercase tracking-[0.12em] px-4 md:px-6 py-2 md:py-2.5 rounded-full shadow-lg whitespace-nowrap">
            Bestseller
          </span>
        </div>
        {/* Image with thick white frame */}
        <div className="rounded-2xl overflow-hidden border border-black/20 shadow-2xl">
          <div className="bg-samosa-cream flex items-center justify-center aspect-[4/5]">
            <div className="w-full h-full relative">
              <Image
                src={images[selectedImage].node.url}
                alt={"Samosa"}
                className={`w-full h-full ${images[selectedImage].node.url.includes(".png") ? "object-contain" : "object-cover"}`}
                loading="lazy"
                fill
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center lg:justify-end gap-3 mt-3">
          <button
            onClick={() =>
              setSelectedImage((prev) =>
                prev === 0 ? images.length - 1 : prev - 1,
              )
            }
            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform border-2 border-foreground/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" strokeWidth={3} />
          </button>
          <button
            onClick={() =>
              setSelectedImage((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
              )
            }
            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform border-2 border-foreground/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={3} />
          </button>
        </div>

        {/* Mobile Thumbnail Strip */}
        <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-[60px] h-[60px] rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                selectedImage === index
                  ? "border-secondary shadow-lg"
                  : "border-primary/20"
              }`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={img.node.url}
                  alt={`Samosa ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fill
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
