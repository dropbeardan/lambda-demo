exports.customHandler = async function (event, context) {
	console.log('YOU HAVE HIT LAMBDA!');

	return {
		statusCode: 200,
		body: {
			event,
			context,
			envVars: process.env,
		},
	};
};
