# API Reference

This document describes the REST API endpoints used by the PotentialTravelHub Cloud application.

The backend exposes two HTTP endpoints through Amazon API Gateway.

---

# Base URL

Replace the URL below with your deployed API Gateway endpoint.

Example:

```text
https://p30rp2pbrc.execute-api.us-east-1.amazonaws.com
```

---

# Authentication

The current version of the API is publicly accessible.

Authentication and authorization using Amazon Cognito are planned for a future release.

---

# Content Type

All API requests should use:

```http
Content-Type: application/json
```

---

# Endpoint 1 – Generate Upload URL

Generates a temporary Amazon S3 Pre-Signed URL that allows the frontend to upload a document securely.

## Endpoint

```http
POST /generate-upload-url
```

---

## Purpose

This endpoint generates a secure temporary upload URL for Amazon S3 without exposing the document bucket publicly.

The returned URL expires automatically after a short period.

---

## Query Parameters

| Parameter | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| fileName  | String | Yes      | Original file name selected by the user. |

Example:

```http
POST /generate-upload-url?fileName=passport.pdf
```

---

## Successful Response

Status Code

```http
200 OK
```

Example Response

```json
{
  "uploadUrl": "https://bucket.s3.amazonaws.com/...",
  "fileKey": "uploads/8cb18a87-passport.pdf"
}
```

---

## Possible Errors

| Status Code | Meaning               |
| ----------- | --------------------- |
| 400         | Invalid request       |
| 403         | Permission denied     |
| 500         | Internal server error |

---

# Endpoint 2 – Submit Inquiry

Processes customer inquiries after any selected document has been uploaded.

## Endpoint

```http
POST /inquiry
```

---

## Purpose

Accepts customer information, validates the request, stores the inquiry in Amazon DynamoDB, and sends an email notification through Amazon SNS.

---

## Request Body

Example

```json
{
  "fullName": "Victor Pius Usen",
  "email": "victorusen23@gmail.com",
  "phone": "+2348012345678",
  "service": "Study Abroad",
  "message": "I would like information about studying in Canada.",
  "documentKey": "uploads/8cb18a87-passport.pdf"
}
```

---

## Request Fields

| Field       | Required | Description                                            |
| ----------- | -------- | ------------------------------------------------------ |
| fullName    | Yes      | Customer's full name                                   |
| email       | Yes      | Customer's email address                               |
| phone       | Yes      | Customer's phone number                                |
| service     | Yes      | Requested service                                      |
| message     | Yes      | Customer inquiry                                       |
| documentKey | No       | Amazon S3 document key returned by the upload endpoint |

---

## Successful Response

Status Code

```http
200 OK
```

Example Response

```json
{
  "message": "Inquiry submitted successfully."
}
```

---

## Backend Processing

After receiving a valid request, the application automatically:

1. Validates customer information.
2. Stores the inquiry in Amazon DynamoDB.
3. Publishes a notification to Amazon SNS.
4. Sends an email notification.
5. Returns a success response.

---

## Possible Errors

| Status Code | Meaning               |
| ----------- | --------------------- |
| 400         | Invalid request body  |
| 403         | Access denied         |
| 500         | Internal server error |

---

# Request Flow

```text
Frontend
      │
      ▼
POST /generate-upload-url
      │
      ▼
UploadURLHandler Lambda
      │
      ▼
Amazon S3 Pre-Signed URL
      │
      ▼
Document Upload
      │
      ▼
POST /inquiry
      │
      ▼
InquiryHandler Lambda
      │
      ├────────► Amazon DynamoDB
      │
      └────────► Amazon SNS
```

---

# Example Workflow

### Step 1

Request an upload URL.

↓

### Step 2

Upload the document directly to Amazon S3.

↓

### Step 3

Submit the inquiry using the returned document key.

↓

### Step 4

Lambda stores the inquiry in DynamoDB.

↓

### Step 5

Amazon SNS sends an email notification.

---

# API Version

Current Version

```text
v1
```

Future versions may introduce:

* Amazon Cognito authentication
* JWT authorization
* Request validation
* API rate limiting
* Versioned endpoints
* Administrative APIs
