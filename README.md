# LLM Commander

LLM Commander is a **Next.js application** that provides a user interface for comparing responses from multiple Large Language Models (LLMs).  
It uses the **Genkit AI framework** to orchestrate AI flows, including prompt optimization and querying various LLM providers.

---

## 🚀 Key Features

- **Prompt Engineering**: An AI flow refines your raw natural language prompts to improve the quality of LLM responses.  
- **Multi-LLM Querying**: Easily send your optimized prompt to different LLMs (e.g., Gemini, OpenAI, Claude) and view the responses side-by-side.  
- **Theming**: Includes light and dark mode support with a customizable Tailwind CSS theme.  

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version **18.18.0** or newer)  
- npm (or another package manager like Yarn or pnpm)  

---

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/llm-commander.git
cd llm-commander
````

Install dependencies:

```bash
npm install
```

---

### ⚙️ Environment Setup

Create a `.env` file in the root of the project.
Add your API keys for the LLMs you want to use. You'll need to obtain these from their respective providers (e.g., **Google AI Studio, OpenAI, Anthropic**).

Example:

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
CLAUDE_API_KEY=YOUR_CLAUDE_API_KEY
```

---

## ▶️ Usage

### Development

Start the **Next.js development server**:

```bash
npm run dev
```

Start the **Genkit AI server** for local development and testing of your AI flows:

```bash
npm run genkit:dev
```

---

### Production Build

Build the application for deployment:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
