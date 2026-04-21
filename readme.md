# Fundraising API

Backend REST API for a fundraising platform built with Express, TypeScript, and Prisma.

## Tech Stack
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication

## Features
- User Registration & Login
- JWT Authentication & Authorization
- Campaign CRUD
- Owner-only Edit & Delete
- Donation System
- Centralized Error Handling

## API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |

### Campaigns
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /campaigns | Create campaign |
| GET | /campaigns | Get all campaigns |
| PUT | /campaigns/:id | Update own campaign |
| DELETE | /campaigns/:id | Delete own campaign |

### Donations
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /donations | Donate to campaign |

## Installation
```bash
npm install