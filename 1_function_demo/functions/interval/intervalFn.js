const faker = require('faker');

exports.customHandler = async function (event) {
	const uniqueId = faker.fake(
		'{{name.prefix}} {{name.firstName}} {{name.lastName}} {{name.suffix}} ({{name.jobTitle}})'
	);

	console.log(`Interval Run (ID: ${uniqueId}, event: ${event})`);

	return {
		statusCode: 200,
		body: {
			id: uniqueId,
		},
	};
};
