export const nowPlayingApiUrl = '/api/shows'
export const upcomingMoviesApiUrl = 'https://api.themoviedb.org/3/movie/upcoming'
export const searchMovieByTitleApiUrl = ' https://api.themoviedb.org/3/search/movie'
export const imageUrl = 'https://image.tmdb.org/t/p/original'



//payments
export const esewaMethod = {
    merchantId: process.env.ESEWA_MERCHANT_ID,
    secretKey: process.env.ESEWA_SECRET_KEY,
    paymentUrl: `${process.env.ESEWA_TEST_URL}/main/v2/form`,
    successUrl: `${process.env.NEXTAUTH_URL}/paymentSuccess/ESEWA`,
    failureUrl: `${process.env.NEXTAUTH_URL}/payment`,
    verifyUrl: `${process.env.ESEWA_TEST_URL}/transaction/status`
}

export const khaltiMethod = {
    successUrl: `${process.env.NEXTAUTH_URL}/paymentSuccess/KHALTI`,
    failureUrl: `${process.env.NEXTAUTH_URL}/payment`,
    paymentUrl: `${process.env.KHALTI_TEST_URL}/epayment/initiate/`,
    verifyUrl: `${process.env.KHALTI_TEST_URL}/epayment/lookup/`
}