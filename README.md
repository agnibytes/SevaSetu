# ⚡ The Friction

A farmer in rural Maharashtra spends three days traveling to a district office just to find out he brought the wrong photocopy for a drought relief scheme. A student in Punjab gives up on a scholarship because the portal crashes upon checkout. Millions of hours are burned in the friction between a citizen needing help and a government trying to provide it. 

The internet was supposed to fix this. Usually, it just added a captcha and an expired session token.

# 🧭 What is SevaSetu?

SevaSetu is a civic-tech interface built to eliminate the waiting room. It’s a unified, multilingual portal that connects citizens directly to government schemes, verifies their identity instantly, and gives them an AI copilot to navigate bureaucratic mazes. It’s not just rendering forms on a screen; it’s an attempt to make the state actually accessible.

# 🔥 The Real Problem

- **Fragmented Truths:** Every department has its own portal, its own login, and its own broken password recovery system.
- **Language Barriers:** Essential services are locked behind English or highly formal state languages.
- **Blind Navigation:** Citizens don't know what they're eligible for until they stumble upon it or pay a middleman to tell them.
- **The Black Hole of Grievances:** Complaints are filed into the void with zero transparency on resolution.

# 🧠 The Design Philosophy

Build for the edge cases. Design for a user who might only have a low-end Android phone, patchy 3G, and prefers speaking over typing. The architecture assumes failure is likely and attention is scarce. Everything must be fast, verifiable, and brutally straightforward. No dead ends.

# 🧩 What SevaSetu Actually Does

- **Speaks their language:** Instantly localizes the entire interface across 9 regional languages.
- **Tokens identity:** Simulates DigiLocker integration to convert Aadhaar and PAN into verified, reusable session trust.
- **Bypasses passwords:** Uses OTP-based authentication because no one remembers their password for a portal they use twice a year.
- **Matches intent to schemes:** Surfaces applicable government programs based on verified citizen profiles.
- **Listens and talks back:** Integrates Maytri, a built-in AI assistant, alongside speech-to-text workflows for frictionless navigation.
- **Escalates failures:** Provides a direct, structured grievance submission pipeline straight to the authorities.

# 🛠 The Stack

- **React + Vite:** Because the UI needs to be exceptionally fast and capable of localized state manipulation without full page reloads.
- **Flask (Python):** Python is the lingua franca of data and AI. Flask keeps the routing thin, fast, and unopinionated while we handle complex logic.
- **MongoDB:** Citizen data is inherently unstructured and variable. A document database prevents us from fighting migrations every time a new scheme introduces a weird edge case.
- **JWT & bcrypt:** Stateless, tokenized trust. The server shouldn't remember you; the cryptography should prove it.
- **Framer Motion:** Micro-interactions aren't just for flair; they provide necessary visual feedback to users who might be unfamiliar with digital interfaces.

# 🧱 How the System Really Works

1. **The Handshake:** A citizen drops their mobile number. The Flask backend spins up a temporary OTP session in MongoDB. 
2. **The Verification:** Once the OTP clears, the system issues a JWT. The frontend caches this token and immediately hits the identity endpoints. 
3. **The Vault:** Simulated DigiLocker endpoints lock in Aadhaar/PAN details. The citizen goes from "anonymous number" to "verified state actor."
4. **The Routing:** The React frontend fetches `/schemes/applicable`. The backend queries MongoDB, matching the user's verified profile against active government programs.
5. **The Safety Net:** If the user gets stuck, they hit the `/maytri/chat` endpoint. The AI intercepts the confusion, parses keywords, and steers them to the right route or grievance form.

# ⚙️ Run It Locally

```bash
# 1. Clone the weapon
git clone https://github.com/your-username/SevaSetu2.git
cd SevaSetu2

# 2. Spin up the backend (Flask)
python -m venv venv
source venv/bin/activate
pip install Flask flask-cors pymongo python-dotenv bcrypt PyJWT
python app.py  # boots on :5001

# 3. Ignite the frontend (Vite)
cd frontend
npm install
npm run dev    # boots on :5173
```

# 🗂 Inside the Machine

```text
SevaSetu2/
├── app.py                  # The central brain. Routing, auth, and DB logic grouped for velocity.
├── .env                    # Secrets and connection strings (bring your own MongoDB).
└── frontend/               # The nervous system.
    ├── index.html          # Entry point.
    ├── package.json        # Frontend manifest.
    └── src/
        ├── api/            # Axial connections to the Flask backend.
        ├── components/     # Reusable UI organs (Sidebar, NoticePanel, AI Chat).
        ├── pages/          # Full-screen views (Dashboard, Login, Schemes).
        └── index.css       # Global styling and tailwind/css overrides.
```

# 🌱 Where This Can Grow Next

- **Real DigiLocker OAuth:** Swap the simulated verification for production India Stack APIs.
- **LLM-Powered Maytri:** Replace the keyword matcher with a localized vector database and an LLM to accurately interpret complex citizen queries in their native dialects.
- **Offline Sync:** Implement Service Workers to allow citizens to fill forms offline and sync when they hit a network cell.
- **Predictive Eligibility:** Proactively SMS citizens when a new scheme drops that they actually qualify for.

# 🧑‍💻 Who Should Contribute

If you're a student developer who is tired of building another to-do list or Netflix clone, start here. If you've been to a hackathon and wanted to build something that actually solves a real problem, dig into the codebase. 

We need people who understand UX, people who can wire up proper LLM pipelines, and people who can optimize React rendering. Check the `Issues` tab, find something labeled `good first issue`, and push code. 

# 🪪 License

MIT License. Tear it apart, build upon it, and use it to fix things.
