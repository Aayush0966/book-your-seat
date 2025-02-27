import Hero from "@/components/Hero";
import Movies from "@/components/Movies";
import { ShowProvider } from "@/context/showContext";
import { fetchMovies } from "@/services/showServices";

export default async function Home() {
  const activeShows = await fetchMovies('ACTIVE') || [];
  const upcomingShows = await fetchMovies('UPCOMING') || [];

  return (
    <ShowProvider>
      <div className="min-h-screen bg-background">
        <div className="hidden md:block">
          <Hero />
        </div>
        <Movies activeShows={activeShows} upcomingShows={upcomingShows} />
      </div>
    </ShowProvider>
  )
}