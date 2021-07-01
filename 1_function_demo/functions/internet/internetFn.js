const axios = require('axios');

exports.customHandler = async function () {
	const response = await axios.get(
		'https://www.githubstatus.com/api/v2/status.json'
	);

	return {
		statusCode: 200,
		body: {
			status: response.status,
			data: response.data,
		},
	};
};
