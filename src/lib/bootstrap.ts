import * as userQueries from "@/database/user/queries";
import * as showQueries from "@/database/shows/queries";
import { saltAndHashPassword } from "@/lib/password";

let hasRun = false;

/**
 * Ensures an ADMIN account exists, using MY_EMAIL from the environment.
 * The password is taken from ADMIN_PASSWORD (falls back to a default that
 * should be changed). Idempotent: does nothing if the admin already exists.
 */
const ensureAdminUser = async () => {
    const email = process.env.MY_EMAIL;
    if (!email) {
        console.warn("[bootstrap] MY_EMAIL not set - skipping admin creation");
        return;
    }

    const existing = await userQueries.getUserByEmail(email);
    if (existing) {
        return;
    }

    const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
    const hashed = await saltAndHashPassword(password);
    const fullName = process.env.ADMIN_NAME || "Administrator";

    const admin = await userQueries.createAdminUser(email, fullName, hashed);
    if (admin) {
        console.log(`[bootstrap] Created admin user: ${email}`);
        if (!process.env.ADMIN_PASSWORD) {
            console.warn(
                "[bootstrap] ADMIN_PASSWORD not set - admin created with default password 'ChangeMe123!'. Change it after first login."
            );
        }
    }
};

/**
 * Seeds the movie catalog from TMDB the first time the app runs against an
 * empty database. Subsequent runs (or cron syncs) keep it fresh.
 */
const ensureInitialMovies = async () => {
    try {
        const movieCount = await showQueries.countMovies();
        if (movieCount > 0) {
            return;
        }

        console.log("[bootstrap] No movies found - running initial TMDB sync...");
        // Imported lazily so a missing TMDB key doesn't break admin bootstrap.
        const { syncMoviesFromTmdb } = await import("@/services/tmdbService");
        const result = await syncMoviesFromTmdb(1);
        console.log(`[bootstrap] Initial sync added ${result.added} movies`);
    } catch (error) {
        console.error("[bootstrap] Initial movie sync failed:", error);
    }
};

/**
 * Runs once per server process. Safe to call multiple times - guarded by an
 * in-memory flag and each step is individually idempotent.
 */
export const bootstrap = async () => {
    if (hasRun) return;
    hasRun = true;

    try {
        await showQueries.ensureDefaultScreens();
        await ensureAdminUser();
        await ensureInitialMovies();
    } catch (error) {
        console.error("[bootstrap] Bootstrap failed:", error);
    }
};
