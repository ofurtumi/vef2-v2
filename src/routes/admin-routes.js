import express from 'express';
import passport from 'passport';

import { createEvent, getAllEvents, getSingleEvent } from '../events.js';
import { ensureLoggedIn } from '../login.js';
import { catchErrors } from '../utils.js';

export const router = express.Router();

function login(req, res) {
	console.log('req.isAuthenticated() --> ' + req.isAuthenticated());
	if (req.isAuthenticated()) {
		return res.redirect('/admin');
	}

	let message = '';

	// Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
	// og hreinsum skilaboð
	if (req.session.messages && req.session.messages.length > 0) {
		message = req.session.messages.join(', ');
		req.session.messages = [];
	}

	return res.render('login', { message, title: 'Innskráning' });
}

async function index(req, res) {
	const title = 'Blessaður admin';
	const validated = req.isAuthenticated();
	const events = await getAllEvents();

	return res.render('index', {
		title,
		validated,
		events,
	});
}

async function adminEventPage(req, res) {
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

		console.log(details.name);
		if (req.isAuthenticated()) {
			res.render('admin-single-event', {
				title: details.name,
				data,
				details,
				cDate,
				mDate,	
			})
		}
		else {
			res.redirect('/');
		}
	} catch (error) {
		console.error('Unable to get data corresponding to this slug,', error);
		res.render('error', { title: 'síða fannst ekki' });
	}
}

router.get('/', ensureLoggedIn, catchErrors(index));
router.get('/login', login);

router.post('/', createEvent);

router.post(
	'/login',

	// Þetta notar strat að ofan til að skrá notanda inn
	passport.authenticate('local', {
		failureMessage: 'Notandanafn eða lykilorð vitlaust.',
		failureRedirect: '/admin/login',
	}),

	// Ef við komumst hingað var notandi skráður inn, senda á /admin
	(req, res) => {
		res.redirect('/admin');
	}
);

router.get('/logout', (req, res) => {
	// logout hendir session cookie og session
	req.logout();
	res.redirect('/');
});

router.get('/:slug', adminEventPage);
