Here’s a **clean, professional, industry-level README** you can directly use 👇

---

# 🚀 Salesforce Validation Rule Switcher

A full-stack web application that integrates **React.js** with **Salesforce APIs** using **OAuth 2.0**. This project enables users to securely authenticate with Salesforce, retrieve validation rules, and simulate toggling their active state through a modern dashboard interface.

---

## 📌 Overview

This application demonstrates real-world integration with Salesforce by leveraging:

* **OAuth 2.0 authentication**
* **Salesforce REST API**
* **Tooling API**

It provides an interactive UI for managing validation rules and visualizing Salesforce data efficiently.

---

## ✨ Features

* 🔐 **Secure Salesforce Login** via OAuth 2.0
* 📊 **Fetch Account Records** from Salesforce
* ⚙️ **Retrieve Validation Rules** using Tooling API
* 🔄 **Toggle Validation Rules** (Active / Inactive - simulated)
* 🚀 **Deployment Simulation** for rule updates
* 🔍 **Search & Filter** functionality
* 🎨 **Modern Dashboard UI** with smooth user experience
* ⏳ **Loading States & UX Enhancements**
* 🌐 **Live Deployment on Netlify**

---

## 🛠️ Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | React.js                             |
| Backend/API | Salesforce REST API, Tooling API     |
| Auth        | OAuth 2.0 (Salesforce Connected App) |
| Deployment  | Netlify                              |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/afreedsk/SalesforceAssignment.git
cd salesforce-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Update your Salesforce credentials in `App.js`:

```javascript
const CLIENT_ID = "YOUR_CONSUMER_KEY";
const REDIRECT_URI = "http://localhost:3000";
```

---

### 4️⃣ Run the Application

```bash
npm start
```

---

### 5️⃣ Build for Production

```bash
npm run build
```

---

## 🔐 Salesforce Configuration

To enable authentication and API access:

1. Create a **Connected App** in Salesforce
2. Enable **OAuth Settings**
3. Add Callback URLs:

   ```
   http://localhost:3000
   https://your-netlify-app.netlify.app
   ```
4. Add OAuth Scopes:

   * `api`
   * `refresh_token`

---

## ⚠️ Important Notes

* Salesforce does **not directly support enabling/disabling validation rules via REST API**
* This project uses the **Tooling API** for demonstration purposes
* Rule toggling is **simulated** as part of assignment requirements

---

## 🌐 Live Demo

👉 [https://stunning-pie-ae7c2f.netlify.app/](https://stunning-pie-ae7c2f.netlify.app/)

---

## 📂 Repository

👉 [https://github.com/afreedsk/SalesforceAssignment](https://github.com/afreedsk/SalesforceAssignment)

---

## 👨‍💻 Author

**Shaik Afreed**
📧 afreedsk247@gmail.com
📱 +91 6303083316

---

## ⭐ Acknowledgement

This project was developed as part of the **CloudVandana Associate Software Engineer Assignment**, showcasing Salesforce integration and modern frontend development practices.

---

## 📄 License

This project is for educational and demonstration purposes.


