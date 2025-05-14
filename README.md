# 🔍 AI-Powered Search & Response System

An intelligent and lightweight system that uses the **Mistral AI API** to process natural language queries and deliver smart, context-aware responses — without the need for a database.
<video src="Ai-search-response-system (1).mp4" controls width="600"></video>
## 🚀 Features

- 🤖 Query understanding with Mistral AI
- 💬 Natural language response generation
- ⚡ Fast and lightweight – no database required
- 🔌 Easy to integrate into web or mobile applications
- 🔐 Secure API communication with environment-based config

## 📌 Use Cases

- Smart Q&A bots
- AI-powered search interfaces
- Voice assistant backends
- Real-time conversational agents

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (or Flutter if used in mobile)
- **Backend:** Node.js (with `@mistralai/mistralai` SDK)
- **AI Model:** Mistral AI via API (e.g., `mistral-small`, `mistral-medium`, etc.)

## 🧪 How It Works

1. User enters a query in natural language.
2. The backend receives the query and forwards it to the Mistral API.
3. Mistral processes the prompt and returns a language-based response.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-search-response-system.git
cd ai-search-response-system

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
# Add your Mistral API key to the .env file

# Start the backend
npm start
