import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import OTPSection from "@/components/OTPSection";
import ActiveOnMarket from "@/components/ActiveOnMarket";
import Footer from "@/components/Footer";
import { LayoutProvider } from "@/components/LayoutProvider";

export default function HomePage() {
  return (
    <LayoutProvider>
      <Navbar />
      {/* Spacer that matches navbar height on desktop only — prevents content hiding under the fixed bar */}
      <div className="hidden md:block" style={{ height: "var(--navbar-h)" }} aria-hidden="true" />
      {/* flex-col so HomeHero's flex-1 can fill the remaining viewport height */}
      <main className="flex flex-col">
        <HomeHero />
        <OTPSection />
        <ActiveOnMarket />
      </main>
      <Footer />
    </LayoutProvider>
  );
}
