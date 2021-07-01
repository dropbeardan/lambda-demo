const faker = require('faker');

exports.customHandler = async function () {
	const uniqueId = faker.fake(
		'{{name.prefix}} {{name.firstName}} {{name.lastName}} {{name.suffix}} ({{name.jobTitle}})'
	);

	return {
		statusCode: 200,
		body: {
			response: uniqueId,
		},
	};
};
