# NeuroForge 🧠⚡

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=22&pause=1000&color=00F0FF&center=true&vCenter=true&width=500&lines=FORGE+YOUR+MIND.+DEFEND+THE+FUTURE." alt="NeuroForge Tagline" />
</p>

<p align="center">
<img src="https://img.shields.io/badge/Microsoft-Agents%20League%20Hackathon%202026-blue?style=for-the-badge&logo=microsoft" alt="Microsoft" />
<img src="https://img.shields.io/badge/Track-Creative%20Apps-purple?style=for-the-badge" alt="Track" />
<img src="https://img.shields.io/badge/Powered%20by-Foundry%20IQ-cyan?style=for-the-badge&logo=microsoft" alt="Foundry IQ" />
<img src="https://img.shields.io/badge/Hosted%20on-Azure-blue?style=for-the-badge&logo=microsoftazure" alt="Azure" />
<img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-green?style=for-the-badge&logo=github" alt="Live Demo" />
<img src="https://img.shields.io/badge/Built%20with-GitHub%20Copilot-black?style=for-the-badge&logo=githubcopilot" alt="GitHub Copilot" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

---

> *Cybersecurity isn't learned by reading static slides. It's learned by making critical decisions under pressure.*

**NeuroForge** is an immersive, gamified cybersecurity training and simulation platform where players navigate **200 dynamic, AI-generated missions** across four distinct digital worlds. 

Following official **Microsoft Agents League architectural design patterns**, NeuroForge completely decouples the presentation interface from execution logic. The platform utilizes an autonomous **Microsoft Foundry Agent** as the central decision-making "Brain" to handle multi-step Socratic reasoning and contextual evaluation, while a lightweight, high-performance **Vanilla JavaScript rendering engine** acts as the deterministic interactive shell. Every mission is born live, maintaining stateful context so that no two training sessions are ever the same.

---

## 🎬 Demo Media

> 📹 [Watch the Full Platform Demo Video →](https://youtu.be/bbBCNoikGEA?si=pmOrTLuMxZ42T2xk)
>  
> 🌐 [Launch the Production Web App →](https://rh3eeacysec.github.io/NeuroForge)

---

## 🌍 The Four Tactical Worlds

Each world maps to a core cybersecurity domain, featuring 50 progressive levels scaling seamlessly from **EASY** to **EXTREME**.

| World | Domain | Threat Focus & Grounding Parameters |
|:--- |:--- |:--- |
| 🔐 **Security World** | Human Attack Surface | Social engineering, SIM swapping, deepfake impersonation, insider threats, phishing vectors. |
| ☁️ **Cloud World** | Cloud Infrastructure | S3 misconfigurations, IAM privilege escalation, exposed API keys, container escapes. |
| ⚡ **Logic World** | Technical Vulnerabilities | SQL injection, XSS, IDOR, JWT vulnerabilities, broken authentication, SSRF boundaries. |
| 🔥 **Incident Response World** | Live Attack Scenarios | Ransomware containment, lateral movement detection, DDoS mitigation, live forensics. |

---

## ✨ Core Features & Agentic Architecture

### 🤖 Autonomous Socratic Agent — Powered by Microsoft Foundry IQ
Rather than serving static text or basic single-prompt API strings, NeuroForge is driven by an autonomous **Microsoft Foundry Agent** executing over **Azure OpenAI (gpt-35-turbo)**. The agent rejects primitive text generation models; instead, it acts as an adaptive, adversarial NPC instructor that functions as the underlying "brain" of the application—maintaining sequential memory, evaluating player proficiency, and dynamically constructing world states across multiple turns:

* **Context-Aware Scenario Generation:** The agent evaluates the player's active world space, current level, and structural difficulty parameters to generate unique corporate scenarios, realistic pseudo-URLs, and complex choice matrices.
* **Dynamic Blast Radius Modeling:** For every incorrect choice a player makes, the agent evaluates the stateful payload, computes the exact operational impact, and explains the downstream risk to teach real-world consequences.
* **Adaptive Scaling & Red Herrings:** At advanced stages (Levels 41–50), the agent intentionally introduces deceptive red herrings and highly plausible wrong answers to test deep, context-aware analytical reasoning.

### 💡 Multi-Step Hint Orchestration
When a player requests assistance, the Foundry Agent dynamically switches operational tracks to generate a Socratic nudge. Instead of giving away the solution, the agent processes the active code-level scenario context and provides an iterative, guided clue. Hints are delivered live into the Agent Terminal interface workspace, with an automated fallback trigger firing after 30 seconds of player inactivity to ensure continuous engagement.

### 🔌 Model Context Protocol (MCP) Server — GitHub Copilot Integration
NeuroForge extends its agentic capabilities directly into production developer environments via a custom **Model Context Protocol (MCP) Server**. This architecture exposes the training engine as a live, tool-using AI system inside **GitHub Copilot in VS Code**, allowing engineers to query the autonomous agent directly from their terminal workspace via JSON-RPC over stdio.

| Tool Name | Input Schema | System Description |
|:--- |:--- |:--- |
| `get_mission` | `{ "world": "string", "difficulty": "string" }` | Signals the Foundry Agent to build a live AI security mission directly inside Copilot Chat. |
| `get_hint` | `{ "scenario_context": "string" }` | Orchestrates an inline Socratic hint for an active code-level threat or vulnerability. |
| `get_leaderboard` | `none` | Fetches the real-time top 10 global player standings as a cleanly aligned Markdown table. |

### 🏆 Live Anti-Farming Leaderboard & Player Progression
Player progression states and XP metrics are instantly committed to a persistent MySQL instance. To ensure competitive integrity, the scoring pipeline runs an optimized nested aggregation query that isolates the `MAX(XP)` per world per unique player before computing the absolute global sum, preventing users from farming repetitive low-level loops.

| System Badge | XP Required | Operational Status |
|:--- |:---: |:--- |
| 🩶 **Recruit** | 0+ | Base Tier Initialization |
| 🟣 **Incident Responder** | 500+ | Junior Defender Status |
| 🔵 **Phishing Hunter** | 1,000+ | Tactical Human Surface Auditor |
| 🟢 **Firewall Guard** | 2,000+ | Network Perimeter Analyst |
| 🟡 **Security Agent** | 5,000+ | Certified Infrastructure Architect |
| 🟠 **Threat Analyst** | 10,000+ | Advanced System Penetration Engineer |
| 🔴 **Cyber Commander** | 25,000+ | Strategic Security Operations Lead |
| 💀 **NeuroForge Legend** | 57,000 | **100% Mastery Complete (All 200 Conquered)** 🌟 |

---

## 🏗️ System Architecture & Runtime Topology

NeuroForge enforces strict topological isolation between deterministic presentation layers and non-deterministic agentic runtimes. The structural communication flows across the application stack are mapped out below:

<p align="center">
  <img src="architecture-diagram.jpeg" alt="NeuroForge Production System Architecture Topology Map" width="100%" />
</p>

### Technical Technology Stack Matrix

| Layer | Target Technology | Operational System Function |
|:--- |:--- |:--- |
| **Frontend UI** | HTML5, CSS3, Vanilla JS, Tailwind CSS | Deterministic UI shell, terminal feeds, and state rendering. |
| **Backend Gateway**| Node.js, Express.js Framework | Core API gateway, payload serialization, and request routing. |
| **Database Sheet** | MySQL (Hosted via Aiven) | Global state persistence, score security, and nested aggregations. |
| **AI Intelligence**| Microsoft Foundry IQ Engine | Autonomous Agent brain, multi-turn reasoning, and context tracker. |
| **Client Hosting** | GitHub Pages | High-availability deployment for static presentation layers. |
| **Server Hosting** | Render Cloud Infrastructure | Secure application environments with isolated runtime execution. |
| **Ecosystem Bridge**| MCP Protocol Specification | System tool injection via JSON-RPC interfaces over stdio. |
| **AI-Assisted Dev** | GitHub Copilot | Structural layout scaffolding and query optimization partner. |

---

## 🧠 XP & Difficulty System Parameters

| Levels | Difficulty | XP per Mission | Cognitive Parameters & Threat Layout |
|:--- |:---: |:---: |:--- |
| 1–10 | **EASY** | 100 XP | Explicit vulnerability vectors, obvious operational red flags. |
| 11–25 | **MEDIUM** | 200 XP | Obscured threat variables, requires foundational domain knowledge. |
| 26–40 | **HARD** | 350 XP | Compounding architectural vectors, structured adversarial herrings. |
| 41–50 | **EXTREME** | 500 XP | Sophisticated multi-step attack chains, deeply deceptive choices. |

**Maximum XP per world: 14,250 | Maximum total platform XP: 57,000**

---

## 🔌 Core API Reference

| Endpoint | Method | Payload Structural Body | System Action Description |
|:--- |:---: |:--- |:--- |
| `/api/generate-mission` | POST | `{ "world": "str", "level": int, "difficulty": "str" }` | Signals the Foundry Agent to build and serve a new scenario. |
| `/api/hint` | POST | `{ "current_context": "string" }` | Invokes the agent's Socratic track subsystem for an active mission. |
| `/api/score` | POST | `{ "player_id": "str", "world": "str", "xp": int }` | Sanitizes and commits individual persistence logs to MySQL. |
| `/api/leaderboard` | GET | `none` | Executes the multi-world nested aggregation for the top 10 players. |
| `/api/user` | POST | `{ "name": "string", "identity_id": "string" }` | Provisions or synchronizes global player profiles. |
| `/api/progress/:id` | GET | `none` | Retrieves historical world completion states for a given profile. |

---

## 🚀 Local Deployment Lifecycle

### Prerequisites
* Node.js (v22.x or higher)
* Accessible MySQL Instance
* Active Azure OpenAI Deployment (Configured for Foundry IQ access)

### Installation & Server Initialization

```bash
# Clone the target source repository
git clone [https://github.com/rh3eeacysec/NeuroForge.git](https://github.com/rh3eeacysec/NeuroForge.git)
cd NeuroForge/neuroforge-backend

# Install required package dependencies
npm install

# Configure local environment isolation
# Create a secure .env file within the root backend directory:
# AZURE_OPENAI_KEY=your_secure_azure_api_key
# AZURE_OPENAI_ENDPOINT=[https://your-endpoint.openai.azure.com/](https://your-endpoint.openai.azure.com/)
# AZURE_OPENAI_DEPLOYMENT=your-target-deployment-name
# DB_HOST=your-database-hostname
# DB_USER=your-database-username
# DB_PASSWORD=your-database-password
# DB_NAME=neuroforge
# DB_PORT=3306

# Start the local runtime environment thread
npm start

```

Launch `index.html` in your local browser environment or serve via an explicit static provider to interface directly with your active local backend routing loop.

---

## 🤖 GitHub Copilot Utilization Log

GitHub Copilot acted as an active pair programmer to accelerate development, enforce resilient patterns, and optimize the following modules:

* **Relational Schema Design:** Assisted in designing the normalization scheme for MySQL, implementing composite unique keys, and structuring thread-safe `ON DUPLICATE KEY UPDATE` blocks.
* **SQL Query Optimization:** Co-engineered the complex nested aggregation script used to isolate the highest score per unique user across separate domains before evaluating the global total, preventing database race conditions.
* **Express Middleware Architecture:** Generated resilient, isolated route handlers with structural error catches across all core endpoints to manage payload abnormalities.
* **Deterministic UI Construction:** Accelerated the development of the Vanilla JS rendering module, ensuring smooth DOM insertion for dynamic options, automated terminal logs, and progress rings.
* **Immersive Cyberpunk Styling:** Streamlined the injection of Tailwind utilities to build highly thematic interfaces, including glassmorphic overlays, retro terminal scanlines, and animated glitch indicators.
* **Fault-Tolerance Pipelines:** Designed an exponential backoff retry engine to cleanly intercept and manage cold starts on free tier hosting services without dropping client state.

---

## 🏆 Hackathon Evaluation Matrix Alignment

| Evaluation Category | Total Weight | Practical Execution & Metrics in NeuroForge | Current Status |
| --- | --- | --- | --- |
| **Accuracy & Relevance** | 20% | Fully meets Creative Apps requirements. Foundry IQ deeply integrated as the core mission and hint engine. GitHub Copilot used throughout. MCP server exposes NeuroForge inside VS Code. | **100% Implemented** |
| **Reasoning & Multi-step Thinking** | 20% | High-fidelity prompt-chain sequencing: input parameters → domain containment → adversarial generation → impact calculation. Multi-turn Socratic hints act as a secondary contextual layer. | **100% Implemented** |
| **Creativity & Originality** | 15% | Reimagines traditional training assets as a live simulation. The synergy between an immersive cyberpunk terminal UI and an inline IDE editor tool provider creates a unique UX loop. | **100% Implemented** |
| **User Experience & Presentation** | 15% | High-fidelity visual styling featuring dynamic terminal feeds, real-time XP accumulation, interactive scaling rings, and modular glassmorphic design. Playable immediately. | **100% Implemented** |
| **Reliability & Safety** | 20% | Zero-tolerance key policy. Secrets isolated within production environment blocks. Exponential backoff retry architecture shields the interface from cold start service disruptions. | **100% Implemented** |
| **Community Engagement** | 10% | Highly shareable, gamified interactive concept that provides tangible engineering utility to developers directly inside their active IDEs. | **100% Implemented** |

---

## 🔒 Security Operations & Policy Enforcement

* **✅ Token Security:** Zero live access tokens, secrets, configuration properties, or credentials reside within this public code history.
* **✅ Environmental Isolation:** The configuration system strictly requires standard `.env` separation, matching local entries in the `.gitignore` mapping array.
* **✅ PII Safety:** Zero user profile tracking logs or system data indices are collected or saved. Profiles are mapped via voluntary display handles and randomized tracker keys.
* **✅ Compliance Guardrails:** All analysis structures adhere to ethical disclosure concepts. For vulnerabilities or disclosure procedures, please refer to the official [Microsoft Security Policy](https://aka.ms/SECURITY.md).

---

## 👩‍💻 About the Engineer

Hi, I'm **Rhea Prajapati** — a cybersecurity and digital forensics student building at the intersection of defensive infrastructure, automated security intelligence, and modern web systems.

My academic and practical focus centers on application security (AppSec), cloud infrastructure defense, API threat mitigation, secure code architecture, and agentic AI integration. I believe true technical mastery isn't gained by reading static reference material—it is forged by making high-stakes decisions, analyzing subsequent failures, and understanding the complete blast radius of an exploit. NeuroForge was engineered to bring that exact operational pressure into a modern, accessible educational environment.

**Core Areas of Focus:**

* 🔐 Threat Analysis & Incident Response
* ☁️ Cloud Architecture & IAM Hardening
* 🌐 Web Application Security Auditing
* 🔌 Secure API Design Patterns
* 🤖 Agentic AI Implementation & MCP Development
* ⚔️ Penetration Testing & Vulnerability Research

---

## 👤 Project Metadata

* **Author:** Rhea Prajapati
* **Microsoft Learn Profile:** Rhea-8387
* **GitHub Code Repository:** @rh3eeacysec
* **Target Event:** Developed exclusively for the Microsoft Agents League Hackathon 2026 — Creative Apps Challenge Track
* **Core Accelerators:** Powered by Microsoft Foundry IQ and Accelerated via GitHub Copilot

*Two hundred distinct missions. Four isolated worlds. Zero static duplicates. Because threats change in an instant. Forge your mind. Defend the future.*
