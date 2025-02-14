import ShowDetails from "@/components/Show/ShowDetails"
import { fetchShowsByMovieId } from "@/services/showServices";


const page = async ({params}: {params: Promise<{movieId: number}>}) => {
    const movieId = (await params).movieId;
    const movie = await fetchShowsByMovieId(Number(movieId));
    if (!movie) return (
        <div>
            No Movie found
        </div>
    )
    return (
        <ShowDetails movie={movie} />
    )
}

export default page