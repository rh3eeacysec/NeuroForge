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
    const response = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-01`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
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

app.post('/api/generate-mission', async (req, res) => {
  const { world, level, difficulty } = req.body;
  try {
    const response = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-01`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: `You are a cybersecurity training mission generator for NeuroForge.

WORLD: ${world}
LEVEL: ${level}
DIFFICULTY: ${difficulty}

STRICT RULES:
- Generate ONLY topics specific to the ${world} world (see below)
- As level increases make scenarios MORE complex, twisted and harder to identify
- At high levels add red herrings, misleading details, and make wrong answers tempting
- NEVER generate the same scenario twice — always pick a different topic each time
- Every scenario must feel unique, realistic and surprising
- Make the player think hard — do not make the correct answer obvious

WORLD-SPECIFIC TOPICS (ONLY use topics for the assigned world):

SECURITY WORLD topics: social engineering, insider threats, physical security breaches, shoulder surfing, USB drop attacks, tailgating, dumpster diving, vishing calls, deepfake impersonation, SIM swapping, business email compromise, rogue devices, badge cloning, clean desk policy violations, pretexting, whaling attacks, quid pro quo attacks

CLOUD WORLD topics: S3 bucket misconfigurations, IAM privilege escalation, cloud storage exposure, serverless function vulnerabilities, container escape, Kubernetes misconfiguration, cloud API key exposure, shadow IT in cloud, cross-account attacks, cloud logging gaps, misconfigured CDN, public snapshots, insecure cloud functions, cloud metadata service abuse, overpermissioned service accounts

LOGIC WORLD topics: SQL injection variants, IDOR vulnerabilities, XSS attacks, CSRF, XXE injection, SSRF, buffer overflow, race conditions, broken authentication, JWT vulnerabilities, API rate limiting bypass, GraphQL introspection attacks, deserialization flaws, path traversal, open redirect, prototype pollution, HTTP request smuggling

INCIDENT RESPONSE topics: ransomware containment, data exfiltration detection, brute force response, DDoS mitigation, supply chain compromise, lateral movement detection, zero-day response, cryptojacking detection, DNS poisoning response, man-in-the-middle detection, log tampering, memory forensics, network segmentation during attack, threat hunting, forensic evidence preservation

DIFFICULTY SCALING:
- EASY (levels 1-10): Clear scenario, obvious red flags, straightforward correct answer, no red herrings
- MEDIUM (levels 11-25): Subtle clues, requires domain knowledge, one tempting wrong answer, some ambiguity
- HARD (levels 26-40): Complex multi-step scenario with red herrings, multiple plausible answers, requires expert thinking, misleading context
- EXTREME (levels 41-50): Highly sophisticated attack chain, very misleading context, wrong answers sound extremely convincing, requires deep expertise, even security professionals would second-guess themselves

Return ONLY valid JSON, no extra text, no markdown:
{
  "title": "MISSION TITLE IN CAPS",
  "url": "HTTPS://CORP.INTERNAL/RELEVANT-PATH",
  "objective": "One precise objective line",
  "scenario": "2-3 sentences — realistic, detailed, world-specific scenario with enough detail to make it genuinely challenging",
  "choices": [
    {"text": "Choice 1", "correct": false, "feedback": "Detailed explanation of why this is wrong"},
    {"text": "Choice 2", "correct": true, "feedback": "Detailed explanation of why this is correct"},
    {"text": "Choice 3", "correct": false, "feedback": "Detailed explanation of why this is wrong"},
    {"text": "Choice 4", "correct": false, "feedback": "Detailed explanation of why this is wrong"}
  ]
}`
        }],
        max_tokens: 700
      })
    });
    const data = await response.json();
    const text = data.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    const mission = JSON.parse(clean);
    res.json(mission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate mission' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});