const faker = require('faker');

exports.customHandler = async function (event, context) {
	const uniqueId = faker.fake(
		'{{name.prefix}} {{name.firstName}} {{name.lastName}} {{name.suffix}} ({{name.jobTitle}})'
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			context,
			event,
			response: uniqueId,
		}),
	};
};
