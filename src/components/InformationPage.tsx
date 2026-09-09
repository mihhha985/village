import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { OrderModal } from "@/src/components/OrderModal";

type InformationPageProps = {
  title: string;
  introduction: string;
  children: ReactNode;
};

export function InformationPage({ title, introduction, children }: InformationPageProps) {
  return (
    <>
      <Navbar />
      <main className="location-page">
        <div className="container pb-12 lg:pb-16">
          <Link href="/" className="location-back flex items-center gap-2 mb-8">
            <ArrowLeft size={16} aria-hidden="true" /> На главную
          </Link>
          <h1 className="location-heading mb-6">{title}</h1>
          <p className="location-lead max-w-3xl">{introduction}</p>
        </div>
        {children}
      </main>
      <Footer />
      <OrderModal />
    </>
  );
}
