const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

const TABLE_PREFIX = process.env.DB_TABLE_PREFIX || 'nbs_';

let pool = null;
let sqliteDb = null;
let useSQLite = false;

function initPool() {
  if (pool || sqliteDb) return;

  const dbHost = process.env.DB_HOST || '192.169.147.255';
  const dbUser = process.env.DB_USER || 'MEAZHA';
  const dbPassword = process.env.DB_PASSWORD || 'dZYRYi(o(0*U';
  const dbName = process.env.DB_NAME || 'le_test';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  if (dbHost && dbUser && dbName) {
    try {
      const sslOption = (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1')
        ? { rejectUnauthorized: false }
        : undefined;

      pool = mysql.createPool({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPassword || '',
        database: dbName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 12000,
        ssl: sslOption,
      });
      console.log(`[Database] Initialized MySQL pool for "${dbName}" with table prefix "${TABLE_PREFIX}"`);
    } catch (err) {
      console.warn(`[Database] MySQL pool creation failed: ${err.message}. Falling back to SQLite...`);
      initSQLite();
    }
  } else {
    console.log(`[Database] MySQL credentials incomplete. Initializing SQLite...`);
    initSQLite();
  }
}

function initSQLite() {
  try {
    const sqlite3 = require('sqlite3').verbose();
    useSQLite = true;
    const dataDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {
        /* directory exists */
      }
    }
    const dbPath = path.join(dataDir, 'local_dev.sqlite');
    sqliteDb = new sqlite3.Database(dbPath);
    console.log(`[Database] Connected to SQLite database at "${dbPath}" with table prefix "${TABLE_PREFIX}"`);
  } catch (e) {
    console.error(`[Database] SQLite fallback initialization error:`, e.message);
  }
}

async function query(sql, params = []) {
  initPool();

  if (useSQLite && sqliteDb) {
    return new Promise((resolve, reject) => {
      const trimmed = sql.trim().toUpperCase();
      if (trimmed.startsWith('SELECT') || trimmed.startsWith('SHOW')) {
        sqliteDb.all(sql, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        });
      } else {
        sqliteDb.run(sql, params, function (err) {
          if (err) return reject(err);
          resolve({ insertId: this ? this.lastID : 0, affectedRows: this ? this.changes : 0 });
        });
      }
    });
  }

  if (!pool) {
    throw new Error('Database pool could not be initialized.');
  }

  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    if ((err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ER_ACCESS_DENIED_ERROR') && !useSQLite) {
      console.warn(`[Database] MySQL connection error (${err.code}). Switching to SQLite database...`);
      initSQLite();
      if (useSQLite && sqliteDb) {
        return query(sql, params);
      }
    }
    throw err;
  }
}

async function initTables() {
  initPool();

  const usersTable = `${TABLE_PREFIX}users`;
  const leadsTable = `${TABLE_PREFIX}leads`;
  const convsTable = `${TABLE_PREFIX}conversations`;
  const msgsTable = `${TABLE_PREFIX}messages`;
  const projTable = `${TABLE_PREFIX}projects`;
  const servTable = `${TABLE_PREFIX}services`;

  if (useSQLite && sqliteDb) {
    await query(`
      CREATE TABLE IF NOT EXISTS ${usersTable} (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${leadsTable} (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT,
        email TEXT,
        location TEXT,
        property_type TEXT,
        project_type TEXT,
        property_size TEXT,
        rooms TEXT,
        design_style TEXT,
        budget TEXT,
        timeline TEXT,
        requirements TEXT,
        lead_score INTEGER DEFAULT 0,
        lead_status TEXT DEFAULT 'Enquired',
        lead_tier TEXT DEFAULT 'COLD',
        source TEXT DEFAULT 'Design Concierge',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${convsTable} (
        id TEXT PRIMARY KEY,
        lead_id TEXT,
        session_id TEXT UNIQUE NOT NULL,
        summary TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(lead_id) REFERENCES ${leadsTable}(id) ON DELETE CASCADE
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${msgsTable} (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        seq INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(conversation_id) REFERENCES ${convsTable}(id) ON DELETE CASCADE
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${projTable} (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        location TEXT,
        category TEXT,
        size_sqft TEXT,
        year TEXT,
        hero_image TEXT,
        gallery TEXT,
        concept TEXT,
        materials TEXT,
        design_approach TEXT,
        challenges TEXT,
        result TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${servTable} (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        order_index INTEGER DEFAULT 0
      );
    `);
  } else {
    // MySQL CREATE TABLE statements
    await query(`
      CREATE TABLE IF NOT EXISTS ${usersTable} (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${leadsTable} (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(120),
        phone VARCHAR(20),
        email VARCHAR(255),
        location VARCHAR(120),
        property_type VARCHAR(80),
        project_type VARCHAR(80),
        property_size VARCHAR(80),
        rooms VARCHAR(120),
        design_style VARCHAR(120),
        budget VARCHAR(80),
        timeline VARCHAR(80),
        requirements TEXT,
        lead_score INT DEFAULT 0,
        lead_status ENUM('Enquired', 'Pending', 'Confirmed', 'Completed', 'Reject') DEFAULT 'Enquired',
        lead_tier ENUM('HOT', 'WARM', 'COLD') DEFAULT 'COLD',
        source VARCHAR(80) DEFAULT 'Design Concierge',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${convsTable} (
        id VARCHAR(36) PRIMARY KEY,
        lead_id VARCHAR(36),
        session_id VARCHAR(120) UNIQUE NOT NULL,
        summary TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES ${leadsTable}(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${msgsTable} (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        seq INT DEFAULT 0,
        created_at DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
        FOREIGN KEY (conversation_id) REFERENCES ${convsTable}(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${projTable} (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(160) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(120),
        category VARCHAR(80),
        size_sqft VARCHAR(80),
        year VARCHAR(20),
        hero_image VARCHAR(255),
        gallery TEXT,
        concept TEXT,
        materials TEXT,
        design_approach TEXT,
        challenges TEXT,
        result TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ${servTable} (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(160) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        order_index INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  console.log(`[Database] All nbs_ tables verified with prefix "${TABLE_PREFIX}"`);
}

module.exports = {
  query,
  initTables,
  initDB: initTables,
  TABLE_PREFIX,
};
