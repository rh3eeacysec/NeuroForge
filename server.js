const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log('Database not connected:', err.message);
  } else {
    console.log('MySQL Connected!');
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'NeuroForge API is running!' });
});

app.post('/api/user', (req, res) => {
  const { name, unique_id, agent_name, agent_img } = req.body;
  const sql = 'INSERT INTO users (name, unique_id, agent_name, agent_img) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE agent_name=?, agent_img=?';
  db.query(sql, [name, unique_id, agent_name, agent_img, agent_name, agent_img], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'User saved!' });
  });
});

app.post('/api/score', (req, res) => {
  const { unique_id, world, level_completed, total_xp } = req.body;
  const sql = 'INSERT INTO scores (unique_id, world, level_completed, total_xp) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE level_completed=?, total_xp=?';
  db.query(sql, [unique_id, world, level_completed, total_xp, level_completed, total_xp], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get('/api/leaderboard', (req, res) => {
  const sql = `
  SELECT u.name, u.unique_id, u.agent_name, SUM(s.total_xp) as total_xp 
  FROM users u 
  JOIN (
    SELECT unique_id, world, MAX(total_xp) as total_xp 
    FROM scores 
    GROUP BY unique_id, world
  ) s ON u.unique_id = s.unique_id 
  GROUP BY u.unique_id 
  ORDER BY total_xp DESC 
  LIMIT 10
`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/progress/:unique_id', (req, res) => {
  const sql = 'SELECT * FROM scores WHERE unique_id = ?';
  db.query(sql, [req.params.unique_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/hint', async (req, res) => {
  const { scenario } = req.body;
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{
          role: 'user',
          content: 'You are a cybersecurity training AI agent. Give a SHORT hint (1-2 sentences max) for this scenario without giving away the answer: ' + scenario
        }],
        max_tokens: 100
      })
    });
    const data = await response.json();
    res.json({ hint: data.choices[0].message.content });
  } catch (err) {
    res.json({ hint: 'Think carefully about the security implications of each choice.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
