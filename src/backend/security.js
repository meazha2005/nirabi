const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, TABLE_PREFIX } = require('../db/mysql');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_nirabi_design_studio_2026_vercel';

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
}

function createAccessToken(subject) {
  return jwt.sign({ sub: subject }, JWT_SECRET, { expiresIn: '7d' });
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = {
  verifyPassword,
  hashPassword,
  createAccessToken,
  verifyAccessToken,
  JWT_SECRET,
};
