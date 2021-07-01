const axios = require('axios');

exports.customHandler = async function (event, context) {
	const response = await axios.get(
		'https://www.githubstatus.com/api/v2/status.json'
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			response,
		}),
	};
};
