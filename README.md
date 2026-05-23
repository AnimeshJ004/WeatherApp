[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-00C7B7?style=for-the-badge&logo=vercel)](https://weather-app-seven-henna-76.vercel.app/)

Weather App 🌦️
A simple and clean web application that fetches and displays the current weather and atmospheric conditions for any city. Users can search for a location and get real-time weather data.

🚀 Live Demo
Check out the live deployed version here: (https://weather-app-seven-henna-76.vercel.app/)
## 📸 Screenshots
<img width="1365" height="598" alt="Screenshot 2026-05-23 195059" src="https://github.com/user-attachments/assets/70d6fb54-3a23-4178-9a35-ac0100038f33" />
<img width="1365" height="592" alt="Screenshot 2026-05-23 195048" src="https://github.com/user-attachments/assets/dcd28bd5-57ba-4e42-9d2d-6522744e9d21" />

✨ Features
Search by City: Enter any city name in the search bar.
Real-time Data: Fetches live data from the Gemini API.
Key Weather Metrics: Displays the current temperature, "feels like" temperature, humidity, wind speed, and a description of the atmosphere (e.g., "Clouds," "Clear," "Rain").
Clean UI: A simple, responsive, and easy-to-use interface.
Error Handling: Provides feedback if the city is not found.
💻 Technologies Used
HTML5
CSS3 (You can add: e.g., vanilla CSS, Tailwind CSS, Bootstrap)
JavaScript (ES6+)
Gemini for fetching weather data.
🛠️ How to Run Locally
To get a local copy up and running, follow these simple steps.

Prerequisites
You will need a free API key from Name of Your API Provider, e.g., OpenWeatherMap.

Installation
Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
Navigate to the project directory:

cd your-repo-name
(If you used Node.js/React/Vite, add this step): Install NPM packages:

npm install
Add your API Key:

(Describe where to put the API key. For example:)
Create a file named config.js and add: const API_KEY = 'YOUR_API_KEY_HERE';
...or...
In the script.js file, find the apiKey variable and replace "YOUR_KEY" with your actual API key.
...or...
Create a .env file and add: VITE_API_KEY=YOUR_API_KEY_HERE
Run the application:

(If it's a simple HTML/CSS/JS project):
Open the index.html file in your browser.
...or...
(If it's a Node.js/React/Vite project):
npm run dev
