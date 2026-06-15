// Next.js runs this once when the server starts (Node.js runtime only).
// We use it to bootstrap the app on first run: create screens, an admin user,
// and seed the movie catalog from TMDB if the database is empty.
export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { bootstrap } = await import("@/lib/bootstrap");
        await bootstrap();
    }
}
