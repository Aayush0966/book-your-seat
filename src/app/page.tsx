import Hero from "@/components/Hero";
import NowShowingSection from "@/components/NowShowingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Hero />
      </div>
      <NowShowingSection />
    </div>
  )
}
