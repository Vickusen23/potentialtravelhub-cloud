# Architecture Design

## Introduction

PotentialTravelHub Cloud is designed as a fully managed, serverless application that follows AWS Well-Architected Framework principles. The solution minimizes infrastructure management while maximizing scalability, availability, security, and operational efficiency.

Rather than relying on traditional virtual machines or long-running application servers, the application uses AWS managed services to automatically scale based on demand.

The architecture consists of five logical layers:

* Presentation Layer
* API Layer
* Compute Layer
* Data Layer
* Monitoring Layer

---

# High-Level Architecture

The diagram below illustrates the complete architecture.

![Architecture Diagram](../diagrams/architecture-diagram.png)

---

# Architecture Overview

```text
                    Users
                      │
                      ▼
               Amazon Route 53
                      │
                      ▼
          AWS Certificate Manager
                      │
                      ▼
             Amazon CloudFront
                      │
                      ▼
          Amazon S3 Frontend Bucket
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
POST /generate-upload-url     POST /inquiry
         │                         │
         ▼                         ▼
 UploadURLHandler Lambda    InquiryHandler Lambda
         │                         │
         ▼                         ├────────────► Amazon DynamoDB
 Amazon S3 Document Bucket         │
                                   └────────────► Amazon SNS
                                                   │
                                                   ▼
                                            Email Notification

                      ▼
               Amazon CloudWatch
```

---

# Presentation Layer

## Amazon Route 53

Amazon Route 53 provides DNS resolution for the application.

Responsibilities include:

* Domain management
* DNS routing
* High availability
* Alias record management

---

## AWS Certificate Manager (ACM)

AWS Certificate Manager manages the SSL/TLS certificate used by CloudFront.

Benefits:

* HTTPS encryption
* Automatic certificate renewal
* No certificate management overhead

---

## Amazon CloudFront

CloudFront acts as the global Content Delivery Network (CDN).

Responsibilities:

* Delivers static assets globally
* Reduces latency
* Provides HTTPS support
* Caches frontend content
* Protects the S3 frontend bucket from direct access

Reason for selection:

CloudFront significantly improves user experience while reducing requests to Amazon S3.

---

## Amazon S3 Frontend Bucket

The frontend bucket stores:

* HTML
* CSS
* JavaScript

Reasons for using Amazon S3:

* Highly durable
* Low cost
* Serverless
* Highly available
* Seamless integration with CloudFront

---

# API Layer

## Amazon API Gateway

Amazon API Gateway exposes the application's REST API.

Endpoints:

```text
POST /generate-upload-url
POST /inquiry
```

Responsibilities:

* Receive frontend requests
* Route requests to Lambda
* Enable CORS
* Provide secure API access

Why API Gateway?

* Fully managed
* Automatic scaling
* No server maintenance
* Native Lambda integration

---

# Compute Layer

Business logic is implemented using AWS Lambda.

---

## UploadURLHandler

Purpose:

Generates temporary Amazon S3 Pre-Signed URLs.

Why?

Uploading directly to Amazon S3:

* Eliminates unnecessary Lambda processing
* Reduces cost
* Improves performance
* Keeps the document bucket private

---

## InquiryHandler

Responsibilities:

* Validate request data
* Store inquiries in DynamoDB
* Publish SNS notifications

Benefits:

* Event-driven
* Stateless
* Automatically scalable

---

# Data Layer

## Amazon DynamoDB

Stores all inquiry records.

Reason for selection:

* Fully managed
* Serverless
* Millisecond latency
* Automatic scaling
* High availability

Stored attributes include:

* Inquiry ID
* Customer Name
* Email
* Phone
* Service
* Message
* Document Key
* Timestamp

---

## Amazon S3 Document Bucket

Stores uploaded customer documents.

Instead of making the bucket public, uploads are performed using temporary Amazon S3 Pre-Signed URLs.

Benefits:

* Improved security
* Temporary access
* No public write permissions
* Reduced backend workload

---

## Amazon SNS

Provides administrator notifications.

After every successful inquiry:

Lambda →

SNS →

Email

Benefits:

* Fully managed
* Reliable
* Near real-time delivery

---

# Monitoring Layer

## Amazon CloudWatch

CloudWatch captures:

* Lambda logs
* Invocation metrics
* Errors
* Performance metrics

CloudWatch greatly simplifies troubleshooting and operational monitoring.

---

# Security Design

The architecture follows several AWS security best practices.

## IAM

Least-privilege permissions were assigned to Lambda execution roles.

Each function only receives the permissions required to perform its tasks.

---

## HTTPS

CloudFront uses AWS Certificate Manager to encrypt all communication using HTTPS.

---

## Secure File Uploads

Documents are uploaded using temporary Amazon S3 Pre-Signed URLs.

Advantages:

* No public S3 bucket
* Temporary credentials
* Time-limited access
* Secure browser uploads

---

# Scalability

Every major component scales automatically.

| Service     | Scaling Method        |
| ----------- | --------------------- |
| CloudFront  | Global edge locations |
| API Gateway | Automatic             |
| Lambda      | Automatic             |
| DynamoDB    | On-Demand             |
| Amazon S3   | Virtually unlimited   |
| SNS         | Automatic             |

No manual scaling is required.

---

# Reliability

The application achieves high availability through AWS managed services.

Features include:

* Multi-AZ infrastructure
* Managed storage
* Automatic service recovery
* No single application server

---

# Performance Efficiency

Performance improvements include:

* CloudFront edge caching
* Direct browser uploads to Amazon S3
* Stateless Lambda execution
* Serverless compute
* Managed NoSQL database

These reduce latency while improving scalability.

---

# Cost Optimization

The application follows a pay-for-use pricing model.

Benefits include:

* No EC2 instances
* No server administration
* No idle infrastructure
* Automatic scaling
* AWS Free Tier compatibility for learning

Operational costs remain low while supporting future growth.

---

# Operational Excellence

Operational best practices include:

* Infrastructure as Code using CloudFormation
* CloudWatch monitoring
* Centralized logging
* Managed AWS services
* Version-controlled source code
* GitHub documentation

---

# Architectural Decisions

Several design decisions were made during development.

| Decision             | Reason                               |
| -------------------- | ------------------------------------ |
| CloudFront + S3      | Secure and scalable frontend hosting |
| Two Lambda functions | Separation of responsibilities       |
| Pre-Signed URLs      | Secure document uploads              |
| DynamoDB             | Serverless NoSQL storage             |
| SNS                  | Automated notifications              |
| CloudFormation       | Repeatable infrastructure deployment |

---

# Summary

PotentialTravelHub Cloud demonstrates how AWS managed services can be combined to build a modern serverless application that is secure, scalable, reliable, and cost-effective.

The architecture aligns closely with the AWS Well-Architected Framework and serves as a practical example of designing cloud-native applications using serverless technologies.
