# 📱 LSWS Member App (WebView + Firebase)

> Full-featured member and donation management app for LSWS non-profit. Vue.js web app deployed as Android WebView with Firebase backend, automated emailers, and receipt management.

**📱 Mobile App** | **👥 Member Management** | **💳 Donation Processing** | **🤖 Automated Emails** | **☁️ Firebase**

---

## Overview

**LSWS Member App** is a production-grade member management and donation platform for LSWS, a non-profit organization. The application provides members with account management, donation capabilities, document access, and automated receipt/notification emails through Node.js emailer microservices.

### Architecture
- **Frontend:** Vue.js 3.2.13 SPA running on Firebase Hosting
- **Mobile:** Wrapped as Android app using WebView (no separate native codebase needed)
- **Database:** Firebase Firestore for real-time data sync
- **Backend:** Node.js emailer service for transactional emails
- **Authentication:** Firebase Auth with role management

### Key Capabilities

✅ Member account management | ✅ Donation submission & tracking | ✅ Document management | ✅ Receipt generation | ✅ Birthday emails | ✅ Real-time sync | ✅ Android WebView deployment | ✅ Search & filtering

---

## Features

### 👥 **Member Management**
- Create and maintain member profiles
- View personal and organizational data
- Search and filter members efficiently
- Update profile information
- Membership status tracking

### 💳 **Donation & Payment Processing**
- Submit donation/payment requests
- Enter payment details securely
- Track donation history
- Automatic receipt generation after admin approval
- Receipt storage for future reference
- Monthly recurring donation options

### 📄 **Document Management**
- Secure document upload and storage
- Member-specific document access
- Centralized repository for organizational files
- File organization by category
- Download and sharing capabilities

### 📧 **Automated Email Workflows**

**Birthday Mailer:** Automated emails on member birthdays  
**Receipt Emails:** Donation receipts sent after admin approval  
**Payment Confirmations:** Instant messages when payments submitted  
**Notification System:** Important org announcements via email  

All emails powered by Node.js backend with Nodemailer integration.

### 📱 **Android App Deployment**
- Single codebase for web and mobile
- WebView wrapper for Android distribution
- No separate native development required
- Consistent UX across platforms
- App Store deployment ready

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Vue.js | 3.2.13+ |
| **Router** | Vue Router | 4.2.5+ |
| **State** | Vuex | 4.1.0+ |
| **UI** | Vuetify | 3.3.19+ |
| **Database** | Firebase Firestore | Latest |
| **Auth** | Firebase Auth | Latest |
| **Hosting** | Firebase Hosting | Latest |
| **Image Zoom** | Vue Inner Image Zoom | 2.0.0+ |
| **HTTP** | Axios | Latest |
| **Backend** | Node.js + Nodemailer | 14+ LTS |

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│  Member Browser / Android WebView   │
│  Vue.js Member Portal               │
└──────────────────┬──────────────────┘
                   │
       ┌───────────┼───────────┐
       │           │           │
       │   Firebase Firestore │
       │           │           │
       │   Real-Time Database │
       │           │           │
       └───────────┼───────────┘
                   │
       ┌───────────▼───────────┐
       │  Node.js Emailer      │
       │  (LSWS-Emailer)       │
       │                       │
       │ • Birthday Emails     │
       │ • Receipt Emails      │
       │ • Confirmations       │
       │ • Notifications       │
       └───────────────────────┘
```

---

## Setup & Installation

### Prerequisites
- Node.js 14+
- npm/yarn
- Firebase project
- Android Studio (for WebView app)

### Installation

```bash
# Clone and setup
git clone https://github.com/Rushikesh36/lsws-member-management-app.git
cd lsws-member-management-app

# Install dependencies
npm install

# Configure Firebase (.env.local)
cp .env.example .env.local
# Add your Firebase credentials

# Development
npm run serve   # http://localhost:8080

# Production build
npm run build   # Outputs to dist/
```

---

## Firebase Configuration

Create `.env.local`:

```
VUE_APP_FIREBASE_API_KEY=AIzaSyD...
VUE_APP_FIREBASE_PROJECT_ID=lsws-prod
VUE_APP_FIREBASE_AUTH_DOMAIN=lsws-prod.firebaseapp.com
VUE_APP_FIREBASE_DATABASE_URL=https://lsws-prod.firebaseio.com
VUE_APP_FIREBASE_STORAGE_BUCKET=lsws-prod.appspot.com
```

---

## Database Schema

**Collections in Firestore:**
- `members` - Member profiles and info
- `donations` - Donation records and status
- `documents` - Shared organizational documents
- `receipts` - Generated donation receipts
- `notifications` - Email delivery logs

---

## Email Integration

**LSWS-Emailer Microservice** handles:
- Birthday notifications (scheduled daily)
- Receipt emails (triggered on donation approval)
- Payment confirmations (triggered on submission)
- System announcements (admin-triggered)

---

## Android WebView Deployment

```bash
# After building Vue app (npm run build)
# Use Android Studio to wrap dist/ folder as WebView app
# Reference: https://developer.android.com/develop/ui/views/layout/webapps

# WebView Configuration:
# - Load: file:///android_asset/www/index.html
# - Enable JavaScript
# - Enable localStorage
# - Configure permissions
```

---

## Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Android Play Store
- Build APK from WebView wrapper
- Sign with keystore
- Upload to Play Store

---

## Performance
- **Page Load:** < 2s
- **Lighthouse:** 90+
- **Real-time Sync:** < 100ms latency
- **Supported Devices:** iOS, Android, Web browsers

---

## Security
- Firebase Auth with role-based access
- Encrypted data in transit (HTTPS)
- Firestore security rules per role
- No sensitive data in local storage
- Payment info validation

---

## Author
Rushikesh Wani - [@Rushikesh36](https://github.com/Rushikesh36)

---

**Status:** 🟢 Production | **Updated:** January 2025
- **Nodemailer**
- Firebase Admin SDK (for secure Firestore access)

### 🚀 Deployment
- **Firebase Hosting** (Web App)
- **Android Studio** (Android App using WebView)

