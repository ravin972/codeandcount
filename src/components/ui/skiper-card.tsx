
"use client"

import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/lib/utils"

interface ImageProps {
  step1light1: StaticImageData | string
  step1light2: StaticImageData | string
  step2light1: StaticImageData | string
  step2light2: StaticImageData | string
  step3light: StaticImageData | string
  step4light: StaticImageData | string
  alt: string
}

interface SkiperCardProps {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  title: string
  description: string
  bgClass?: string
  image: ImageProps
}

export function SkiperCard({
  step1img1Class,
  step1img2Class,
  step2img1Class,
  step2img2Class,
  step3imgClass,
  step4imgClass,
  title,
  description,
  bgClass,
  image,
}: SkiperCardProps) {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleStepHover = (step: number) => {
    setActiveStep(step)
  }

  const steps = [
    { id: 1, title: "Step 1", content: "Content for Step 1" },
    { id: 2, title: "Step 2", content: "Content for Step 2" },
    { id: 3, title: "Step 3", content: "Content for Step 3" },
    { id: 4, title: "Step 4", content: "Content for Step 4" },
  ]

  const {
    step1light1,
    step1light2,
    step2light1,
    step2light2,
    step3light,
    step4light,
    alt,
  } = image

  return (
    <div
      className={cn(
        "group relative grid h-full w-full grid-cols-1 overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900 text-white dark:border-stone-700/50 md:grid-cols-2",
        bgClass
      )}
      onMouseLeave={() => setActiveStep(0)}
    >
      <div className="flex w-full flex-col justify-end p-8">
        <h2 className="mb-4 text-3xl font-semibold text-white/80">{title}</h2>
        <p className="max-w-sm text-base text-white/50">{description}</p>
        <div className="mt-8 flex flex-col gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "w-full cursor-pointer rounded-lg p-3 transition-all duration-300",
                activeStep === index + 1
                  ? "bg-white/20"
                  : "bg-transparent hover:bg-white/10"
              )}
              onMouseEnter={() => handleStepHover(index + 1)}
            >
              <h3 className="font-semibold text-white">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-full min-h-[400px] w-full">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeStep === 1 || activeStep === 0 ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={step1light1}
            alt={alt}
            className={cn("absolute", step1img1Class)}
            width={400} height={300}
          />
          <Image
            src={step1light2}
            alt={alt}
            className={cn("absolute", step1img2Class)}
            width={400} height={300}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeStep === 2 ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={step2light1}
            alt={alt}
            className={cn("absolute", step2img1Class)}
            width={400} height={300}
          />
          <Image
            src={step2light2}
            alt={alt}
            className={cn("absolute", step2img2Class)}
            width={400} height={300}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeStep === 3 ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={step3light}
            alt={alt}
            className={cn("absolute", step3imgClass)}
            width={400} height={300}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeStep === 4 ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={step4light}
            alt={alt}
            className={cn("absolute", step4imgClass)}
            width={400} height={300}
          />
        </div>
      </div>
    </div>
  )
}
