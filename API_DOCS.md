# David Jayy Beats - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "fullName": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
      "user": {
        "id": "user-123",
        "email": "user@example.com",
        "fullName": "John Doe",
        "role": "customer"
      }
    }
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:** Same as register

#### Get Current User
- **GET** `/auth/me`
- **Auth:** Required
- **Response:**
  ```json
  {
    "success": true,
    "data": { "user_object" }
  }
  ```

---

### Beats

#### List All Beats
- **GET** `/beats`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 24)
  - `sort` - newest, trending, popular, oldest
  - `genre` - filter by genre
  - `search` - search term
  - `bpmMin`, `bpmMax` - BPM range
  - `key` - musical key
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "data": [{ "beat_object" }],
      "total": 100,
      "page": 1,
      "limit": 24,
      "totalPages": 5
    }
  }
  ```

#### Get Beat Detail
- **GET** `/beats/:id`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "beat-1",
      "title": "Trap Wave",
      "bpm": 140,
      ...
    }
  }
  ```

#### Create Beat
- **POST** `/beats`
- **Auth:** Required (Admin)
- **Body:**
  ```json
  {
    "title": "New Beat",
    "description": "...",
    "bpm": 140,
    "musicalKey": "Cm",
    "genre": "Trap",
    "moodTags": ["Dark", "Energetic"],
    "instrumentTags": ["Drums", "Bass"]
  }
  ```

#### Update Beat
- **PUT** `/beats/:id`
- **Auth:** Required (Admin)
- **Body:** Same as create

#### Delete Beat
- **DELETE** `/beats/:id`
- **Auth:** Required (Admin)

---

### Licenses

#### Get Beat Licenses
- **GET** `/licenses`
- **Query:** `beatId` (required)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "lic-1",
        "licenseType": "basic_lease",
        "price": 29,
        "audioFormats": ["mp3"],
        ...
      }
    ]
  }
  ```

#### Create License
- **POST** `/licenses`
- **Auth:** Required (Admin)
- **Body:**
  ```json
  {
    "beatId": "beat-1",
    "licenseType": "basic_lease",
    "price": 29,
    "audioFormats": ["mp3"],
    "distributionLimit": 2000
  }
  ```

---

### Orders

#### Create Order
- **POST** `/orders`
- **Body:**
  ```json
  {
    "items": [
      {
        "beatId": "beat-1",
        "licenseId": "lic-1",
        "quantity": 1
      }
    ],
    "totalAmount": 29,
    "customerEmail": "user@example.com",
    "customerName": "John Doe",
    "paymentMethod": "card"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "order-123",
      "orderNumber": "ORD-1702766400000",
      "status": "completed",
      ...
    }
  }
  ```

#### Get User Orders
- **GET** `/orders`
- **Auth:** Required
- **Response:**
  ```json
  {
    "success": true,
    "data": [{ "order_objects" }]
  }
  ```

#### Get Order Detail
- **GET** `/orders/:id`
- **Auth:** Required
- **Response:**
  ```json
  {
    "success": true,
    "data": { "order_object" }
  }
  ```

---

### Downloads

#### Generate Download Link
- **POST** `/downloads`
- **Auth:** Required
- **Body:**
  ```json
  {
    "orderItemId": "order-item-1",
    "fileType": "wav"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJvcmRlcl...",
      "downloadUrl": "/api/downloads/file/eyJvcmRlcl...",
      "expiresAt": "2025-12-25T10:30:00.000Z"
    }
  }
  ```

#### Get Download History
- **GET** `/downloads`
- **Auth:** Required
- **Query:** `orderItemId` (required)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "token": "...",
        "fileType": "wav",
        "createdAt": "2025-12-23T10:30:00.000Z",
        "expiresAt": "2025-12-25T10:30:00.000Z"
      }
    ]
  }
  ```

---

### Search

#### Search
- **GET** `/search`
- **Query:**
  - `q` - search query
  - `type` - beats, tags, producers, all (default: all)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "...",
        "title": "...",
        "type": "beat"
      }
    ]
  }
  ```

---

### Reviews

#### Get Beat Reviews
- **GET** `/reviews`
- **Query:** `beatId` (required)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "reviews": [
        {
          "id": "rev-1",
          "userName": "Artist Name",
          "rating": 5,
          "comment": "Great beat!",
          "createdAt": "2025-12-20T10:30:00.000Z"
        }
      ],
      "averageRating": 4.5,
      "totalReviews": 2
    }
  }
  ```

#### Create Review
- **POST** `/reviews`
- **Auth:** Required
- **Body:**
  ```json
  {
    "beatId": "beat-1",
    "rating": 5,
    "comment": "Amazing beat!"
  }
  ```

---

### Coupons

#### Validate Coupon
- **POST** `/coupons`
- **Body:**
  ```json
  {
    "code": "SUMMER20",
    "totalAmount": 100
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "code": "SUMMER20",
      "discount": 20,
      "type": "percentage",
      "message": "Saved $20.00!"
    }
  }
  ```

#### List Coupons (Admin)
- **GET** `/coupons`
- **Auth:** Required (Admin)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "code": "SUMMER20",
        "type": "percentage",
        "value": 20,
        "isActive": true
      }
    ]
  }
  ```

---

### Recommendations

#### Get Recommendations
- **GET** `/recommendations`
- **Query:**
  - `beatId` - beat to get recommendations for
  - `type` - similar, trending, new, byProducer (default: similar)
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "beat-2",
        "title": "Similar Beat",
        "bpm": 140,
        "genre": "Trap",
        "price": 29
      }
    ]
  }
  ```

---

### Analytics (Admin)

#### Get Analytics
- **GET** `/analytics`
- **Auth:** Required (Admin)
- **Query:**
  - `timeframe` - number of days (default: 30)
  - `metric` - revenue, sales, conversion, traffic, all
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "revenue": {
        "total": 12450,
        "trend": "+12.5%",
        "chart": [...]
      },
      "sales": {
        "total": 456,
        "byLicense": {...}
      },
      "conversion": {...},
      "traffic": {...},
      "topBeats": [...]
    }
  }
  ```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

- Rate limit: 100 requests per minute per user
- Remaining requests in response header: `X-RateLimit-Remaining`
- Reset time in header: `X-RateLimit-Reset`

---

## Pagination

All list endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 24, max: 100)

Example: `GET /beats?page=2&limit=12`

---

## Sorting

Supported sort options:
- `newest` - Most recently added
- `oldest` - Oldest first
- `trending` - Most popular
- `popular` - Most liked
- `price-asc` - Price low to high
- `price-desc` - Price high to low

Example: `GET /beats?sort=trending`

---

## Filtering

Example: `GET /beats?genre=Trap&bpmMin=130&bpmMax=150&key=Cm`

---

Last Updated: December 23, 2025
