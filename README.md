# 📱 LSWS Android App (WebView)

## 🏢 About the Project
**LSWS Android App** is a WebView-based Android application built for **LSWS**, a non-profit organization.  
The system is designed to efficiently manage member records, handle donations, store documents, and automate organizational communication.

The core application is a **Vue-based web platform**, deployed on **Firebase Hosting** and wrapped inside an **Android app using WebView** for mobile accessibility.

---

## ✨ Key Features

### 👥 Member Management
- Maintain complete member records
- Fast and efficient member search functionality

### 📄 Document Management
- Upload and store member-related documents securely
- Centralized document access for administrators

### 💳 Donation & Receipt Management
- Enter donation/payment details
- Automatic receipt generation after donation entry
- Receipt details stored for future reference

### 📧 Automated Emailers (Node.js)
Automated email workflows implemented using **Node.js with Nodemailer**:
- 🎂 Birthday email notifications
- 🧾 Donation receipt emails
- 📬 Additional automated communication workflows

All emails are triggered securely via backend logic, keeping credentials and business rules off the frontend.

### 📱 Android App Deployment
- Web application deployed as an Android app using **WebView**
- No separate mobile frontend required
- Consistent experience across web and Android

---

## 🛠 Tech Stack

### 🌐 Frontend
- **Vue.js**

### 🗄 Database
- **Firebase Firestore**

### ⚙ Backend (Automation & Email)
- **Node.js**
- **Nodemailer**
- Firebase Admin SDK (for secure Firestore access)

### 🚀 Deployment
- **Firebase Hosting** (Web App)
- **Android Studio** (Android App using WebView)

