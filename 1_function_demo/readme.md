# AWS Lambda Demo (via CLI)

## Resources

Lambda Developer Guide: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html
API Gateway Developer Guide: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
Lambda CLI Docs: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/index.html
AWS JS SDK Docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html

## Commands

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
