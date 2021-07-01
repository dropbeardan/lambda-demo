# AWS Lambda Demo (via CLI)

## Resources

### ChromeDriver in Puppeteer

Reddit Thread: https://www.reddit.com/r/aws/comments/ffvlxc/chrome_headless_on_amazon_linux/
Dirty Quick Hit (Moocho-Moocho off some dude's shell): https://intoli.com/blog/installing-google-chrome-on-centos/

### AWS Docs

Lambda Developer Guide: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html
Lambda Container Docs: https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html
Outgoing Internet Access for Lambda: https://medium.com/financial-engines-techblog/aws-lambdas-with-a-static-outgoing-ip-5174a1e70245
AWS SAM Developer Guide: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html

## Commands

Simulate Puppeteer:

```
yarn simulate-oversized
```

Zip source code:

```
// builds entire function set
yarn build

// builds specific function [xxx]
yarn build [xxx]
```

Deploying Zip file to Lambda via AWS Lambda CLI

```
// deploys entire function set
yarn deploy

// deploys specific function [xxx]
yarn deploy [xxx]
```

Invoking Lambda via AWS Lambda CLI

```
// invokes specific function [xxx]
yarn invoke [xxx]
```

Removing Lambda via AWS Lambda CLI

```
// destroys entire function set
yarn destroy

// destroys specific function [xxx]
yarn destroy [xxx]
```
