import json
import uuid
import boto3
import os
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

TABLE_NAME = os.environ['TABLE_NAME']
TOPIC_ARN = os.environ['TOPIC_ARN']

table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):

    body = json.loads(event['body'])

    inquiry_id = str(uuid.uuid4())

    item = {
        'inquiryId': inquiry_id,
        'fullName': body['fullName'],
        'email': body['email'],
        'phone': body['phone'],
        'service': body['service'],
        'message': body['message'],
        'createdAt': datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)

    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject='New Inquiry Received',
        Message=f"New inquiry from {body['fullName']}"
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': 'Inquiry submitted successfully'
        })
    }
