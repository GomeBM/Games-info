# Games Hub

A web application built with Vue.js frontend and Node.js/Express backend, using MySQL for data storage and the RAWG API for game data.

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Integration](#api-integration)
- [License](#license)

## 🔍 Overview

Games Hub is a comprehensive platform that allows users to browse, search, and save information about video games. The application leverages the RAWG API for game data and stores user-specific information in a MySQL database.

## 💻 Technologies Used

- **Frontend**: Vue.js with Vite
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **External API**: RAWG API

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) (recommended for database management)
- [Git](https://git-scm.com/)

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/games-hub.git
   cd games-hub
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Configuration

### Server Configuration (.env)

1. Create a `.env` file in the `server` directory with the following variables:
   ```env
   DB_NAME=games_hub
   DB_USER=root
   DB_PASSWORD=YourPassword
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   PORT=5000
   API_KEY=YourRAWGApiKey
   API_BASE_URL=https://api.rawg.io/api
   ```
   Replace `YourPassword` with your MySQL password and `YourRAWGApiKey` with your personal RAWG API key.

2. To get a RAWG API key:
   - Visit [RAWG API](https://rawg.io/apidocs)
   - Create an account and register for an API key
   - Copy the API key to your `.env` file

### Client Configuration (.env)

1. Create a `.env` file in the `client` directory with the following variable:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

## 🗄️ Database Setup

1. Open MySQL Workbench and connect to your local MySQL server.

2. Create a new database named `games_hub`:
   ```sql
   CREATE DATABASE games_hub;
   ```

3. The application will automatically create the required tables when it first runs, thanks to Sequelize's synchronization features.

## 🚀 Running the Application

### Running the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The server will start on port 5000 (or the port specified in your .env file).

### Running the Client

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the client:
   ```bash
   npm run dev
   ```
   The client will be available at http://localhost:5173 (or another port if 5173 is in use).

## 🔌 API Integration

The application integrates with the RAWG API to fetch game data. The server acts as a proxy for RAWG API calls, which helps secure your API key.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed with ❤️ by Gome Ben Moshe
