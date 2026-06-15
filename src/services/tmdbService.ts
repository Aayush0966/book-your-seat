import { MovieDetails, Price, Showtime, Status } from "@/types/movie";
import * as showQueries from "@/database/shows/queries";
import { addMovieAndShow } from "@/services/showServices";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

const getApiKey = () =>
    process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

// How long (in days) a movie's shows stay available once created.
const SHOW_WINDOW_DAYS = 21;

// How many movies to keep per status for the evergreen catalog. Defaults to 4
// ACTIVE + 4 UPCOMING (8 total). Override with MOVIES_PER_STATUS if needed.
const MOVIES_PER_STATUS = Math.max(1, Number(process.env.MOVIES_PER_STATUS) || 4);

// Screen ids are seeded as 1=STANDARD, 2=THREED, 3=IMAX (see ensureDefaultScreens).
const SCREENS = [
    { screenId: 1, type: "STANDARD" },
    { screenId: 2, type: "THREED" },
    { screenId: 3, type: "IMAX" },
] as const;

// Daily showtimes (24h) applied on the start date of each show window.
const DAILY_SHOW_HOURS: Array<[number, number]> = [
    [14, 30],
    [18, 0],
    [21, 30],
];

const LANGUAGE_MAP: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    ne: "Nepali",
    ja: "Japanese",
    ko: "Korean",
    fr: "French",
    es: "Spanish",
    de: "German",
    zh: "Chinese",
    ta: "Tamil",
    te: "Telugu",
};

interface TmdbListItem {
    id: number;
    title: string;
}

interface TmdbGenre {
    id: number;
    name: string;
}

interface TmdbCastMember {
    name: string;
    order: number;
}

interface TmdbCrewMember {
    name: string;
    job: string;
}

interface TmdbMovieDetails {
    id: number;
    title: string;
    overview: string;
    genres: TmdbGenre[];
    runtime: number | null;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    original_language: string;
    credits?: {
        cast?: TmdbCastMember[];
        crew?: TmdbCrewMember[];
    };
    release_dates?: {
        results?: Array<{
            iso_3166_1: string;
            release_dates: Array<{ certification: string }>;
        }>;
    };
}

const tmdbFetch = async <T>(path: string, params: Record<string, string> = {}): Promise<T> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("TMDB API key is not configured (set TMDB_API_KEY or NEXT_PUBLIC_TMDB_API_KEY)");
    }

    const search = new URLSearchParams({ api_key: apiKey, ...params });
    const url = `${TMDB_BASE}${path}?${search.toString()}`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
        throw new Error(`TMDB request failed (${res.status}) for ${path}`);
    }
    return (await res.json()) as T;
};

const fetchMovieList = async (
    type: "now_playing" | "upcoming",
    page = 1
): Promise<TmdbListItem[]> => {
    const data = await tmdbFetch<{ results: TmdbListItem[] }>(`/movie/${type}`, {
        page: page.toString(),
    });
    return data.results ?? [];
};

const fetchMovieDetails = async (id: number): Promise<TmdbMovieDetails> => {
    return await tmdbFetch<TmdbMovieDetails>(`/movie/${id}`, {
        append_to_response: "credits,release_dates",
    });
};

const buildPricing = (): Price[] =>
    SCREENS.map((screen) => {
        const isImax = screen.type === "IMAX";
        const isThreeD = screen.type === "THREED";
        return {
            screenId: screen.screenId,
            type: screen.type,
            prices: {
                platinum: isImax ? 600 : isThreeD ? 400 : 300,
                gold: isImax ? 400 : isThreeD ? 300 : 200,
                silver: isImax ? 300 : isThreeD ? 250 : 150,
            },
        };
    });

const buildShowtimes = (startDateMs: number): Showtime[] => {
    const showtimes: Showtime[] = [];
    for (const screen of SCREENS) {
        for (const [hour, minute] of DAILY_SHOW_HOURS) {
            const showDate = new Date(startDateMs);
            showDate.setHours(hour, minute, 0, 0);
            showtimes.push({
                screenId: screen.screenId,
                showTime: Math.floor(showDate.getTime() / 1000),
            });
        }
    }
    return showtimes;
};

const getCertification = (details: TmdbMovieDetails): string => {
    const usEntry = details.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
    const cert = usEntry?.release_dates?.find((d) => d.certification)?.certification;
    return cert && cert.trim() !== "" ? cert : "PG-13";
};

const mapToMovieDetails = (
    details: TmdbMovieDetails,
    status: Status
): MovieDetails | null => {
    // Skip entries without the assets we need for a usable card.
    if (!details.poster_path || !details.backdrop_path || !details.release_date) {
        return null;
    }

    const releaseDateMs = new Date(details.release_date).getTime();
    if (Number.isNaN(releaseDateMs)) {
        return null;
    }

    const now = Date.now();
    // ACTIVE movies start showing now; UPCOMING start at their release date.
    const startDateMs = status === "UPCOMING" ? Math.max(releaseDateMs, now) : now;
    const endDateMs = startDateMs + SHOW_WINDOW_DAYS * 24 * 60 * 60 * 1000;

    const director =
        details.credits?.crew?.find((member) => member.job === "Director")?.name ||
        "Unknown";

    const cast =
        details.credits?.cast
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .slice(0, 8)
            .map((member) => member.name) ?? [];

    return {
        title: details.title,
        description: details.overview || "No description available.",
        genres: details.genres?.map((g) => g.name) ?? [],
        releaseDate: Math.floor(releaseDateMs / 1000),
        backdropUrl: `${IMG_BASE}/original${details.backdrop_path}`,
        language: LANGUAGE_MAP[details.original_language] || details.original_language.toUpperCase(),
        duration: details.runtime && details.runtime > 0 ? details.runtime : 120,
        ageRating: getCertification(details),
        posterUrl: `${IMG_BASE}/w500${details.poster_path}`,
        showStartDate: Math.floor(startDateMs / 1000),
        showEndDate: Math.floor(endDateMs / 1000),
        showtimes: buildShowtimes(startDateMs),
        pricing: buildPricing(),
        cast: cast.length > 0 ? cast : ["Unknown"],
        director,
        status,
    };
};

export interface SyncResult {
    added: number;
    skipped: number;
    failed: number;
    addedTitles: string[];
}

/**
 * Pulls "now playing" (ACTIVE) and "upcoming" (UPCOMING) movies from TMDB and
 * persists any that don't already exist. Deduped by title so it is safe to run
 * repeatedly (e.g. on a cron). Keeps the catalog evergreen as TMDB changes.
 */
export const syncMoviesFromTmdb = async (pagesPerList = 1): Promise<SyncResult> => {
    // Shows reference screens, so make sure the default screens exist first.
    await showQueries.ensureDefaultScreens();

    const result: SyncResult = { added: 0, skipped: 0, failed: 0, addedTitles: [] };

    const lists: Array<{ type: "now_playing" | "upcoming"; status: Status }> = [
        { type: "now_playing", status: "ACTIVE" },
        { type: "upcoming", status: "UPCOMING" },
    ];

    // Collect unique movie ids across the requested pages.
    const seen = new Map<number, Status>();
    for (const { type, status } of lists) {
        for (let page = 1; page <= pagesPerList; page++) {
            try {
                const items = await fetchMovieList(type, page);
                for (const item of items) {
                    // Prefer ACTIVE if a movie appears in both lists.
                    if (!seen.has(item.id) || status === "ACTIVE") {
                        seen.set(item.id, status);
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch TMDB list ${type} page ${page}:`, error);
            }
        }
    }

    // Only top up to the per-status cap, counting movies that are still
    // displayable (have a non-expired show). This way expired movies don't
    // block new ones, keeping the catalog evergreen as windows lapse.
    const nowTs = Math.floor(Date.now() / 1000);
    const existingActive = await showQueries.countDisplayableMoviesByStatus("ACTIVE", nowTs);
    const existingUpcoming = await showQueries.countDisplayableMoviesByStatus("UPCOMING", nowTs);
    const remaining: Record<Status, number> = {
        ACTIVE: Math.max(0, MOVIES_PER_STATUS - existingActive),
        UPCOMING: Math.max(0, MOVIES_PER_STATUS - existingUpcoming),
        COMPLETED: 0,
    };

    for (const [tmdbId, status] of seen) {
        // Stop touching TMDB once this status is already full.
        if (remaining[status] <= 0) {
            continue;
        }
        // Nothing left to add for any status - bail out early.
        if (remaining.ACTIVE <= 0 && remaining.UPCOMING <= 0) {
            break;
        }
        try {
            const details = await fetchMovieDetails(tmdbId);

            const existing = await showQueries.findMovieByTitle(details.title);
            if (existing) {
                result.skipped++;
                continue;
            }

            const movieDetails = mapToMovieDetails(details, status);
            if (!movieDetails) {
                result.skipped++;
                continue;
            }

            await addMovieAndShow(movieDetails);
            result.added++;
            remaining[status]--;
            result.addedTitles.push(details.title);
        } catch (error) {
            console.error(`Failed to sync TMDB movie ${tmdbId}:`, error);
            result.failed++;
        }
    }

    console.log(
        `TMDB sync complete: added ${result.added}, skipped ${result.skipped}, failed ${result.failed}`
    );
    return result;
};

// ---- Lazy, on-demand catalog refresh (replaces the paid Vercel cron) ----

// At most one freshness check / sync per window, per server instance.
const SYNC_THROTTLE_MS = Math.max(
    60_000,
    Number(process.env.SYNC_THROTTLE_MS) || 1000 * 60 * 60 // default: 1 hour
);

let lastSyncAt = 0;
let inFlightSync: Promise<unknown> | null = null;

/**
 * Cheap guard meant to run on movie requests. If the displayable catalog has
 * dropped below the per-status target (and we're outside the throttle window),
 * it tops up from TMDB. Concurrent callers are deduped via an in-flight promise
 * and a server-local timestamp, so this stays inexpensive on hot paths.
 *
 * The triggering request waits for the sync so results are immediately fresh;
 * once filled, subsequent requests skip out fast until the next window.
 */
export const ensureCatalogFresh = async (): Promise<void> => {
    // A sync is already running - don't pile on, let the caller proceed.
    if (inFlightSync) return;

    const now = Date.now();
    if (now - lastSyncAt < SYNC_THROTTLE_MS) return;

    const nowTs = Math.floor(now / 1000);
    let needsSync = false;
    try {
        const [activeCount, upcomingCount] = await Promise.all([
            showQueries.countDisplayableMoviesByStatus("ACTIVE", nowTs),
            showQueries.countDisplayableMoviesByStatus("UPCOMING", nowTs),
        ]);
        needsSync =
            activeCount < MOVIES_PER_STATUS || upcomingCount < MOVIES_PER_STATUS;
    } catch (error) {
        console.error("[catalog] Freshness check failed:", error);
        return;
    }

    // Mark checked regardless, so a healthy catalog isn't re-counted every hit.
    lastSyncAt = now;
    if (!needsSync) return;

    console.log("[catalog] Catalog below target - syncing from TMDB...");
    inFlightSync = syncMoviesFromTmdb(1)
        .catch((error) => console.error("[catalog] On-demand sync failed:", error))
        .finally(() => {
            inFlightSync = null;
        });
    await inFlightSync;
};
