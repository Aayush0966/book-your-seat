import BookingWrapper from "@/components/Show/BookingWrapper"
import { fetchShowsByMovieId } from "@/services/showServices";
import NoMovieFound from "@/components/NoMovieFound";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ movieId: string }> }): Promise<Metadata> {
  const movieId = (await params).movieId;
  const movie = await fetchShowsByMovieId(Number(movieId));
  
  if (!movie) {
    return {
      title: "Movie Not Found - Book Your Seat",
      description: "The movie you're looking for is not available.",
    };
  }
  
  return {
    title: `Book ${movie.title} - Movie Tickets | Book Your Seat`,
    description: `Book tickets for ${movie.title}. Choose your preferred showtime, select seats, and enjoy the movie. ${movie.description}`,
    keywords: ["movie booking", movie.title, "cinema tickets", "seat selection", "movie showtimes"],
    authors: [{ name: "Book Your Seat" }],
    openGraph: {
      title: `Book ${movie.title} - Book Your Seat`,
      description: `Book tickets for ${movie.title}. Choose your preferred showtime and select your seats.`,
      url: `/show/${movieId}`,
      siteName: "Book Your Seat",
      images: [
        {
          url: movie.posterUrl,
          width: 500,
          height: 750,
          alt: `${movie.title} Movie Poster`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Book ${movie.title} - Book Your Seat`,
      description: `Book tickets for ${movie.title}. Choose your preferred showtime and select your seats.`,
      images: [movie.posterUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const page = async ({params}: {params: Promise<{movieId: number}>}) => {
    const movieId = (await params).movieId;
    const movie = await fetchShowsByMovieId(Number(movieId));
    if (!movie) return <NoMovieFound />
    return (
        <BookingWrapper movie={movie} />
    )
}

export default page