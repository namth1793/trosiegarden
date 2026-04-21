const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 5013;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'xnk.db');
if (!fs.existsSync(dbPath)) {
  require('./db/seed.js');
}

const db = new Database(dbPath);

// Products
app.get('/api/products', (req, res) => {
  const { category, limit } = req.query;
  let query = 'SELECT * FROM products';
  const params = [];
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  query += ' ORDER BY created_at DESC';
  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit));
  }
  res.json(db.prepare(query).all(...params));
});

app.get('/api/products/:slug', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  const categories = db.prepare('SELECT DISTINCT category, COUNT(*) as count FROM products GROUP BY category').all();
  const labels = {
    'arabica': 'Arabica',
    'robusta': 'Robusta',
    'specialty': 'Đặc Sản',
    'xay': 'Cà Phê Xay',
    'hoa-tan': 'Hòa Tan',
    'xanh': 'Nhân Xanh',
    'cascara': 'Cascara',
    'chon': 'Cà Phê Chồn',
  };
  res.json(categories.map(c => ({ ...c, label: labels[c.category] || c.category })));
});

// News
app.get('/api/news', (req, res) => {
  const { category, limit } = req.query;
  let query = 'SELECT id, title, slug, category, summary, image, author, created_at FROM news';
  const params = [];
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  query += ' ORDER BY created_at DESC';
  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit));
  }
  res.json(db.prepare(query).all(...params));
});

app.get('/api/news/:slug', (req, res) => {
  const article = db.prepare('SELECT * FROM news WHERE slug = ?').get(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json(article);
});

// Banners
app.get('/api/banners', (req, res) => {
  res.json(db.prepare('SELECT * FROM banners ORDER BY sort_order').all());
});

// Contact
app.post('/api/contacts', (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
  }
  const result = db.prepare(
    'INSERT INTO contacts (name, email, phone, company, subject, message) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(name, email, phone || '', company || '', subject || '', message);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.get('/api/contacts', (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

app.listen(PORT, () => {
  console.log(`✅ TROSIE GARDEN Backend running on http://localhost:${PORT}`);
});
