# Assignment 1 Report

## Event Listing Web Application for Sydney, Australia

### Overview

The objective of Assignment 1 was to build a web application that automatically scrapes events from websites related to a specific city (Sydney, Australia), stores them, and displays them in a clean, minimalistic web interface. Additionally, users should be able to click a "Get Tickets" button, provide their email with opt-in consent, and be redirected to the original event source. The events should also update automatically as new events are published.

I implemented a full-stack solution using Node.js, Express, MongoDB, and React, with automated scraping handled through Browse AI and webhook integration.

---

## Approach

### 1. Backend Architecture

I followed an MVC architecture for the backend to keep the codebase clean and scalable.

- **Models**: MongoDB schemas for events and subscribers
- **Controllers**: Logic for fetching events, handling subscriptions, and processing webhooks
- **Routes**: REST endpoints for events, subscribers, and webhook ingestion
- **Database**: MongoDB Atlas for persistent storage
- **Deployment**: Backend deployed on Render

Instead of scraping data on every frontend request, the backend acts as the single source of truth by storing scraped events in MongoDB and serving them via APIs.

### 2. Scraping Strategy

#### Initial Cheerio-Based Attempt

My initial plan was to use Cheerio with Express to scrape event websites directly. However, I faced several challenges:

- Modern event websites rely heavily on client-side rendering
- HTML structure was large and frequently changing
- Selectors broke easily, making the scraper unreliable
- Required frequent manual fixes

Although Cheerio works well for static HTML, it proved to be fragile for production-like scraping in this case.

#### Switching to Browse AI

To solve this, I switched to Browse AI, which:

- Handles JavaScript-rendered pages
- Provides structured data extraction
- Supports scheduled scraping
- Sends data automatically via webhooks

I configured a Browse AI robot to scrape Sydney event listings and capture structured fields such as title, venue, dates, description, image URL, and event URL.

### 3. Webhook Integration

Browse AI sends scraped data to the backend via a webhook.

I implemented a `/api/webhooks/browse-ai` endpoint that:

- Receives the webhook payload
- Extracts the captured event list
- Normalizes and validates the data
- Parses date fields safely
- Deduplicates events based on title and date
- Saves valid events into MongoDB

One challenge here was understanding the exact webhook payload structure, especially the nested `capturedLists` object. After logging and inspecting payloads, I corrected the data path and ensured events were correctly extracted and stored.

### 4. Automatic Updates

Instead of managing cron jobs manually, I relied on:

- Browse AI's scheduled runs for scraping
- Webhooks to push updated data automatically

This ensured the system updates itself whenever new events are published, without requiring backend polling or frontend triggers.

### 5. Frontend Integration

The frontend was built using React, focusing on simplicity and usability:

- Events are fetched from the backend API
- Displayed in a clean, card-based layout
- Each event includes details such as title, date, venue, and image
- "Get Tickets" button opens an email opt-in flow and redirects users to the original event website

One challenge was ensuring consistent data mapping between backend responses and frontend components, especially while iterating on the event schema. This was resolved by stabilizing the API response structure early.

### 6. Deployment Challenges

During deployment, I encountered a few real-world issues:

**MongoDB default database fallback:**
Initially, data was being stored in the test database instead of the intended database. This was resolved by explicitly setting the database name in the MongoDB connection string.

**Render cold starts:**
As Render's free tier spins down inactive services, deployments and webhook testing sometimes appeared delayed. Monitoring logs and understanding cold-start behavior helped avoid unnecessary redeploys.

**Webhook testing before deployment:**
I learned that webhooks must point to a live backend URL, so deploying early was essential to test end-to-end scraping.

---

## Challenges Faced & Solutions

| Challenge                            | Solution                               |
| ------------------------------------ | -------------------------------------- |
| Cheerio breaking due to dynamic HTML | Switched to Browse AI                  |
| Large, complex page structures       | Used structured data extraction        |
| Webhook payload confusion            | Logged and inspected payload structure |
| Duplicate events                     | Added deduplication logic              |
| MongoDB saving to wrong DB           | Fixed connection string                |
| Deployment delays                    | Understood Render free-tier behavior   |

---

## Improvements & Future Enhancements

Given more time, I would:

- I would build the second assignment by implementing OpenAPI key, giving it my DB access for helping users to select an event...Extend the system into a conversational assistant (Assignment 2)
- Add pagination and filters (date, category, venue)
- Improve deduplication using indexes
- Add analytics for event popularity
- Enhance email notifications for opted-in users
