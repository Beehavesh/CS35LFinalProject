# CS35LFinalProject

Tech Stack: 
    Frontend:
        React, HTML, SCSS
    Backend:
        Node.js, Express, MongoDB, Render
    Tests:
        Cucumber, Playwright
    External:
        Google Firebase
We're using npm to manage dependencies. 
The website can be viewed by running "npm init" and then "npm run dev" in the /frontend folder. 
It runs on localhost:5173 in the browser.
The backend database uses MongoDB.
Posts are tracked in json format.
The database is live - it's been published using render: https://cs35lfinalproject.onrender.com
Tests are done using cucumber and playwright.
To run cucumber tests: npx cucumber-js 

Here are our dependencies: 
- Backend:
	"cors": "^2.8.5",
    "express": "^5.1.0",
    "firebase-admin": "^13.6.0",
    "mongoose": "^9.0.0"

 Frontend:
  "dependencies": {
    "antd": "^6.0.0",
    "firebase": "^9.23.0",
    "localforage": "^1.10.0",
    "match": "^1.2.11",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-google-button": "^0.8.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "react-toastify": "^11.0.5",
    "sass": "^1.94.2",
    "sort-by": "^1.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }

  Testing:
  {
  "devDependencies": {
    "@cucumber/cucumber": "^12.2.0",
    "@playwright/test": "^1.57.0",
    "playwright": "^1.57.0"
  }
}



