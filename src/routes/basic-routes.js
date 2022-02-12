import express from 'express';

import { findByUsername } from '../users.js';
import { getAllEvents, getSingleEvent } from '../events.js';

export const router = express.Router();

async function index(req, res) {
	const title = 'Daginn';
	const validated = req.isAuthenticated();
	const events = await getAllEvents();

	return res.render('index', {
		title,
		validated,
		events,
	});
}

async function eventPage(req, res) {
	const { slug } = req.params;

	let data = false;

	try {
		const eventDetails = await getSingleEvent(slug);
		const details = eventDetails[0];

		let cDate = new Date(details.created);
		cDate = cDate.toUTCString();

		let mDate = new Date(details.modified);
		mDate = mDate.toUTCString();
		
		data = true;

		res.render('single-event', {
			title: details.name,
			data,
			details,
			cDate,
			mDate,
		});
	} catch (error) {
		console.error('Unable to get data corresponding to this slug,', error);
		res.render("error",{ title:"síða fannst ekki"});
	}
}

async function login(req, res) {
	const { testname } = req.body;
	return res.render('login', { title: 'asdf síðan baby', testname });
}

router.get('/', index);
router.get('/:slug', eventPage);
router.get('/login', login);
