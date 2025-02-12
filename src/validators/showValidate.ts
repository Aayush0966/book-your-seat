import { z } from "zod";

const jsonSchema = z.union([z.array(z.string()), z.record(z.unknown()), z.string()]);

export const statusEnum = z.enum(["ACTIVE", "COMPLETED", "UPCOMING"]);

export const pricingSchema = z.object({
    platinum: z.number().positive("Platinum price must be positive"),
    gold: z.number().positive("Gold price must be positive"),
    silver: z.number().positive("Silver price must be positive"),
});

export const priceSchema = z.object({
    screenId: z.number().positive("Screen ID must be positive"),
    type: z.string().min(1, "Type is required"),
    prices: pricingSchema,
});

export const showtimeSchema = z.object({
    screenId: z.number().positive("Screen ID must be positive"),
    showTime: z.number().positive("Showtime must be a valid timestamp"),
});

export const movieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    genres: jsonSchema,
    duration: z.number().positive("Duration must be a positive number"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    director: z.string().min(1, "Director name is required"),
    posterUrl: z.string().url("Invalid poster URL"),
    releaseDate: z.number().positive("Release date must be a valid timestamp"),
    language: z.string().min(1, "Language is required"),
    ageRating: z.string().min(1, "Age rating is required"),
    casts: jsonSchema,
});

export const movieDetailsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    genres: z.array(z.string()).min(1, "At least one genre is required"),
    releaseDate: z.number().positive("Release date must be a valid timestamp"),
    backdropUrl: z.string().url("Invalid backdrop URL"),
    language: z.string().min(1, "Language is required"),
    duration: z.number().positive("Duration must be positive"),
    ageRating: z.string().min(1, "Age rating is required"),
    posterUrl: z.string().url("Invalid poster URL"),
    showStartDate: z.number().positive("Show start date must be valid"),
    showEndDate: z.number().positive("Show end date must be valid"),
    showtimes: z.array(showtimeSchema).min(1, "At least one showtime is required"),
    pricing: z.array(priceSchema).min(1, "At least one price category is required"),
    cast: z.array(z.string()).min(1, "At least one cast member is required"),
    director: z.string().min(1, "Director is required"),
    status: statusEnum,
});
