# Virtual Assistant - Personal Project

This web application is a personal project designed to simulate interactions with a virtual assistant. Users can ask questions and receive tailored responses, making it ideal for practicing and enhancing knowledge, such as preparing for exams like the ISTQB Foundation.

## Features

- **Interactive Chat**: Communicate with a virtual assistant via a simple web interface.
- **Knowledge Simulation**: Ideal for testing knowledge or simulating exam-like questions.
- **Tailored Responses**: The assistant provides contextual and relevant answers based on user input.

---

## Installation

1. Install the dependencies
```bash
npm install
```
or
```bash
yarn install
```

2. Create a .env file at the root of the project with your OpenAI API key:
```yaml
OPENAI_API_KEY=your_api_key_here
ASSISTANT_ID=your_assistant_id
```

3. Run the application locally with hot-reloading:

```bash
npm start
```
or
```bash
yarn start
```

## Dependencies

	•	Parcel: Bundler for fast builds and development.
	•	TypeScript: Ensures type safety and better code maintainability.
	•	dotenv: Manages environment variables.
	•	OpenAI API: Used to power the virtual assistant responses.

## Roadmap

	•	Add more interaction features (e.g., saving chat history).
	•	Improve response quality with additional AI tuning.
	•	Enhance the UI for a more user-friendly experience.

License

This is a personal project and is not licensed for commercial use. For inquiries, feel free to contact the author.