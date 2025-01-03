# Node.js Project with Sequelize and PostgreSQL

This is a Node.js project using TypeScript, Sequelize as the ORM, and PostgreSQL as the database. The project includes models, relations, and basic setup for running a full-stack application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **Yarn** (or npm if you prefer)
- **PostgreSQL** (installed and running)
- **TypeScript** (v4 or higher)

## Installation

1. Clone this repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies using Yarn:
    ```bash
    yarn install
    ```

3. Create a `.env` file in the root of your project and set your environment variables (see the **Environment Setup** section).

## Environment Setup

Create a `.env` file in the root directory of your project with the following variables:

```env
ENV=development
PORT=3000
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
JWT_ACCESS_SECRET=<your-jwt-access-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
TOKEN_HEADER_NAME=Authorization
LOG_DATE=YYYY-MM-DD
ALERT_EMAIL_USER=<your-email>
ALERT_EMAIL_PASSWORD=<your-email-password>
ALERT_EMAIL_RECIPIENT=<recipient-email>
