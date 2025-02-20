import BookingWrapper from "@/components/Show/BookingWrapper"
import { fetchShowsByMovieId } from "@/services/showServices";
import NoMovieFound from "@/components/NoMovieFound";

const page = async ({params}: {params: Promise<{movieId: number}>}) => {
    const movieId = (await params).movieId;
    const movie = await fetchShowsByMovieId(Number(movieId));
    if (!movie) return <NoMovieFound />
    return (
        <BookingWrapper movie={movie} />
    )
}

export default page