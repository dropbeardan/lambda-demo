// I really tried, this SDK sucks and the documents suck too.

const {
	APIGatewayClient,
	CreateRestApiCommand,
	CreateResourceCommand,
	GetResourcesCommand,
	PutMethodCommand,
} = require('@aws-sdk/client-api-gateway');
const {
	LambdaClient,
	ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');

const APIGATEWAY_PARAMS = {
	APIGATEWAY: {
		description: 'Lambda Proxy: `restapi`',
		name: 'restapi',
	},
	CREATE_METHOD: {
		authorizationType: 'NONE',
		httpMethod: 'ANY',
		operationName: '/',
	},
	CREATE_RESOURCE: {
		pathPart: 'endpoint',
	},
	GET_RESOURCES: {},
	ROOT_RESOURCE_PATH: '/',
	SDK_CLIENT: {
		region: 'ap-southeast-2',
	},
};

const LAMBDA_PARAMS = {
	LIST_FUNCTIONS: {},
	SDK_CLIENT: {
		region: 'ap-southeast-2',
	},
	TARGET_FUNCTION_NAME: 'restapi',
};

const apigatewayCommands = {
	createApi: () => new CreateRestApiCommand(APIGATEWAY_PARAMS.APIGATEWAY),
	createIntegration: ({ apigateway, resource, targetLambda }) =>
		new PutIntegrationCommand({
			...APIGATEWAY_PARAMS.CREATE_INTEGRATION,
			resourceId: resource.id,
			restApiId: apigateway.id,
			uri: targetLambda.FunctionArn,
		}),
	createMethod: ({ apigateway, resource }) =>
		new PutMethodCommand({
			...APIGATEWAY_PARAMS.CREATE_METHOD,
			resourceId: resource.id,
			restApiId: apigateway.id,
		}),
	createResource: ({ apigateway, targetResource }) =>
		new CreateResourceCommand({
			...APIGATEWAY_PARAMS.CREATE_RESOURCE,
			parentId: targetResource.id,
			restApiId: apigateway.id,
		}),
	getResources: ({ apigateway }) =>
		new GetResourcesCommand({
			...APIGATEWAY_PARAMS.GET_RESOURCES,
			restApiId: apigateway.id,
		}),
	intializeClient: () => new APIGatewayClient(APIGATEWAY_PARAMS.SDK_CLIENT),
};

const lambdaCommands = {
	intializeClient: () => new LambdaClient(LAMBDA_PARAMS.SDK_CLIENT),
	listFunctions: () => new ListFunctionsCommand(LAMBDA_PARAMS.LIST_FUNCTIONS),
};

const deploy = async () => {
	const apigatewaySdkClient = apigatewayCommands.intializeClient();
	const lambdaSdkClient = lambdaCommands.intializeClient();

	const lambdas = await lambdaSdkClient.send(lambdaCommands.listFunctions());
	const targetLambda = lambdas.Functions.find(
		(lambda) => lambda.FunctionName === LAMBDA_PARAMS.TARGET_FUNCTION_NAME
	);

	const apigateway = await apigatewaySdkClient.send(
		apigatewayCommands.createApi()
	);

	const resources = await apigatewaySdkClient.send(
		apigatewayCommands.getResources({ apigateway })
	);
	const targetResource = resources.items.find(
		(resource) => resource.path === APIGATEWAY_PARAMS.ROOT_RESOURCE_PATH
	);

	const resource = await apigatewaySdkClient.send(
		apigatewayCommands.createResource({ apigateway, targetResource })
	);

	const method = await apigatewaySdkClient.send(
		apigatewayCommands.createMethod({ apigateway, resource })
	);
};

deploy();
