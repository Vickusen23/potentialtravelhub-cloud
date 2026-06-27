# Troubleshooting Guide

## Introduction

This document outlines the most common issues encountered during the development and deployment of PotentialTravelHub Cloud, along with the solutions used to resolve them.

The troubleshooting steps documented here are based on real issues experienced while building the project and can serve as a reference for future deployments.

---

# Issue 1 – CORS Errors

## Problem

The frontend could not communicate with Amazon API Gateway due to Cross-Origin Resource Sharing (CORS) restrictions.

### Symptoms

* Browser displayed CORS errors.
* API requests failed before reaching Lambda.
* Frontend showed network errors.

### Solution

* Enabled CORS on API Gateway.
* Added the following headers to Lambda responses:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: OPTIONS,POST
```

* Redeployed the API.

---

# Issue 2 – API Gateway Route Not Invoking Lambda

## Problem

The API routes existed but requests never reached the Lambda function.

### Cause

The API route was not attached to a Lambda integration.

### Solution

* Created Lambda Integration.

* Attached the integration to:

  * POST /inquiry
  * POST /generate-upload-url

* Verified successful invocation using CloudWatch Logs.

---

# Issue 3 – CloudFront Changes Not Updating

## Problem

Frontend updates did not appear after uploading new HTML, CSS, or JavaScript files.

### Cause

CloudFront was serving cached content.

### Solution

Create a CloudFront invalidation:

```text
/*
```

Wait for the invalidation to complete before testing again.

---

# Issue 4 – Uploaded Documents Missing from Amazon S3

## Problem

The frontend displayed a successful submission, but uploaded documents were not present in the document bucket.

### Cause

The browser upload to the Amazon S3 Pre-Signed URL failed.

### Solution

Verified:

* UploadURLHandler Lambda generated the correct pre-signed URL.
* BUCKET_NAME environment variable pointed to the correct bucket.
* The frontend uploaded the file before submitting the inquiry.
* The upload request completed successfully.

---

# Issue 5 – HTTP 403 During File Upload

## Problem

Amazon S3 returned an HTTP 403 Forbidden error when uploading documents.

### Cause

The upload request and the generated pre-signed URL did not match.

### Solution

* Regenerated the pre-signed URL.
* Ensured the upload request matched the generated URL.
* Confirmed the bucket name and IAM permissions.

---

# Issue 6 – Missing Environment Variable

## Problem

The UploadURLHandler Lambda failed during execution.

### Cause

The required environment variable was missing.

### Required Variable

```text
BUCKET_NAME=potentialtravelhub-documents-859462937318-us-east-1
```

### Solution

Added the environment variable and redeployed the function.

---

# Issue 7 – SNS Email Notifications Not Received

## Problem

Customer inquiries were processed successfully, but no email notification was received.

### Cause

The Amazon SNS subscription had not been confirmed.

### Solution

* Open the Amazon SNS console.
* Open the Topic.
* Navigate to **Subscriptions**.
* Confirm the email subscription from the verification email.
* Submit another inquiry to verify successful delivery.

---

# Issue 8 – Inquiry Not Stored in DynamoDB

## Problem

The inquiry was submitted successfully from the frontend, but no record appeared in DynamoDB.

### Possible Causes

* Lambda execution failed.
* Incorrect table name.
* IAM permissions missing.

### Solution

* Verified the DynamoDB table name.
* Confirmed Lambda had permission to write to the table.
* Checked CloudWatch logs for errors.

---

# Issue 9 – Lambda Permission Errors

## Problem

Lambda returned **AccessDeniedException** while accessing AWS resources.

### Solution

Updated the IAM execution role to allow access to:

* Amazon DynamoDB
* Amazon SNS
* Amazon S3
* CloudWatch Logs

Applied the Principle of Least Privilege while granting only the permissions required.

---

# Issue 10 – CloudFormation Stack Failure

## Problem

CloudFormation failed to create or update the stack.

### Possible Causes

* Resource name conflicts.
* Existing resources.
* IAM permission issues.

### Solution

* Reviewed CloudFormation Events.
* Corrected the reported issue.
* Deleted failed resources if necessary.
* Redeployed the stack.

---

# Issue 11 – JavaScript Fetch Errors

## Problem

The frontend displayed:

```text
Something went wrong. Please try again.
```

### Solution

Verified:

* API Gateway endpoint URL.
* Request method.
* JSON formatting.
* Browser Developer Tools (Network tab).
* Lambda execution logs.

---

# Issue 12 – CloudWatch Logs Missing

## Problem

No logs appeared after invoking Lambda.

### Cause

Lambda execution role lacked CloudWatch logging permissions.

### Solution

Attached the AWS-managed logging policy or granted the required CloudWatch Logs permissions to the Lambda execution role.

---

# Troubleshooting Checklist

Before reporting an issue, verify the following:

* API Gateway routes are deployed.
* Lambda integrations are attached.
* Lambda functions execute successfully.
* Environment variables are configured.
* CloudWatch logs show no errors.
* DynamoDB receives new records.
* Amazon S3 stores uploaded documents.
* Amazon SNS subscription is confirmed.
* CloudFront cache has been invalidated after frontend updates.
* IAM permissions are correctly configured.

---

# Useful AWS Services for Troubleshooting

| AWS Service        | Purpose                        |
| ------------------ | ------------------------------ |
| Amazon CloudWatch  | View Lambda logs and metrics   |
| API Gateway        | Verify routes and integrations |
| AWS Lambda         | Monitor execution and errors   |
| Amazon S3          | Confirm document uploads       |
| Amazon DynamoDB    | Verify inquiry records         |
| Amazon SNS         | Check notification delivery    |
| AWS CloudFormation | Review deployment events       |

---

# Summary

Most deployment issues can be resolved by checking API Gateway integrations, IAM permissions, CloudWatch logs, CloudFront cache, and Amazon S3 configuration.

Documenting these troubleshooting steps helps reduce deployment time, improves maintainability, and provides valuable operational knowledge for future enhancements.
