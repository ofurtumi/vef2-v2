import express from 'express';

import { createEvent, getAllEvents } from '../events.js';

export const router = express.Router();

async function index(req, res) {
	const title = 'Blessaður admin';
	const validated = true;
	const events = await getAllEvents();

	return res.render('index', {
		title,
		validated,
		events,
	});
}

router.get('/', index);

router.post('/', createEvent);

router.post('/login', (req, res) => {
	res.redirect('/');
	console.log('req --> ' + req.body.testname);
});
