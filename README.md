### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL on Aiven |
| AI | Microsoft Foundry IQ — Azure OpenAI gpt-35-turbo |
| Frontend Hosting | GitHub Pages |
| Backend Hosting | Render |
| MCP Integration | Model Context Protocol Server |
| AI-Assisted Dev | GitHub Copilot |

---

## 🧠 XP & Difficulty System

| Levels | Difficulty | XP per Mission | Description |
|--------|-----------|---------------|-------------|
| 1-10 | EASY | 100 XP | Clear scenarios, obvious red flags |
| 11-25 | MEDIUM | 200 XP | Subtle clues, requires domain knowledge |
| 26-40 | HARD | 350 XP | Red herrings, multiple plausible answers |
| 41-50 | EXTREME | 500 XP | Sophisticated attack chains, deeply misleading |

**Maximum XP per world: 14,250 | Maximum total XP: 57,000**

---

## 🔌 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate-mission` | POST | Generate AI mission via Foundry IQ |
| `/api/hint` | POST | Get Socratic hint via Foundry IQ |
| `/api/score` | POST | Save player score to MySQL |
| `/api/leaderboard` | GET | Fetch top 10 players |
| `/api/user` | POST | Register/update player profile |
| `/api/progress/:id` | GET | Fetch player progress |

---

## 🚀 Local Setup

### Prerequisites
- Node.js 22.x
- MySQL database
- Azure OpenAI deployment (Foundry IQ)

### Installation

```bash
# Clone the repository
git clone https://github.com/rh3eeacysec/NeuroForge.git
cd NeuroForge/neuroforge-backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with the following:
# AZURE_OPENAI_KEY=your-key
# AZURE_OPENAI_ENDPOINT=your-endpoint
# AZURE_OPENAI_DEPLOYMENT=your-deployment
# DB_HOST=your-db-host
# DB_USER=your-db-user
# DB_PASSWORD=your-db-password
# DB_NAME=neuroforge
# DB_PORT=3306

# Start the server
npm start
```

Open `index.html` in your browser or serve the frontend files directly.

---

## 🤖 GitHub Copilot Usage

GitHub Copilot was used extensively throughout the entire build of NeuroForge:

- **MySQL schema design** — table structure, composite unique keys, ON DUPLICATE KEY UPDATE patterns
- **SQL aggregation logic** — nested query for leaderboard MAX/SUM across worlds
- **Express route architecture** — all five API route handlers
- **MCP tool definitions** — three tool definitions with input schemas and formatted markdown responses
- **Mission rendering pipeline** — dynamic DOM generation for choices, terminal feed, result panel
- **Cyberpunk UI system** — scanline overlays, hologram panels, glitch animations, glassmorphism effects
- **Retry engine** — exponential backoff for Render cold starts
- **Difficulty scaling prompt** — the world-specific prompt engineering that prevents topic repetition

---

## 🏆 Judging Criteria Alignment

| Criterion | Weight | How NeuroForge Delivers |
|-----------|--------|------------------------|
| **Accuracy & Relevance** | 20% | Fully meets Creative Apps requirements. Foundry IQ deeply integrated as the core mission and hint engine. GitHub Copilot used throughout. MCP server exposes NeuroForge inside VS Code. |
| **Reasoning & Multi-step Thinking** | 20% | AI prompt chain: world → level → difficulty → topic enforcement → scenario generation → choice generation → feedback generation. Hint system adds a second reasoning layer per mission. |
| **Creativity & Originality** | 15% | A novel gamified cybersecurity platform with AI-generated missions. Cyberpunk aesthetic, agent identity system, and MCP integration make it genuinely unique. |
| **User Experience & Presentation** | 15% | Full cyberpunk UI with hologram panels, scanlines, agent terminal feed, XP bar, progress rings. Deployed live. Playable by judges immediately. |
| **Reliability & Safety** | 20% | No credentials in repo. Retry engine handles Render cold starts. UptimeRobot keeps backend alive 24/7. Azure trial covers full competition period. |
| **Community Vote** | 10% | Shareable concept — "play a cybersecurity game powered by AI" is immediately compelling to developers. |

---

## 🔒 Security

- ✅ No API keys or credentials committed to this repository
- ✅ All secrets managed via environment variables on Render
- ✅ `.env` is gitignored
- ✅ No customer PII stored beyond player-chosen names and self-assigned IDs
- ✅ No confidential or proprietary information in this repository

Please do not report security vulnerabilities through public GitHub issues. See [Microsoft Security Policy](https://aka.ms/SECURITY.md).

---

## 👩‍💻 About the Creator

Hi, I'm **Rhea Prajapati** — a cybersecurity and cloud security student who builds projects at the intersection of security, AI, and modern web technologies.

I'm currently focused on application security, cloud security, API security, ethical hacking, and AI-powered security solutions. I believe the best way to learn cybersecurity is through hands-on experience — which is exactly why NeuroForge exists. Complex security concepts shouldn't live in textbooks. They should be lived through decisions, consequences, and pressure.

**My areas of interest:**

- 🔐 Cybersecurity & Digital Forensics
- ☁️ Cloud Security
- 🌐 Web Application Security
- 🔌 API Security
- 🤖 AI in Security
- ⚔️ Ethical Hacking
- 🛡️ Secure Software Development

*Always learning. Always building. Always securing.*

---

## 👤 Author

**Rhea Prajapati**
Microsoft Learn: `Rhea-8387`
GitHub: [@rh3eeacysec](https://github.com/rh3eeacysec)

Built for **Microsoft Agents League 2026** — Creative Apps Track
Powered by **Microsoft Foundry IQ**

---

> *Two hundred missions. Four worlds. Zero repeated questions.*
> *Because every mission is born in the moment you need it.*
>
> **Forge your mind. Defend the future.**
