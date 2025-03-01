export const nowPlayingApiUrl = '/api/shows'
export const upcomingMoviesApiUrl = 'https://api.themoviedb.org/3/movie/upcoming'
export const searchMovieByTitleApiUrl = ' https://api.themoviedb.org/3/search/movie'
export const imageUrl = 'https://image.tmdb.org/t/p/original'


//payments
export const esewaMethod = {
    merchantId: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_ID,
    secretKey: process.env.ESEWA_SECRET_KEY,
    paymentUrl: process.env.NEXT_PUBLIC_ESEWA_PAYMENT_URL,
    successUrl: `${process.env.NEXTAUTH_URL}/api/payment?p=success`,
    failureUrl: `${process.env.NEXTAUTH_URL}/api/payment?p=failure`,
    verifyUrl: process.env.ESEWA_VERIFY_URL
}