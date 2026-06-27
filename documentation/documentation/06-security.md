# Security

## Introduction

Security is a fundamental design principle of PotentialTravelHub Cloud. The application was built using AWS managed services and follows security best practices to protect customer data, uploaded documents, and backend resources.

The architecture adopts a **defense-in-depth** approach, where multiple layers of security work together to reduce risk and protect the application.

---

# Security Objectives

The primary security objectives are:

* Protect customer information
* Secure uploaded documents
* Prevent unauthorized access
* Encrypt data in transit
* Apply the Principle of Least Privilege
* Monitor application activity
* Reduce the attack surface
* Follow AWS security best practices

---

# Security Architecture

The application secures every layer of the architecture.

```text
Users
   │
HTTPS
   │
CloudFront
   │
API Gateway
   │
Lambda
   │
├────────► DynamoDB
│
├────────► Amazon S3
│
└────────► Amazon SNS
```

Each component is protected using AWS managed security features.

---

# HTTPS Encryption

All communication between users and the application is encrypted using HTTPS.

AWS Certificate Manager (ACM) issues and manages the SSL/TLS certificate attached to Amazon CloudFront.

Benefits include:

* Data encryption in transit
* Protection against eavesdropping
* Secure browser communication
* Automatic certificate renewal

---

# Amazon CloudFront Security

CloudFront serves as the secure entry point for the application.

Security benefits include:

* HTTPS enforcement
* Edge network protection
* Reduced direct access to the origin
* Improved availability
* Low-latency content delivery

The frontend is accessed through CloudFront rather than directly through Amazon S3.

---

# Amazon S3 Security

## Frontend Bucket

The frontend bucket stores only static website assets:

* HTML
* CSS
* JavaScript

Security measures include:

*
