#!/usr/bin/env node

/**
 * Create an admin user for the dashboard.
 *
 * Usage:
 *   node scripts/create-admin.js
 *
 * You'll be prompted for username, display name, and password.
 * Or pass them as env vars:
 *   ADMIN_USER=admin ADMIN_PASS=yourpassword ADMIN_NAME="Gabby B" node scripts/create-admin.js
 */

require('dotenv').config();

const bcrypt = require('bcryptjs');
const readline = require('readline');
const db = require('../db/database');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log('\n--- Gabby B Dashboard: Create Admin User ---\n');

  const username = process.env.ADMIN_USER || await ask('Username: ');
  const displayName = process.env.ADMIN_NAME || await ask('Display name: ');
  const password = process.env.ADMIN_PASS || await ask('Password (min 8 chars): ');

  if (!username || !displayName || !password) {
    console.error('All fields are required.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  // Check if user already exists
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    console.error(`User "${username}" already exists.`);
    process.exit(1);
  }

  // Hash password with bcrypt (12 rounds)
  const hash = bcrypt.hashSync(password, 12);

  db.prepare(
    'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)'
  ).run(username, hash, displayName, 'admin');

  console.log(`\nAdmin user "${username}" created successfully.`);
  console.log('You can now log in at the dashboard.\n');

  rl.close();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
