import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { ExperiencesSection } from "@/src/components/ExperiencesSection";
import { LocationsSection } from "@/src/components/LocationsSection";
import { PlansSection } from "@/src/components/PlansSection";
import { HowToBookSection } from "@/src/components/HowToBookSection";
import { ContactSection } from "@/src/components/ContactSection";
import { Footer } from "@/src/components/Footer";
import { OrderModal } from "@/src/components/OrderModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Experiences Section */}
      <ExperiencesSection/>

      {/* Locations Section */}
      <LocationsSection />

      {/* Plans Section */}
      <PlansSection />

      {/* How to Book Section */}
      <HowToBookSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

			{/* OrderModal */}
			<OrderModal />
    </main>
  );
}
