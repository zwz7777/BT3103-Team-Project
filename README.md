# NUS Lost & Found 

A web-based platform designed to streamline the reporting and recovery of lost and found items at the National University of Singapore (NUS).

## Table of Contents
- [NUS Lost \& Found](#nus-lost--found)
  - [Table of Contents](#table-of-contents)
    - [Overview](#overview)
    - [Features](#features)
    - [Tech Stack](#tech-stack)
      - [Frontend](#frontend)
      - [Backend \& Hosting](#backend--hosting)
      - [DevOps](#devops)
    - [Getting Started](#getting-started)
      - [URL](#url)
      - [Local Host](#local-host)
    - [Test Accounts](#test-accounts)
    - [Project Structure](#project-structure)
    - [Firebase Database Structure](#firebase-database-structure)
    - [Team Members](#team-members)
    - [License](#license)

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

#### Frontend

- Vue.js 3 + Composition API
- Chart.js + Vue Chartkick

#### Backend & Hosting

- Firebase Authentication
- Firestore Database
- Firebase Storage
- Firebase Hosting

#### DevOps

- GitHub
- Vite

### Getting Started 

#### URL
https://bt3103-lnf.web.app

#### Local Host
    git clone https://github.com/BT3103AppDev1/l2-finaltermproject-2425s2l2_group_9.git
    cd NUS-LostFound-project
    npm install
    npm run dev

### Test Accounts

| Name      | Email               | Password |
|-----------|---------------------|----------|
| Student A | testuser2@test.com  | 123456   |
| Student B | testuser@test.com   | 123456   |

### Project Structure

    src/
    ├── components/         # Reusable UI components
    ├── views/              # Page views
    ├── services/           # Firestore & notification logic
    ├── router/             # Vue Router setup
    ├── firebase.js         # Firebase config
    ├── uifire.js           # Firebase UI config (no longer used)
    └── App.vue             # Main app container


### Firebase Database Structure

    /users (collection)
      /userId (document)
        - uid: string
        - email: string
        - telegram: string
        - phoneNumber: number
        - createdAt: timestamp
        - notifications: array (notification ID)
        - posts: array (post ID)

    /foundItems (collection)
      /postId (document)
        - category: string
        - color: string
        - description: string
        - faculty: string
        - imageUrls: array (firebase storage image url)
        - location: string
        - timestamp: timestamp
        - urgency: number
        - userId: string (user ID)
    
    /lostItems (collection)
      /postId (document)
        - category: string
        - color: string
        - description: string
        - faculty: string
        - imageUrls: array (firebase storage image url)
        - location: string
        - timestamp: timestamp
        - urgency: number
        - userId: string (user ID)
  
    /notification (collection)
      /notificationId (document)
        - message: string
        - posterUid: string (post ID)
        - requesterUid: string (user ID)
        - timestamp: timestamp

### Team Members
- Lu Xinyu (A0282855R)
- Li Xinyi (A0282032R)
- Luo Yuran (A0287951M)
- Lyu Zhoucancan (A0282394W)
- Zhong Wanzhi (A0281200Y)
- Wang Yixuan (A0282005R)

### License

This project is built for NUS BT3103: Application Development. 
All rights reserved to the team.

This is a copy of the group project originally developed under a private repository for academic purposes.
