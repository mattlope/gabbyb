const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// ===== PUBLIC: Form submission endpoint =====

// POST /api/submissions — create new submission (public, from the main site)
router.post('/submissions', (req, res) => {
  const { name, email, inquiry_type, message } = req.body;

  // Validate required fields
  if (!name || !email || !inquiry_type || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Sanitize inputs — trim and limit length
  const clean = {
    name: String(name).trim().slice(0, 200),
    email: String(email).trim().slice(0, 254),
    inquiry_type: String(inquiry_type).trim().slice(0, 100),
    message: String(message).trim().slice(0, 5000),
  };

  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = String(req.headers['user-agent'] || '').slice(0, 500);

  try {
    const result = db.prepare(
      'INSERT INTO submissions (name, email, inquiry_type, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(clean.name, clean.email, clean.inquiry_type, clean.message, ip, userAgent);

    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// ===== PROTECTED: Dashboard endpoints =====

// GET /api/submissions — list all submissions
router.get('/submissions', requireAuth, (req, res) => {
  const { status, is_read, search, limit = 50, offset = 0 } = req.query;

  let query = 'SELECT * FROM submissions WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (is_read !== undefined) {
    query += ' AND is_read = ?';
    params.push(parseInt(is_read));
  }

  if (search) {
    query += ' AND (name LIKE ? OR email LIKE ? OR message LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  // Get total count
  const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
  const { total } = db.prepare(countQuery).get(...params);

  // Get paginated results
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  const submissions = db.prepare(query).all(...params);

  // Get unread count
  const { unread } = db.prepare('SELECT COUNT(*) as unread FROM submissions WHERE is_read = 0').get();

  res.json({ submissions, total, unread });
});

// GET /api/submissions/:id — get single submission
router.get('/submissions/:id', requireAuth, (req, res) => {
  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }
  res.json(submission);
});

// PATCH /api/submissions/:id — update submission (mark read, change status)
router.patch('/submissions/:id', requireAuth, (req, res) => {
  const { is_read, status } = req.body;
  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  if (is_read !== undefined) {
    db.prepare('UPDATE submissions SET is_read = ? WHERE id = ?').run(is_read ? 1 : 0, req.params.id);
  }

  if (status) {
    const validStatuses = ['new', 'contacted', 'in_progress', 'closed_won', 'closed_lost'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    db.prepare('UPDATE submissions SET status = ? WHERE id = ?').run(status, req.params.id);
  }

  const updated = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/submissions/:id — delete submission
router.delete('/submissions/:id', requireAuth, (req, res) => {
  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  db.prepare('DELETE FROM submissions WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// GET /api/stats — dashboard overview stats
router.get('/stats', requireAuth, (req, res) => {
  const totalSubmissions = db.prepare('SELECT COUNT(*) as count FROM submissions').get().count;
  const unreadSubmissions = db.prepare('SELECT COUNT(*) as count FROM submissions WHERE is_read = 0').get().count;
  const thisWeek = db.prepare(
    "SELECT COUNT(*) as count FROM submissions WHERE created_at >= datetime('now', '-7 days')"
  ).get().count;
  const thisMonth = db.prepare(
    "SELECT COUNT(*) as count FROM submissions WHERE created_at >= datetime('now', '-30 days')"
  ).get().count;

  // Submissions by type
  const byType = db.prepare(
    'SELECT inquiry_type, COUNT(*) as count FROM submissions GROUP BY inquiry_type ORDER BY count DESC'
  ).all();

  // Submissions by status
  const byStatus = db.prepare(
    'SELECT status, COUNT(*) as count FROM submissions GROUP BY status ORDER BY count DESC'
  ).all();

  // Recent submissions (last 5)
  const recent = db.prepare(
    'SELECT id, name, email, inquiry_type, is_read, created_at FROM submissions ORDER BY created_at DESC LIMIT 5'
  ).all();

  res.json({
    total: totalSubmissions,
    unread: unreadSubmissions,
    this_week: thisWeek,
    this_month: thisMonth,
    by_type: byType,
    by_status: byStatus,
    recent,
  });
});

module.exports = router;
