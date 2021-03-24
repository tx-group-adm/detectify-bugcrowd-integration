[![deepcode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6InRhbWVkaWEtcG1kIiwicmVwbzEiOiJidWdjcm93ZC1kZXRlY3RpZnktbWFwcGVyIiwiaW5jbHVkZUxpbnQiOmZhbHNlLCJhdXRob3JJZCI6MTMxOTUsImlhdCI6MTYwMTU1OTY3MH0.90xLPKNbrsUcwEo6TcGHQCEv8bfe1LuytaRKQ7lgzp0)](https://www.deepcode.ai/app/gh/tamedia-pmd/bugcrowd-detectify-mapper/_/dashboard?utm_content=gh%2Ftamedia-pmd%2Fbugcrowd-detectify-mapper)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tamedia-pmd_bugcrowd-detectify-mapper&metric=alert_status)](https://sonarcloud.io/dashboard?id=tamedia-pmd_bugcrowd-detectify-mapper)

# Detectify BugCrowd Integration

The Detectify-BugCrowd integration triggers a Lambda function every time a Detectify web app vulnerability scan is finished and every new finding is then collected by the Lambda function and pushed to the according to Bug Bounty Program on BugCrowd side. With that automation, all newly detected vulnerabilities by Detectify will be treated as a duplicate on BugCrowd side.

<img width="900" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93575608-28064200-f99a-11ea-9590-da6d8a5a5b81.png">

## Local setup

After cloning the repo, you have to create a .env file with the following variables in it and do **npm install** to install nodejs modules:

```
BOUNTY_UUID=<your_id>
HOST= http://localhost:3000
DETECTIFY_API_KEY=<your_key>
DETECTIFY_SECRET_KEY=<your_secrect_key>
BUG_CROWD_TOKEN=<your_token>
```

## Step 1: Create a new user in AWS

This step is needed for deploying lambda on your Aws account. The option is located under **Identity and Access Management (IAM)** [AWS Identity and Access Management](https://console.aws.amazon.com/iam/home?region=eu-west-1#/users)
You need to add a new user and copy Access key ID and Secret key (save on local machine for feature use).

<img width="900" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93575682-3b191200-f99a-11ea-9b12-09ba558b4c57.png">

## Step 2: Serverless configuration

If you don't have serverless installed in your computer, you can do it with the following command
`npm install -g serverless`
[Serverless Framework - AWS Lambda Guide - Installing The Serverless Framework](https://www.serverless.com/framework/docs/providers/aws/guide/installation)

After a successful installation with access and secret key, now we should set up a serverless framework.
`serverless config credentials --provider aws --key key --secret secret`

For more information visit serverless site: [Serverless Framework Commands - AWS Lambda - Config Credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials)

## Step 3: Add secrets variables on AWS Secrets Manager

To avoid stealing sensitive data like secrets keys, tokens, env. variables we use AWS Secrets Manager.

For lambda to work correctly, we should create four variables:

- secrets/DETECTIFY_API_KEY
- secrets/DETECTIFY_SECRET_KEY
- secrets/BUG_CROWD_TOKEN
- secrets/BUG_BOUNTY_UUID

You can add secrets via AWS CLI or with AWS Secrets Manager (https://eu-west-1.console.aws.amazon.com/secretsmanager/home?region=eu-west-1#/listSecrets )

<img width="1000" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93572374-0c00a180-f996-11ea-9cc2-1684923eb3ac.png">

If you chose via CLI, first make sure you have installed AWS CLI. [Installing the AWS CLI version 2 - AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

I have used MacOS and command to installing AWS are:

`curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"`
`sudo installer -pkg AWSCLIV2.pkg -target`

For other systems find details in the documentation, the link is above

After successful installation you can run:

`aws secretsmanager create-secret --name secrets/BUG_BOUNTY_UUID --description "The Bounty uuid, represents the id for a project on which you are going to create submissions." --secret-string 357a81ca-92b7-4b60-9548-5a64533c5cca`

And secret with name **secrets/BUG_BOUNTY_UUID** and with value **357a81ca-92b7-4b60-9548-5a64533c5cca** is created.

[Tutorial: Creating and Retrieving a Secret - AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/tutorials_basic.html).

If you want to update the exist secret key, you should follow the next command:
`aws secretsmanager update-secret --secret-id secrets/BUG_BOUNTY_UUID --secret-string 9a3atest-test-42ff-test-test4f14a2`

[update-secret — AWS CLI 1.18.138 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/update-secret.html)

How to get these secrets is explained in the following steps.

## Step 4: Detectify API and secret key

First, navigate to your team profile:

<img width="200" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573503-80881000-f997-11ea-984b-de528b2a77c0.png">

Then go to API keys:

<img width="400" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573576-94337680-f997-11ea-9953-aaa5b150bb87.png">

Here generate a new key with the following permissions set to true:

 <img width="700" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573636-ab726400-f997-11ea-8f79-08122ca6f1f1.png">

<img width="700" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573693-bd540700-f997-11ea-8929-9f22824b7cfb.png">

<img width="700" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573727-cb098c80-f997-11ea-8100-aa2435bf1381.png">

## Step 4: BugCrowd Token

Navigating to Api credentials section from https://tracker.bugcrowd.com/ url.

<img width="200" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573782-dbba0280-f997-11ea-97ea-5999167ebbfe.png"> <img width="500" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93573861-effdff80-f997-11ea-8f64-63d861190679.png">

You will be able to create an auth token which we use for authentication. After creating the auth token you only need is to copy and paste it to the AWS Secrets Manager. For more details visit https://docs.bugcrowd.com/reference#authentication.

## Step 5: Get BugCrowd bounty uuid

The Bounty uuid, represents the id for a project on which you are going to create submissions.
This uuid can be obtained e.g. via postman, https://api.bugcrowd.com/bounties url or in an easier way if you invoke your AWS url (see **step 8** ) or run the program and on localhost:3000( make a sure you have created env file with all of these variables). There you can see all projects available for your token (keep in mind that you first enter bugCrowd auth token in AWS Secrets Manager).

<img width="800" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93574484-c2658600-f998-11ea-9fa0-aef76404474a.png">

This is an example JSON from http:localhost:3000
After getting the uuid you need to create variable secrets/BUG_BOUNTY_UUID with the proper value

## Step 7: Deploying to AWS

After you successfully finished all these steps, you can deploy your lambda function.
`serverless deploy` [Serverless Framework Commands - AWS Lambda - Deploy](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/)

## Step 8: Obtain AWS endpoint

After deploying, you will need to obtain the AWS endpoint because as this will be configured within Detectify as a Webhook address. This can be done through API Gateway. You need to navigate to https://eu-west-1.console.aws.amazon.com/apigateway/main/apis?region=eu-west-1
Find your lambda function and click on it. (you probably will have two functions for dev and prod stage)

<img width="700" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93574531-ce514800-f998-11ea-931f-82e3764ee721.png">

Go to stages section, select the particular stage and you will be able to see invoke url on the right top side like in the picture below.

<img width="700" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93574570-da3d0a00-f998-11ea-91dc-7fb9c7d7386b.png">

## Step 9: Setup detectify webhook

Navigate to your scan profile and there within the settings to integrations: Here you can add a webhook like this:

<img width="500" alt="Picture 1" src="https://user-images.githubusercontent.com/33635169/93574629-ede87080-f998-11ea-95c2-c0785c81f6a4.png">

Replace the URL with your AWS endpoint and also add static path **/detectify/receive-webhook**, this is basically express route where we expect events from detectify. IMPORTANT to set the new findings options to not generate duplicate entries.
