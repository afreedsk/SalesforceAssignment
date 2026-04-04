# 🚀 Salesforce Validation Rule Switcher

A full-stack integration project that connects a React web application with Salesforce using OAuth 2.0. This app allows users to log in, fetch validation rules, and toggle their active state dynamically.

---

## 🔥 Features

- 🔐 Login with Salesforce (OAuth 2.0)
- 📊 Fetch Account records from Salesforce
- ⚙️ Fetch Validation Rules using Tooling API
- 🔄 Toggle Validation Rules (Active / Inactive)
- 🚀 Deploy changes (simulation)
- 🔍 Search & Filter validation rules
- 🎨 Professional dashboard UI
- ⏳ Loading spinner & smooth UX
- 🌐 Deployed on Netlify

---

## 🛠️ Tech Stack

- Frontend: React.js
- Backend/API: Salesforce REST API + Tooling API
- Authentication: OAuth 2.0 (Salesforce Connected App)
- Deployment: Netlify

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/afreedsk/SalesforceAssignment
cd .\salesforce-app\

2️⃣ Install Dependencies
npm install


---------------------------

3️⃣ Update Credentials

Edit App.js:

const CLIENT_ID = "YOUR_CONSUMER_KEY";
const REDIRECT_URI = "http://localhost:3000";

4️⃣ Run Application
npm start

5️⃣ Build for Production
npm run build

🔐 Salesforce Configuration
Create a Connected App
Enable OAuth Settings
Add Callback URL:
http://localhost:3000
https://your-netlify-app.netlify.app

Add OAuth Scopes:
api
refresh_token

⚠️ Important Notes
Salesforce does not directly allow enabling/disabling validation rules via REST API.
Tooling API is used for demonstration.
Deployment is simulated for assignment purposes.

🌐 Live Demo
👉 https://stunning-pie-ae7c2f.netlify.app/

📂 GitHub Repository
👉 https://github.com/afreedsk/SalesforceAssignment

🙋‍♂️ Author
Shaik Afreed
📧 afreedsk247@gmail.com
📱 6303083316


⭐ Acknowledgement
This project was developed as part of the CloudVandana Associate Software Engineer assignment.
