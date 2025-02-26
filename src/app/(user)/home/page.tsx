import Hero from "@/components/Hero";
import NowShowingSection from "@/components/NowShowingSection";
import UpcomingSection from "@/components/UpcomingSection";
import { ShowProvider } from "@/context/showContext";

export default function Home() {
  return (
    <ShowProvider>
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Hero />
      </div>
      <NowShowingSection />
      <UpcomingSection />
    </div>
    </ShowProvider>
  )
}