const puppeteer = require('puppeteer');

const MISSION_BRIEFS = [
	{
		url: 'https://www.amazon.com.au/Cut-Inc-Truth-Drink-Card/dp/B07SJ7PC16',
		fields: {
			price: '[id="priceblock_ourprice"]',
			title: '[id="productTitle"]',
		},
	},
	{
		url: 'https://buy.cut.com/collections/games/products/truth-or-drink-game?variant=31599164293216',
		fields: {
			price: '[id="ProductPrice"] > [class="money"]',
			title: '[itemprop="name"]',
		},
	},
];

exports.customHandler = async function (event, context) {
	const browser = await puppeteer.launch();

	const pendingMissionFindings = MISSION_BRIEFS.map(async ({ url, fields }) => {
		const page = await browser.newPage();
		await page.goto(url);

		const pendingPageAttributes = Object.entries(fields).map(
			async ([attr, selector]) => {
				const selectedValues = await page.$$(selector);
				const values = await Promise.all(
					selectedValues.map(
						async (elementHandle) =>
							await page.evaluate(
								(element) => String(element.textContent).trim(),
								elementHandle
							)
					)
				);

				return { attr, selector, values };
			}
		);

		const pageAttributes = await Promise.all(pendingPageAttributes).then(
			(scrapedValues) =>
				scrapedValues.reduce(
					(currAttributes, { attr, selector, values }) => ({
						...currAttributes,
						[attr]: { selector, values },
					}),
					{}
				)
		);

		await page.close();

		return { url, pageAttributes };
	});

	const missionFindings = await Promise.all(pendingMissionFindings);
	await browser.close();

	const results = missionFindings.reduce(
		(currIntel, { url, pageAttributes }) => ({
			...currIntel,
			[url]: pageAttributes,
		}),
		{}
	);

	return {
		statusCode: 200,
		body: {
			response: JSON.stringify(results),
			event,
			context,
		},
	};
};
