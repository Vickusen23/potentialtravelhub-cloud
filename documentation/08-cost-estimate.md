# Cost Estimate

## Introduction

One of the primary advantages of a serverless architecture is its cost efficiency. PotentialTravelHub Cloud uses AWS managed services that follow a **pay-as-you-go** pricing model, allowing the application to scale automatically while keeping operational costs low.

For learning, development, and small production workloads, the application can operate at little or no cost when usage remains within the AWS Free Tier limits.

---

# Pricing Model

The application uses serverless services that charge based on actual consumption rather than continuously running infrastructure.

This means there are:

* No EC2 instances
* No operating system management
* No server maintenance
* No idle infrastructure costs
* Automatic scaling

Users only pay for the resources consumed.

---

# AWS Services Included

The following AWS services contribute to the application's operating cost:

| AWS Service             | Pricing Model                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| Amazon S3               | Storage, requests, and data transfer                                                           |
| Amazon CloudFront       | Data transfer and requests                                                                     |
| Amazon API Gateway      | Per API request                                                                                |
| AWS Lambda              | Requests and execution duration                                                                |
| Amazon DynamoDB         | On-Demand read/write requests and storage                                                      |
| Amazon SNS              | Published messages and email notifications                                                     |
| Amazon CloudWatch       | Logs and monitoring metrics                                                                    |
| Amazon Route 53         | Hosted zone and DNS queries                                                                    |
| AWS Certificate Manager | Public SSL certificates provided at no additional charge when used with supported AWS services |

---

# Estimated Monthly Cost

The estimates below assume a small production workload and are intended for planning purposes. Actual charges depend on usage, storage, and data transfer.

| Monthly Activity  | Estimated Cost (USD) |
| ----------------- | -------------------: |
| 100 inquiries     |        $0.00 – $1.00 |
| 1,000 inquiries   |        $1.00 – $5.00 |
| 10,000 inquiries  |      $10.00 – $25.00 |
| 100,000 inquiries |     $40.00 – $100.00 |

These estimates include API requests, Lambda execution, DynamoDB storage, document uploads, CloudFront delivery, and SNS notifications.

---

# AWS Free Tier

Most learning and development activities fall within the AWS Free Tier.

Typical Free Tier benefits include:

* AWS Lambda monthly request allowance
* Amazon API Gateway monthly request allowance
* Amazon DynamoDB storage and requests
* Amazon S3 storage
* Amazon CloudWatch logging
* Amazon SNS email notifications (within service limits)

Always refer to the official AWS Free Tier documentation for the latest allowances.

---

# Cost Breakdown by Service

## Amazon S3

Costs are based on:

* Amount of data stored
* Number of requests
* Data transferred out

Because uploaded documents are generally small (PDFs, images, certificates), storage costs remain low.

---

## Amazon CloudFront

CloudFront charges are based on:

* Requests
* Data transferred to users

Using CloudFront improves performance while keeping costs predictable for moderate traffic.

---

## Amazon API Gateway

API Gateway charges per request.

The application exposes two endpoints:

* POST /generate-upload-url
* POST /inquiry

For small workloads, API Gateway costs are typically minimal.

---

## AWS Lambda

Lambda charges depend on:

* Number of requests
* Execution duration
* Allocated memory

Because the Lambda functions perform lightweight processing, execution times remain short, helping reduce costs.

---

## Amazon DynamoDB

The application uses **On-Demand Capacity Mode**.

Benefits include:

* No capacity planning
* Automatic scaling
* Pay only for actual read and write requests

This is ideal for unpredictable traffic patterns.

---

## Amazon SNS

Amazon SNS charges are based on the number of published messages and notification deliveries.

Since one notification is sent per inquiry, costs remain very low for most workloads.

---

## Amazon CloudWatch

CloudWatch costs depend on:

* Log storage
* Metrics
* Monitoring

During development, log volumes are generally small.

Production environments should implement log retention policies to manage storage costs.

---

# Cost Optimization Strategies

Several design decisions help minimize operational costs.

## Serverless Architecture

Using AWS Lambda eliminates the need for continuously running virtual machines.

---

## On-Demand DynamoDB

Automatically scales with traffic while avoiding over-provisioning.

---

## Direct Amazon S3 Uploads

Documents are uploaded directly to Amazon S3 using pre-signed URLs instead of passing through Lambda.

Benefits include:

* Lower Lambda execution time
* Reduced compute cost
* Improved upload performance

---

## CloudFront Caching

CloudFront caches static website assets, reducing requests to Amazon S3 and improving response times.

---

## Infrastructure as Code

AWS CloudFormation enables repeatable deployments and reduces manual configuration errors, lowering operational overhead.

---

# Cost Monitoring

AWS provides several tools for monitoring and controlling costs.

Recommended services include:

* AWS Billing Dashboard
* AWS Cost Explorer
* AWS Budgets
* Amazon CloudWatch

These tools help monitor usage, identify trends, and receive alerts when spending approaches predefined thresholds.

---

# Production Considerations

As application usage grows, additional services may increase overall costs, including:

* Amazon Cognito
* AWS WAF
* Amazon EventBridge
* Amazon SQS
* Amazon SES
* AWS X-Ray

Despite these additions, the serverless architecture continues to provide an efficient pay-as-you-go pricing model that scales with demand.

---

# Summary

PotentialTravelHub Cloud is designed to be highly cost-efficient by leveraging AWS managed services and serverless technologies.

For small and medium workloads, operating costs remain low while providing automatic scalability, high availability, and minimal infrastructure management.

The architecture demonstrates how modern serverless applications can deliver enterprise-grade functionality without the expense of maintaining traditional servers.
