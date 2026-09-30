# API Pulse

API Pulse is a lightweight API health monitoring dashboard built with React and JavaScript.

It allows users to add API endpoints, check their availability, measure response time, and manage multiple APIs from one dashboard.

## Features

- Add and remove API endpoints
- Check API availability
- Display HTTP status codes
- Measure response time
- Visual online/offline status
- Persist saved APIs using localStorage
- Responsive interface

## Built With

- React
- JavaScript
- Vite
- CSS
- Browser Fetch API
- LocalStorage

## How It Works

1. Enter an API name and endpoint.
2. Add the API to the dashboard.
3. API Pulse sends a request to the endpoint.
4. The dashboard displays the HTTP status and response time.
5. Saved endpoints remain available after refreshing the browser.

## Running Locally

```bash
npm install
npm run dev
