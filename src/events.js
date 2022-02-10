import { insert, query } from './lib/db.js';

export async function createEvent(req, res) {
	const { name, description } = req.body;

	console.info('insert', { name, description }, 'into events');
	let success = true;

	try {
		success = await insert({ name, description });
	} catch (e) {
		console.error(e);
	}
	if (success) {
		return res.redirect('/admin');
	}
}

export async function getAllEvents() {
	let events = [];

	try {
		const q = 'SELECT id,name,slug,description FROM events;';
		const queryResult = await query(q);

		if (queryResult && queryResult.rows) {
			events = queryResult.rows;
		}
	} catch (error) {
		console.error('Error getting events', error);
	}

	// console.log(events);
	return events;
}

export async function getSingleEvent(slug) {
	let details = [];

	try {
		const queryResult = await query(
			'SELECT * FROM events WHERE slug = $1',
			[slug]
		);

		if (queryResult && queryResult.rowCount === 1) {
			details = queryResult.rows;
		}
	} catch (e) {
		console.error('Error selecting signatures', e);
	}

	return details;
}
