"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/src/lib/ui/button"

interface SlideData {
  id: number
  title: string
  image: string
  buttonText: string
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Романтический уикенд для двоих",
    image: "/romantic-couple-by-lake-nature.jpg",
    buttonText: "Найти подходящие варианты",
  },
  {
    id: 2,
    title: "Отдохнуть всей семьей",
    image: "/family-in-forest-winter.jpg",
    buttonText: "Найти подходящие варианты",
  },
  {
    id: 3,
    title: "Приехать большой компанией",
    image: "/sunset-pool-vacation-resort.jpg",
    buttonText: "Найти подходящие варианты",
  },
  {
    id: 4,
    title: "Уединенный отдых",
    image: "/peaceful-mountain-retreat.png",
    buttonText: "Найти подходящие варианты",
  },
]

export function PlansSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getVisibleSlides = () => {
    if (typeof window === "undefined") return 3
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [visibleSlides, setVisibleSlides] = useState(3)

  const getMaxIndex = () => {
    return Math.max(0, slides.length - visibleSlides)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    const maxIndex = getMaxIndex()
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  useEffect(() => {
    const handleResize = () => {
      const newVisibleSlides = getVisibleSlides()
      setVisibleSlides(newVisibleSlides)

      const newMaxIndex = Math.max(0, slides.length - newVisibleSlides)
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setTranslateX(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50

    if (translateX > threshold) {
      goToPrevious()
    } else if (translateX < -threshold) {
      goToNext()
    }

    setTranslateX(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  return (
    <section className="selection">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between mb-8 gap-y-4">
          <h2 className="text-4xl xl:text-5xl w-full lg:w-[40%] leading-tight">
            Какие у вас планы?
          </h2>
					<p className="self-end w-full lg:w-1/3">Выберите сценарий своего отдыха и начните поиск среди подходящих вариантов размещения!</p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Cards */}
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-4 md:gap-6 select-none"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${translateX}px))`,
                transition: isDragging ? "none" : "transform 0.5s ease-out",
              }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <div className="relative group rounded-2xl overflow-hidden h-[500px] md:h-[550px]">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-6 text-balance">{slide.title}</h3>

                      <button className="flex items-center gap-2 text-white text-sm md:text-base group/btn transition-all hover:gap-3">
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="h-1 bg-card rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${((currentIndex + visibleSlides) / slides.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="rounded-full w-10 h-10 border-foreground bg-transparent text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex >= getMaxIndex()}
              className="rounded-full w-10 h-10 border-foreground bg-transparent text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
