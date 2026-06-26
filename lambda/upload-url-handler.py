import json
import boto3
import uuid
import os

s3 = boto3.client("s3")
BUCKET_NAME = os.environ["BUCKET_NAME"]

def lambda_handler(event, context):
    params = event.get("queryStringParameters") or {}
    file_name = params.get("fileName", "uploaded-document")

    file_key = f"uploads/{uuid.uuid4()}-{file_name}"

    upload_url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": BUCKET_NAME,
            "Key": file_key
        },
        ExpiresIn=300
    )

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        "body": json.dumps({
            "uploadUrl": upload_url,
            "fileKey": file_key
        })
    }
