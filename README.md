LLM Commander
LLM Commander is a Next.js application for comparing responses from multiple Large Language Models (LLMs). It leverages the Genkit AI framework to handle prompt optimization and orchestrate queries across various LLM providers like OpenAI, Gemini, and Claude.
🚀 Key Features
Prompt Engineering
Automatically refines raw natural language prompts to improve the quality of LLM responses.
Multi-LLM Querying
Send a single, optimized prompt to multiple LLMs (e.g., OpenAI, Gemini, Claude) and compare their responses side-by-side.
Theming
Includes both light and dark mode, powered by a customizable Tailwind CSS theme.
🛠️ Getting Started
Prerequisites
Node.js v18.18.0 or newer
npm, Yarn, or pnpm
Installation
Clone the repository
git clone https://github.com/your-username/llm-commander.git
cd llm-commander
Install dependencies
npm install
Set up environment variables
Create a .env file in the root directory.
Add your API keys for the LLM providers:
GOOGLE_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key
🔐 API keys must be obtained from the respective platforms (e.g., Google AI Studio, OpenAI, Anthropic).
🧪 Usage
Start Development Servers
Next.js App
npm run dev
Genkit AI Flow Server
npm run genkit:dev
Build for Production
npm run build
npm run start
📄 License
MIT — Feel free to use, modify, and distribute this project.