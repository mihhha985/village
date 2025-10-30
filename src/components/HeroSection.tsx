"use client";
import Image from "next/image";
import { SearchBar } from "./SearchBar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black py-16 z-0">    
      <div className="absolute top-0 left-0 w-full h-[227px] bg-linear-to-b from-[rgb(17,17,17)] to-[rgba(17,17,17,.1)]"></div>
      <div className="container relative">
        <div className="space-y-6 max-w-2xl my-10 lg:my-45 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            Проведите свободное время с близкими на природе
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mt-5">
            Отдых в DeРевне: уютные технологичные дома
            и завораживающая красота пейзажей 
            вдали от суеты города
          </p>
        </div>

          {/* Right Content - Hero Image */}
        <div className="static lg:absolute right-0 -top-40 mb-20 lg:mb-0">
          <Image src="/bg-hero.png" alt="fon" width={800} height={600}/> 
        </div>
        <SearchBar />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[227px] bg-linear-to-t from-[rgb(17,17,17)] to-[rgba(17,17,17,.1)]"></div>
    </section>
  );
}
