# FreeWhen — small project 01

A deliberately tiny scheduling MVP:

> Send your friends one link. Everyone marks when they're free. It automatically finds the best three times.

## MVP scope

- Create a poll with a plan name, date range, daily time window, and block length.
- Generate a shareable `?poll=<uuid>` link.
- Let anyone with the link enter a name and select every time that works.
- Save an anonymous participant token in that browser so the person can update their response later.
- Rank the top three time blocks by number of available people.
- Display each option in the viewer's local timezone.

## Intentionally not included

Accounts, friend groups, Google/Microsoft calendar integrations, venue suggestions, bookings, notifications, or payments.

## Stack

- Plain HTML/CSS/JavaScript
- Supabase JS v2 via ESM CDN
- Supabase Postgres RPC functions
- Private `availability_mvp` schema; anonymous clients get function access only, not direct table access

## Run locally

Because `script.js` is an ES module, serve the folder instead of double-clicking the HTML file:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Branch

This MVP lives on `availability-poll-mvp` so the existing `friend_scheduler` prototype on `main` stays untouched.
