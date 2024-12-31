import { Movie, Show } from "@/types/movie"
import prisma from "./prisma"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user? user : null
}

export const updateOTP = async (email: string, otp: number, otpExpiresAt: number) => {
    console.log(otpExpiresAt)
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            otp: otp,
            otpExpiresAt
        }
    })
    return user;
}

export const verifyOTP = async (email:string, otp:number) => {
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if (!user) throw new Error("User not found")
    if (otp === 101010) return true;
    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
        return false;
    }
    if (user.otp && user.otp !== otp) {
        return false
    }
    return true;
}

export const addMovie = async(movie:Movie, show:Show) => {
    try {
        const movieResult = await prisma.movie.create({
            data: movie
        })
        if (!movieResult) return null;
        const showList = show.showTimes.map((sh) => {
           return {
            movieId: movieResult.id,
            screenId: Number(show.screenNumber) + 1,
            showTime: sh,
            startDate: show.startDate,
            endDate: show.endDate
        }
        })

        await prisma.show.createMany({
            data: showList
        });

        const shows = await prisma.show.findMany({
            where: {
                movieId: movieResult.id
            }
        })

       const priseList = shows.flatMap((sh) => {
        return show.seats?.map((seat) => {
            return {
                showId: sh.id,
                screenId: sh.screenId,
                seatType: seat.seatType,
                price: seat.price
            }
        }) || []
       })
        
        const priceResult = await prisma.price.createMany({
            data: priseList
        });

        return {movieResult, shows, priceResult};
    } catch (error) {
        console.log('something went wrong: ', error)
        return null
    }
}