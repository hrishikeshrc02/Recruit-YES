

---

# Recruit-YES

Recruit-YES is a job portal application built using the MERN stack. It also leverages the OpenAI API to provide an AI chatbot for enhanced user interaction and assistance.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Prerequisites](#prerequisites)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

Recruit-YES is a modern job portal that connects job seekers with employers. It features a user-friendly interface and utilizes an AI chatbot powered by OpenAI's LLM to assist users in navigating the portal, finding jobs, and more.

## Technologies Used

- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Frontend**: ReactJS, Redux
- **AI Chatbot**: OpenAI API

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/recruit-yes.git
    cd recruit-yes
    ```

2. **Install dependencies:**
    ```bash
    npm i
    ```

3. **Navigate to the client directory and start the frontend:**
    ```bash
    cd client
    npm start
    ```

## Usage

Once the installation is complete, you can use Recruit-YES by navigating to `http://localhost:3000` in your web browser. The AI chatbot will be available to assist you with your queries and navigation through the job portal.

## Prerequisites

Before running the project, ensure you have the following:

- **JWT Secret Key**: Generate a secret key for JWT authentication.
- **API Key**: Obtain your OpenAI API key from [OpenAI](https://openai.com).
- **MongoDB URL**: A MongoDB connection string.

Add these credentials to your environment variables:

```bash
export JWT_SECRET_KEY=your_jwt_secret_key
export OPENAI_API_KEY=your_openai_api_key
export MONGO_URL=your_mongo_url
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please reach out to [your email address].

---

Feel free to modify any section as per your specific requirements or preferences.
