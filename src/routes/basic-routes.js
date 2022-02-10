import express from 'express';

import { findByUsername } from '../users.js';
import { getAllEvents, getSingleEvent } from '../events.js';

export const router = express.Router();

async function index(req, res) {
	const title = 'Blessaður Aumingi, enginn réttindi fyrir þig??';
	const validated = false;
	const events = await getAllEvents();

	return res.render('index', {
		title,
		validated,
		events,
	});
}

async function eventPage(req, res) {
	const { slug } = req.params;

	const eventDetails = await getSingleEvent(slug);
	const details = eventDetails[0];

	let cDate = new Date(details.created);
	cDate = cDate.toUTCString();
	
	let mDate = new Date(details.modified);
	mDate = mDate.toUTCString();
	console.log(mDate);

	console.log(details.name);
	res.render('single-event', { title: details.name, details, cDate, mDate });
}

async function login(req, res) {
	const { testname } = req.body;
	return res.render('login', { title: 'asdf síðan baby', testname });
}

router.get('/', index);
router.get('/:slug', eventPage);
router.get('/login', login);
