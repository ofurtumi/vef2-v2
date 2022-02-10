import { readFile } from 'fs/promises';
import pg from 'pg';
import dotenv from 'dotenv';

const SCHEMAFILE = './sql/schema.sql';
const DROPFILE = './sql/drop.sql';
const INSERT = './sql/insert.sql';

dotenv.config();

const { DATABASE_URL: connectionString, NODE_ENV: nodeEnv = 'development' } =
	process.env;

if (!connectionString) {
	console.error('vantar DATABASE_URL í .env');
	process.exit(-1);
}

const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;
const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
	console.error('Villa kom upp við tengingu', err);
	process.exit(-1);
});

export async function insert({
	name, description,
  } = {}) {
	let success = true;

	const slug = name.replaceAll(" ", "-")
  
	const now = new Date();
	const q = `
	  INSERT INTO events
		(name, slug, description, created, modified)
	  VALUES
		($1, $2, $3, $4, $5);
	`;
	const values = [name, slug, description, now, now ];
  
	try {
	  await query(q, values);
	} catch (e) {
	  console.error('Error inserting signature', e);
	  success = false;
	}
  
	return success;
  }

export async function query(q, values = []) {
	let client;
	try {
		client = await pool.connect();
	} catch (e) {
		console.error('cannot get client from pool', e);
		return null;
	}

	try {
		const result = await client.query(q, values);
		return result;
	} catch (e) {
		if (nodeEnv !== 'test') {
			console.error('unable to query', e);
		}
		return null;
	} finally {
		client.release();
	}
}

export async function createSchema(schemaFile = SCHEMA_FILE) {
	const data = await readFile(schemaFile);

	return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
	const data = await readFile(dropFile);

	return query(data.toString('utf-8'));
}

export async function end() {
	await pool.end();
}
