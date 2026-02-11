const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_PATH = path.join(dataDir, 'dashboard.db');

// sql.js wrapper that provides a better-sqlite3-compatible API
// so the rest of the codebase doesn't need to change.
class DatabaseWrapper {
  constructor() {
    this._db = null;
    this._ready = false;
  }

  async init() {
    const SQL = await initSqlJs();
    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      this._db = new SQL.Database(buffer);
    } else {
      this._db = new SQL.Database();
    }
    this._ready = true;
    this._setupTables();
    return this;
  }

  _save() {
    const data = this._db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }

  _setupTables() {
    this._db.run('PRAGMA foreign_keys = ON');
    this._db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        display_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        last_login TEXT
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        inquiry_type TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        ip_address TEXT,
        user_agent TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);
      CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
      CREATE INDEX IF NOT EXISTS idx_submissions_is_read ON submissions(is_read);
    `);
    this._save();
  }

  // Mimic better-sqlite3's db.prepare(sql) API
  prepare(sql) {
    const db = this._db;
    const save = () => this._save();

    return {
      // Return single row as object or undefined
      get(...params) {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        let result;
        if (stmt.step()) {
          const columns = stmt.getColumnNames();
          const values = stmt.get();
          result = {};
          columns.forEach((col, i) => { result[col] = values[i]; });
        }
        stmt.free();
        return result;
      },

      // Return all rows as array of objects
      all(...params) {
        const results = [];
        const stmt = db.prepare(sql);
        stmt.bind(params);
        while (stmt.step()) {
          const columns = stmt.getColumnNames();
          const values = stmt.get();
          const row = {};
          columns.forEach((col, i) => { row[col] = values[i]; });
          results.push(row);
        }
        stmt.free();
        return results;
      },

      // Execute and return { changes, lastInsertRowid }
      run(...params) {
        db.run(sql, params);
        const changes = db.getRowsModified();
        const lastRow = db.exec('SELECT last_insert_rowid() as id');
        const lastInsertRowid = lastRow.length > 0 ? lastRow[0].values[0][0] : 0;
        save();
        return { changes, lastInsertRowid };
      },
    };
  }

  exec(sql) {
    this._db.exec(sql);
    this._save();
  }

  pragma(str) {
    this._db.run(`PRAGMA ${str}`);
  }
}

// Create and initialize synchronously using a top-level await workaround.
// The db is initialized before the server starts (see server.js).
const wrapper = new DatabaseWrapper();

module.exports = wrapper;
