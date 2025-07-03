python -m backend.app


cd frontend 
npm start





# Getting Started with Create React App


# Build the Docker image
docker build -t feedback-backend .

# Run the backend container
docker run -p 5000:5000 feedback-backend









# 🧠 Lightweight Feedback System

A simple, structured internal feedback tool for managers and employees.

---

## ✅ Features

- 🔐 Role-based login: Manager and Employee
- 📝 Managers submit structured feedback (Strengths, Areas to Improve, Sentiment)
- 📜 Feedback history per employee
- 👀 Employees can view and acknowledge feedback
- 📊 Manager dashboard (coming soon)

---

## ⚙️ Tech Stack

| Layer       | Stack                   |
|-------------|-------------------------|
| Frontend    | React.js (Vite)         |
| Backend     | Flask (Python)          |
| Database    | SQLite (Default)        |
| API Format  | REST (JSON)             |
| Container   | Docker for backend      |

---

## 🚀 Getting Started

### 🧩 Backend Setup (Docker Recommended)

```bash
cd wait/backend

# Build and run
docker build -t feedback-backend .
docker run -p 5000:5000 feedback-backend







 Feedback System

A lightweight internal feedback platform where managers submit structured feedback for employees.  
Employees can view and acknowledge feedback via a clean UI.

---

## 🚀 Features

- 👥 User Roles: Manager & Employee
- 🔐 Secure Signup & Login
- 📋 Manager gives structured feedback (Strengths, Improvements, Sentiment)
- 👀 Employees view feedback and acknowledge it
- 📊 Manager sees team-wide sentiment trends
- 🐳 Dockerized backend setup
- 💾 SQLite database for easy local use

---

## 🧱 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React, React Router, Axios     |
| Backend    | Flask, SQLAlchemy, Marshmallow |
| Database   | SQLite                         |
| Dev Tools  | Docker, Postman                |

---

## ⚙️ Setup Instructions

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/feedback-system.git
cd feedback-system
✅ 2. Start Backend (Flask API)
Option A: Run Locally (No Docker)
bash
Copy
Edit
cd backend
pip install -r requirements.txt
python app.py
✅ Backend will be live at: http://localhost:5000/api

Option B: Using Docker
bash
Copy
Edit
cd backend
docker build -t feedback-backend .
docker run -p 5000:5000 feedback-backend
✅ 3. Start Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
✅ Frontend will be available at: http://localhost:3000

📦 Dependencies
📌 Backend → backend/requirements.txt
txt
Copy
Edit
Flask
flask-cors
flask-sqlalchemy
flask-marshmallow
marshmallow-sqlalchemy
Werkzeug
📌 Frontend → frontend/package.json (only important dependencies)
json
Copy
Edit
"dependencies": {
  "axios": "^1.10.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.3",
  "react-scripts": "5.0.1"
}
Install them with:

bash
Copy
Edit
cd frontend
npm install
🐳 Dockerfile (for Flask Backend)
📁 backend/Dockerfile

dockerfile
Copy
Edit
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "-m", "backend.app"]
🧪 Sample Test Users
Manager
json
Copy
Edit
{
  "username": "manager1",
  "email": "manager@example.com",
  "password": "test123",
  "role": "manager"
}
Employee
json
Copy
Edit
{
  "username": "deepa",
  "email": "deepa@example.com",
  "password": "test123",
  "role": "employee"
}
🔁 API Reference
Method	Route	Description
POST	/api/signup	Register new user
POST	/api/login	Login and return user info
GET	/api/employees	Get list of employees (manager)
POST	/api/feedback	Submit feedback (manager)
PUT	/api/feedback/<id>	Edit feedback
PATCH	/api/feedback/<id>/acknowledge	Acknowledge feedback (employee)
GET	/api/employee/<id>/feedbacks	Get feedback list for employee

📹 Demo Videos (Insert Links Before Submission)
🎥 Demo Video

💻 Code Walkthrough

🙌 Created By
Rakshitha Thirthakar
✨ Submission for Technical Interview

yaml
Copy
Edit

---

### ✅ Now What?

- Paste this into `README.md`
- Save it in your project root
- Commit and push to GitHub:

```bash
git add README.md
git commit -m "Add complete README with setup, APIs, and instructions"
git push




CHECK THIS ALSO FOR BETTER UNDERSTANDING


✅ 1. frontend/ – React App Setup
📁 Go to: frontend/
In terminal:

bash
Copy
Edit
cd frontend
📦 Install these npm packages:
bash
Copy
Edit
npm install react-router-dom axios
These are essential for routing and making API requests.

If the frontend folder was already created using create-react-app, other packages like react, react-dom, react-scripts are already there.

You can confirm by checking your package.json — you should see:

json
Copy
Edit
"dependencies": {
  "axios": "^1.10.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.3"
}
✅ 2. backend/ – Flask API Setup
📁 Go to: backend/
In terminal:

bash
Copy
Edit
cd ../backend
📦 Install these Python packages (locally):
If you're not using Docker, install using pip:

bash
Copy
Edit
pip install flask flask-cors flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy werkzeug
💡 To save these into requirements.txt:

bash
Copy
Edit
pip freeze > requirements.txt
If you're using Docker: the requirements.txt should contain:

txt
Copy
Edit
Flask
flask-cors
flask-sqlalchemy
flask-marshmallow
marshmallow-sqlalchemy
Werkzeug
✅ Recap: Folder Structure and Where to Run
pgsql
Copy
Edit
project-root/
│
├── frontend/          ← React app
│   ├── src/
│   ├── package.json
│   └── (run: npm install here)
│
├── backend/           ← Flask app
│   ├── app.py
│   ├── routes.py
│   ├── models.py
│   ├── Dockerfile      ✅ Docker build from here
│   └── requirements.txt
✅ Run Commands Summary
🟢 Start React frontend
bash
Copy
Edit
cd frontend
npm install
npm start
🟠 Start Flask backend (locally)
bash
Copy
Edit
cd ../backend
python app.py
🐳 OR Start Flask backend using Docker
bash
Copy
Edit
docker build -t feedback-backend .
docker run -p 5000:5000 feedback-backend
Let me know if you’d like a .sh setup script, or help deploying this.
Want me to help you create the README.md for your GitHub too?















This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
