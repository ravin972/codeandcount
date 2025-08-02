
"use client";

import Image from "next/image";
import { SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SkiperCard } from "@/components/ui/skiper-card";

// NOTE: Placeholder images are used here.
// In a real scenario, you would place your images in the `public` directory
// and reference them like `/feature-1.png`.
const shiftCard = "https://placehold.co/600x400.png";
const family = "https://placehold.co/600x400.png";
const carousel = "https://placehold.co/600x400.png";
const textureFull = "https://placehold.co/600x400.png";
const skiper = "https://placehold.co/600x400.png";
const textureCard = "https://placehold.co/600x400.png";


export default function SkiperCardDemoPage() {
  return (
    <section className="relative my-14 w-full overflow-hidden " id="features">
      <div className="p-2">
        <div className="mb-8 mx-auto pt-4 md:container">
          <div className="mx-auto">
            <div className="flex w-full items-center justify-center">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border bg-card text-base"
              >
                <SparklesIcon className="mr-2 h-4 w-4 fill-primary stroke-1 text-primary-foreground" />
                Component Preview
              </Badge>
            </div>

            <div className="mx-auto max-w-4xl rounded-[34px] bg-neutral-700">
              <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
                <SkiperCard
                  step1img1Class={cn(
                    "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "left-1/4 top-[57%] rounded-[24px] max-md:scale-[160%] max-md:rounded-[24px] md:left-[35px] md:top-[29%]",
                    "md:group-hover:translate-y-2"
                  )}
                  step1img2Class={cn(
                    "pointer-events-none w-3/5 overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "left-[69%] top-[53%] rounded-2xl max-md:scale-[160%] max-md:rounded-[24px] md:left-[calc(50%+35px+1rem)] md:top-[21%]",
                    "md:group-hover:-translate-y-6 "
                  )}
                  step2img1Class={cn(
                    "pointer-events-none w-[50%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-1/4 top-[69%] max-md:scale-[160%] md:left-[35px] md:top-[30%]",
                    "md:group-hover:translate-y-2"
                  )}
                  step2img2Class={cn(
                    "pointer-events-none w-2/5 overflow-hidden rounded-2xl rounded-t-[24px] border border-stone-100/10 transition-all duration-500 group-hover:-translate-y-6 dark:border-stone-700",
                    "left-[70%] top-[53%] max-md:scale-[140%] md:left-[calc(50%+27px+1rem)] md:top-1/4",
                    "md:group-hover:-translate-y-6"
                  )}
                  step3imgClass={cn(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                  )}
                  step4imgClass={cn(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                  )}
                  description="Make your app 🤌"
                  bgClass="lg:bg-gradient-to-tr from-secondary to-primary/50"
                  image={{
                    step1light1: family,
                    step1light2: shiftCard,
                    step2light1: carousel,
                    step2light2: textureFull,
                    step3light: textureCard,
                    step4light: skiper,
                    alt: "Skiper Card Animations",
                  }}
                  title="Components that pop"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
