# Prerequisites

Before deploying PotentialTravelHub Cloud, ensure you have the following tools, services, and permissions available.

---

# AWS Account

An active AWS account is required to deploy and manage the infrastructure.

Sign up at:

https://aws.amazon.com/

---

# AWS Region

This project was developed and tested in:

```
us-east-1 (N. Virginia)
```

Using the same region is recommended to avoid unnecessary configuration changes.

---

# AWS CLI

Install the AWS Command Line Interface (AWS CLI).

Documentation:

https://docs.aws.amazon.com/cli/

Verify installation:

```bash
aws --version
```

Configure your credentials:

```bash
aws configure
```

You will be prompted for:

* AWS Access Key ID
* AWS Secret Access Key
* Default Region (`us-east-1`)
* Output Format (`json`)

---

# Git

Install Git.

Download:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

---

# Python

Install Python 3.13 or later.

Download:

https://www.python.org/downloads/

Verify installation:

```bash
python --version
```

---

# Visual Studio Code

Recommended IDE:

https://code.visualstudio.com/

Recommended extensions:

* Python
* AWS Toolkit
* Markdown Preview Enhanced
* GitHub Pull Requests

---

# Required AWS Services

This project uses the following AWS services:

* Amazon S3
* Amazon CloudFront
* Amazon API Gateway
* AWS Lambda
* Amazon DynamoDB
* Amazon SNS
* Amazon CloudWatch
* AWS IAM
* AWS CloudFormation
* Amazon Route 53
* AWS Certificate Manager (ACM)

---

# IAM Permissions

The deployment user should have permissions to create and manage:

* IAM Roles
* Lambda Functions
* API Gateway
* DynamoDB
* Amazon S3
* CloudFront
* CloudFormation
* SNS Topics
* CloudWatch Logs

AdministratorAccess was used during development for simplicity.

For production environments, follow the Principle of Least Privilege by granting only the permissions required for deployment and operation.

---

# Estimated Cost

The project is designed to operate within the AWS Free Tier for most learning and testing activities.

Some services, such as CloudFront, Route 53, and data transfer, may incur minimal charges depending on usage.

Always monitor your AWS Billing Dashboard to avoid unexpected costs.

---

# Recommended Knowledge

A basic understanding of the following topics will help when deploying or extending this project:

* REST APIs
* HTTP Methods
* JSON
* Python
* AWS Identity and Access Management (IAM)
* Serverless Architecture
* CloudFormation

---

# Repository

Clone the repository:

```bash
git clone https://github.com/Vickusen23/potentialtravelhub-cloud.git
```

Navigate into the project directory:

```bash
cd potentialtravelhub-cloud
```

You are now ready to begin deploying the infrastructure.
