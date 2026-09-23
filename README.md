# Restful Booker - API Test Automation Framework

A Playwright + JavaScript test automation framework for the [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) demo API, covering authentication, full CRUD lifecycle testing, negative cases, and schema validation.

## Overview

This project tests the Restful Booker hotel booking API end-to-end — creating, reading, updating, partially updating, and deleting bookings, while validating both the happy-path behavior and negative/unauthorized scenarios. It follows a clean, modular architecture (config, clients, fixtures, schemas, tests) designed to scale to larger API testing projects.

## Tech Stack

- **Playwright** — API testing and test runner
- **JavaScript (CommonJS)**
- **ajv** — JSON Schema validation
- **dotenv** — environment variable management
- **GitHub Actions** — CI/CD pipeline

## Project Structure

```
├── config/
│   └── env.js              # Centralized base URL and credentials (from .env)
├── client/
│   ├── authClient.js        # Wraps the /auth token-generation endpoint
│   └── bookingClient.js      # Wraps all booking CRUD operations
├── fixtures/
│   └── authFixture.js        # Provides a pre-authenticated request context
├── schema/
│   └── bookingSchema.js      # JSON Schema for validating API responses
├── test-data/
│   ├── bookingData.json
│   ├── updateBookingData.json
│   ├── partialUpdateData.json
│   └── negativeBookingData.json
├── tests/
│   ├── loginTest.spec.js
│   ├── bookingTest.spec.js
│   └── bookingSchema.spec.js
└── .github/workflows/
    └── playwright.yml        # CI pipeline
```

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in real values:
   ```bash
   cp .env.example .env
   ```

## Running Tests

```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test tests/bookingTest.spec.js
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## What's Tested

- **Authentication** — token generation via `/auth`
- **Full CRUD lifecycle** — create → get → update (PUT) → partial update (PATCH) → delete → confirm deletion via a follow-up GET (404)
- **Negative cases** — invalid booking creation, unauthorized update attempts
- **Schema validation** — auth response shape validated against a formal JSON Schema using ajv

## Notable Implementation Details

- **Auth mechanism:** Restful Booker uses **Cookie-based** authentication (`Cookie: token=<value>`) for protected endpoints, rather than a Bearer token. This was verified directly against the API's documented and observed behavior.
- **Two-client design pattern:** `BookingClient` is instantiated twice per test — once with a plain (unauthenticated) request context for read/create operations, and once with an authenticated context for update/delete operations. This keeps auth tokens scoped only to the calls that actually need them, rather than attaching credentials to every request by default.
- **CI considerations:** Restful Booker's free-tier demo API can be sensitive to concurrent request load; the pipeline is configured to run tests serially in CI (`workers: 1`) to avoid flaky failures caused by simultaneous auth requests.

## CI/CD

Tests run automatically on every push to `main` via GitHub Actions. Credentials are injected through GitHub Secrets (`USERNAME`, `PASSWORD`) rather than committed to the repository.