# 🔗 URL Shortener API

A modern URL shortener backend built with **TypeScript, Express, PostgreSQL, and Prisma**.
This project provides URL shortening, redirection, analytics, and user authentication features.

---

## 🚀 Features

* 🔐 **Authentication (JWT)**

  * User registration & login
  * Protected routes

* 🔗 **URL Shortening**

  * Generate short URLs from long URLs
  * Custom short code support (optional)

* 🔁 **Redirect**

  * Redirect short URL to original URL
  * Automatic click tracking

* 📊 **Analytics**

  * Total click count
  * URL details (created date, original URL)

* 🛡️ **Security**

  * Input validation
  * JWT authentication
  * Basic middleware protection

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (jsonwebtoken)
* **Utilities:** nanoid, bcrypt, validator

---

## 📌 API Endpoints

### 🔐 Auth

#### Register

```
POST /auth/register
```

#### Login

```
POST /auth/login
```

---

### 🔗 URL

#### Create Short URL (Protected)

```
POST /api/shorten
```

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "url": "https://example.com"
}
```

---

#### Redirect

```
GET /api/:code
```

---

### 📊 Analytics

#### Get URL Analytics

```
GET /api/analytics/:code
```

Response:

```json
{
  "original_url": "https://example.com",
  "short_code": "abc123",
  "clicks": 10,
  "created_at": "2026-03-30T10:00:00.000Z"
}
```

---

## 🧪 Testing

For the testing, I'm using 

* Postman

---

## 🚀 Future Improvements

* 📈 Advanced analytics (daily clicks, referrer tracking)
* 🔗 Custom short URLs
* ⏳ Expiration links
* 📊 Dashboard UI (frontend)
* 🌍 Deployment & custom domain

---

## 📄 License

Project ini dibuat untuk keperluan pembelajaran. Feel free to use & modify. 🙌
