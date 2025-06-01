# API Documentation

This document provides comprehensive documentation for the Book Your Seat API endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production: https://bookyourseat.com/api
```

## Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null
}
```

Error responses:

```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

## Authentication Endpoints

### POST /api/auth/signup

Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "contactNumber": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    },
    "token": "jwt-token-here"
  },
  "message": "User registered successfully"
}
```

### POST /api/auth/signin

Sign in to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    },
    "token": "jwt-token-here"
  },
  "message": "Sign in successful"
}
```

### POST /api/auth/verify-otp

Verify OTP for sensitive operations.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true
  },
  "message": "OTP verified successfully"
}
```

## Movie Endpoints

### GET /api/movies

Get all movies with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by movie status (UPCOMING, ACTIVE, COMPLETED)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search movies by title

**Example Request:**
```
GET /api/movies?status=ACTIVE&page=1&limit=10&search=avengers
```

**Response:**
```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "id": 1,
        "title": "Avengers: Endgame",
        "description": "The epic conclusion to the Infinity Saga",
        "director": "Anthony Russo, Joe Russo",
        "posterUrl": "https://example.com/poster.jpg",
        "backdropUrl": "https://example.com/backdrop.jpg",
        "ageRating": "PG-13",
        "genres": ["Action", "Adventure", "Drama"],
        "status": "ACTIVE",
        "casts": ["Robert Downey Jr.", "Chris Evans"],
        "language": "English",
        "duration": 181,
        "releaseDate": 1556150400,
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  },
  "message": "Movies retrieved successfully"
}
```

### GET /api/movies/[id]

Get a specific movie by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "movie": {
      "id": 1,
      "title": "Avengers: Endgame",
      "description": "The epic conclusion to the Infinity Saga",
      "director": "Anthony Russo, Joe Russo",
      "posterUrl": "https://example.com/poster.jpg",
      "backdropUrl": "https://example.com/backdrop.jpg",
      "ageRating": "PG-13",
      "genres": ["Action", "Adventure", "Drama"],
      "status": "ACTIVE",
      "casts": ["Robert Downey Jr.", "Chris Evans"],
      "language": "English",
      "duration": 181,
      "releaseDate": 1556150400,
      "shows": [
        {
          "id": 1,
          "showTime": 1640995200,
          "startDate": 1640995200,
          "endDate": 1641081600,
          "pricing": {
            "regular": 250,
            "premium": 350
          },
          "screen": {
            "id": 1,
            "type": "IMAX",
            "screenNumber": 1,
            "totalSeats": 100
          }
        }
      ]
    }
  },
  "message": "Movie retrieved successfully"
}
```

### POST /api/movies (Admin Only)

Create a new movie.

**Request Body:**
```json
{
  "title": "New Movie",
  "description": "Movie description",
  "director": "Director Name",
  "posterUrl": "https://example.com/poster.jpg",
  "backdropUrl": "https://example.com/backdrop.jpg",
  "ageRating": "PG-13",
  "genres": ["Action", "Adventure"],
  "casts": ["Actor 1", "Actor 2"],
  "language": "English",
  "duration": 120,
  "releaseDate": 1640995200,
  "status": "UPCOMING"
}
```

### PUT /api/movies/[id] (Admin Only)

Update an existing movie.

**Request Body:** Same as POST /api/movies

## Show Endpoints

### GET /api/shows

Get shows with optional filtering.

**Query Parameters:**
- `movieId` (optional): Filter by movie ID
- `screenId` (optional): Filter by screen ID
- `date` (optional): Filter by show date (timestamp)

**Response:**
```json
{
  "success": true,
  "data": {
    "shows": [
      {
        "id": 1,
        "movieId": 1,
        "screenId": 1,
        "showTime": 1640995200,
        "startDate": 1640995200,
        "endDate": 1641081600,
        "pricing": {
          "regular": 250,
          "premium": 350
        },
        "movie": {
          "id": 1,
          "title": "Avengers: Endgame",
          "posterUrl": "https://example.com/poster.jpg"
        },
        "screen": {
          "id": 1,
          "type": "IMAX",
          "screenNumber": 1,
          "totalSeats": 100
        }
      }
    ]
  },
  "message": "Shows retrieved successfully"
}
```

### GET /api/shows/[id]/seats

Get seat availability for a specific show.

**Response:**
```json
{
  "success": true,
  "data": {
    "seats": {
      "regular": {
        "available": ["A1", "A2", "A3"],
        "booked": ["A4", "A5"],
        "price": 250
      },
      "premium": {
        "available": ["P1", "P2"],
        "booked": ["P3"],
        "price": 350
      }
    },
    "totalSeats": 100,
    "availableSeats": 95,
    "bookedSeats": 5
  },
  "message": "Seat information retrieved successfully"
}
```

## Booking Endpoints

### POST /api/bookings

Create a new booking.

**Request Body:**
```json
{
  "showId": 1,
  "showDate": 1640995200,
  "seatsBooked": ["A1", "A2"],
  "seatsCount": 2,
  "totalPrice": 500,
  "paymentMethod": "ESEWA",
  "couponId": "DISCOUNT10"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking-id-123",
      "orderId": "order-123",
      "userId": 1,
      "showId": 1,
      "showDate": 1640995200,
      "seatsBooked": ["A1", "A2"],
      "seatsCount": 2,
      "totalPrice": 500,
      "paymentMethod": "ESEWA",
      "bookingStatus": "PENDING",
      "bookingDate": 1640995200
    }
  },
  "message": "Booking created successfully"
}
```

### GET /api/bookings/user/[userId]

Get all bookings for a specific user.

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking-id-123",
        "orderId": "order-123",
        "showDate": 1640995200,
        "seatsBooked": ["A1", "A2"],
        "seatsCount": 2,
        "totalPrice": 500,
        "bookingStatus": "CONFIRMED",
        "show": {
          "id": 1,
          "showTime": 1640995200,
          "movie": {
            "title": "Avengers: Endgame",
            "posterUrl": "https://example.com/poster.jpg"
          },
          "screen": {
            "screenNumber": 1,
            "type": "IMAX"
          }
        },
        "tickets": [
          {
            "ticketId": "ticket-1",
            "seatNumber": "A1",
            "seatCategory": "regular",
            "price": 250,
            "status": "VALID"
          }
        ]
      }
    ]
  },
  "message": "User bookings retrieved successfully"
}
```

### PUT /api/bookings/[id]

Update booking status.

**Request Body:**
```json
{
  "bookingStatus": "CONFIRMED",
  "paymentRef": "payment-reference-123"
}
```

## Payment Endpoints

### POST /api/payment/esewa

Process eSewa payment.

**Request Body:**
```json
{
  "bookingId": "booking-id-123",
  "amount": 500,
  "productId": "movie-ticket",
  "successUrl": "https://example.com/success",
  "failureUrl": "https://example.com/failure"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentUrl": "https://esewa.com.np/payment/...",
    "paymentId": "payment-123"
  },
  "message": "Payment initiated successfully"
}
```

### POST /api/payment/khalti

Process Khalti payment.

**Request Body:**
```json
{
  "bookingId": "booking-id-123",
  "amount": 50000,
  "productIdentity": "movie-ticket",
  "productName": "Movie Ticket",
  "returnUrl": "https://example.com/return"
}
```

### GET /api/payment/verify

Verify payment status.

**Query Parameters:**
- `paymentId`: Payment ID to verify
- `gateway`: Payment gateway (esewa/khalti)

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "paymentStatus": "COMPLETED",
    "transactionId": "txn-123"
  },
  "message": "Payment verified successfully"
}
```

## User Endpoints

### GET /api/users/profile

Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "contactNumber": "9876543210",
      "role": "USER",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Profile retrieved successfully"
}
```

### PUT /api/users/profile

Update user profile.

**Request Body:**
```json
{
  "fullName": "John Smith",
  "contactNumber": "9876543211"
}
```

## Review Endpoints

### POST /api/reviews

Create a movie review.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent movie!"
}
```

### GET /api/reviews

Get reviews with pagination.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

## Admin Endpoints

### GET /api/admin/dashboard

Get admin dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalBookings": 1250,
      "totalRevenue": 312500,
      "totalUsers": 850,
      "totalMovies": 25
    },
    "recentBookings": [],
    "popularMovies": []
  },
  "message": "Dashboard data retrieved successfully"
}
```

### GET /api/admin/users

Get all users (Admin only).

### GET /api/admin/bookings

Get all bookings (Admin only).

## Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Invalid or missing authentication token |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Requested resource not found |
| `VALIDATION_ERROR` | Request validation failed |
| `PAYMENT_FAILED` | Payment processing failed |
| `SEAT_UNAVAILABLE` | Selected seats are no longer available |
| `BOOKING_EXPIRED` | Booking session has expired |
| `INVALID_OTP` | OTP verification failed |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Booking endpoints**: 10 requests per minute
- **General endpoints**: 100 requests per minute

## Webhooks

### Payment Webhooks

Payment gateways will send webhook notifications to:

```
POST /api/webhooks/payment/esewa
POST /api/webhooks/payment/khalti
```

**Webhook Payload:**
```json
{
  "event": "payment.completed",
  "data": {
    "paymentId": "payment-123",
    "bookingId": "booking-id-123",
    "amount": 500,
    "status": "COMPLETED",
    "transactionId": "txn-123"
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @bookyourseat/api-client
```

```javascript
import { BookYourSeatAPI } from '@bookyourseat/api-client';

const api = new BookYourSeatAPI({
  baseURL: 'https://bookyourseat.com/api',
  apiKey: 'your-api-key'
});

// Get movies
const movies = await api.movies.getAll();

// Create booking
const booking = await api.bookings.create({
  showId: 1,
  seats: ['A1', 'A2']
});
```

## Testing

Use the following test credentials for development:

**Test User:**
- Email: `test@bookyourseat.com`
- Password: `testpassword123`

**Test Admin:**
- Email: `admin@bookyourseat.com`
- Password: `adminpassword123`

**Test Payment:**
- eSewa: Use test merchant ID
- Khalti: Use test secret key

## Support

For API support and questions:

- **Email**: aayushx699@gmail.com