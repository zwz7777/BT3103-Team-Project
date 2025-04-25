# NUS Lost & Found

A web-based platform designed to streamline the reporting and recovery of lost and found items at the National University of Singapore (NUS).

## Table of Contents
    - Overview
    - Features
    - Tech Stack
    - Getting Started
    - Project Structure
    - Deployment
    - Firebase Database Structure
    - Team Members
    - Test Accounts
    - License

### Overview

The previous NUS RepoApp faced limitations including unintuitive UI, ambiguous item descriptions, and low item recovery rates. Our team developed a modern alternative that emphasizes user-centered design, operational efficiency, and real-time responsiveness.

This app allows users to:

    - Report lost or found items with detailed descriptions and urgency ratings
    - View and filter items by category, color, faculty, and urgency
    - Receive or send in-app notifications to facilitate item return
    - View visual analytics on item reports by category and location
    - Update their contact details and manage posted items


### Features

    - User Authentication: Email + Google login support
    - Lost/Found Reporting Forms: With optional image upload and urgency scale
    - Filtering System: Color and faculty-based filters with urgency-sorted list
    - Notifications: Contact post authors with consent-based Telegram or phone sharing
    - Real-Time Updates: Auto-refresh on new posts using Firestore listeners
    - Home Dashboard: Urgent item highlights + pie chart visualizations
    - Settings Page: Update nickname, Telegram handle, phone, and logout
    - My Posts: View and manage all personal submissions

### Tech Stack

#### Frontend:

    - Vue.js 3 + Composition API
    - Chart.js + Vue Chartkick

#### Backend & Hosting:

    - Firebase Authentication
    - Firestore Database
    - Firebase Storage
    - Firebase Hosting

#### DevOps:

    - GitHub
    - Vite

### Getting Started

    git clone https://github.com/BT3103AppDev1/l2-finaltermproject-2425s2l2_group_9.git
    cd NUS-LostFound-project
    npm install
    npm run dev

### Project Structure

    src/
    ├── components/         # Reusable UI components
    ├── views/              # Page views
    ├── services/           # Firestore & notification logic
    ├── router/             # Vue Router setup
    ├── firebase.js         # Firebase config
    └── App.vue             # Main app container


### Deployment

    firebase login
    firebase deploy
    Deployed to: https://bt3103-lnf.web.app
    

### Firebase Database Structure

    /users (collection)
      /userId (document)
        - name: string
        - email: string
        - profile: map

    /posts (collection)
      /postId (document)
        - title: string
        - userId: reference to /users/userId
        - createdAt: timestamp

Additionally:
- foundItems and lostItems are split into separate collections
- notifications collection stores in-app communication between users
- Each user document may also store a posts array and a notifications array (by ID)


### Team Members
- Lu Xinyu (A0282855R)
- Li Xinyi (A0282032R)
- Luo Yuran (A0287951M)
- Lyu Zhoucancan (A0282394W)
- Zhong Wanzhi (A0281200Y)
- Wang Yixuan (A0282005R)


### Test Accounts

    Name	Email	                    Password
    A	testuser2@test.com	     123456
    B	testuser@test.com	     123456


### License

This project is built for NUS BT3103: Application Development. All rights reserved to the team.