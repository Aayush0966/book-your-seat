import Hero from "@/components/Hero";
import Movies from "@/components/Movies";
import { ShowProvider } from "@/context/showContext";
import { fetchMovies } from "@/services/showServices";
import FeaturedSpotlight from "@/components/FeaturedSpotlight";
import Testimonials from "@/components/Testimonials";
import { Star } from "lucide-react";

export default async function Home() {
  const activeShows = await fetchMovies('ACTIVE') || [];
  const upcomingShows = await fetchMovies('UPCOMING') || [];
  const featuredShow = activeShows.length > 0 ? activeShows[0] : null;

  return (
    <ShowProvider>
      <div className="min-h-screen bg-black bg-gradient-to-br from-[#1a0505] via-[#2b0808] to-[#1a0505] text-white">
        {/* Hero Section with Parallax Effect */}
        <div className="relative">
          <div className="hidden md:block overflow-hidden">
            <Hero />
          </div>
        </div>

        {/* Featured Spotlight with enhanced visual appeal */}
        {featuredShow && (
          <section className="py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8b0000]/10 rounded-full blur-3xl"></div>
            
            {/* Section title with icon */}
            <div className="container mx-auto mb-10 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-[#ff0000] w-6 h-6" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#ff0000]">Featured Spotlight</h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-[#8b0000]">
                Don't Miss This Performance
              </h3>
            </div>
            <FeaturedSpotlight show={featuredShow} />
          </section>
        )}

        {/* Main Shows Section with a fresh layout */}
        <section className="py-16 relative">
          {/* Subtle radial background element */}
          <div className="absolute inset-0 bg-radial-gradient from-[#2b0808]/50 to-transparent"></div>
          <Movies activeShows={activeShows} upcomingShows={upcomingShows} />
        </section>

        {/* Testimonials with enhanced visual appeal */}
        <section className="py-20 px-4 md:px-8 relative overflow-hidden">
          {/* Updated background elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b0000]/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2b0808]/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <Star className="text-[#ff0000] w-6 h-6" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#ff0000]">Audience Reviews</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-[#8b0000]">
              What Our Customers Say
            </h3>
            <Testimonials />
          </div>
        </section>
      </div>
    </ShowProvider>
  );
}