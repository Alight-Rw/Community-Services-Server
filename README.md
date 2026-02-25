# COMMUNITY SERVICE – BACKEND API

Community Service Backend is a RESTful API built with Node.js and Express.js.
It powers the Community Service web application by handling authentication, service management, booking logic, and user account operations.

The API enables secure communication between the frontend and the database while managing business logic and data validation.

## System Overview

* The backend provides:
* User Authentication (Client & Provider)
* Service Creation and Management
* Service Booking System
* Booking Status Tracking
* Profile Management
* Contact Form Handling
* Role-Based Access Control (RBAC)*

## User Roles
1️⃣ Client

* Register and log in
* Browse available services
* Book services
* View booked services
* Track booking status (waiting,Approved, completed, rejected)
* Edit profile
* Delete account

2️⃣ Provider

* Register and log in
* Add new services
* Edit services
* Delete services
* Update booking status
* View requested service

## Technology Used

* Node.js
* Express.js
* MongoDB
* JWT (Authentication)
* bcrypt (Password hashing)
* Joi (Validation)

## Programming Language

JavaScript (ES6+)


## Security Features

Password hashing using bcrypt

JWT-based authentication

Role-based authorization (Client & Provider)

Input validation using Joi

Protected routes with middleware


## How to Run This Backend Locally

1️⃣ Clone the repository
* git clone <your-backend-repository-url>

2️⃣ Install dependencies
* npm install

3️⃣ Create .env file
* Create a .env file in the root directory and add:

PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the server
* npm run dev

Server will run on:

http://localhost:5000


## Contributors

* Gedeon Twizerimana
* Michel Hategekimana
* Jackson Tuyikunde
* Alice Niyomufasha
* Busoke Bonane
* Ben
* Kaboss
* Shadrack
* Phocas