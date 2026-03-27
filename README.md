# LolLookup

A League of Legends summoner search tool for viewing summoner profiles and analyzing recent match performance.

---

## Features

- **Summoner Search** - look up any summoner by `GameName#TagLine` across all regions
- **Profile Overview** - view information about searched summoner:
  - base profile information
  - most played champion represented in the form of a profile banner
  - rank statistics for _solo_ and _flex_ queues
  - list of matches the summoner participated in most recently
- **Recent Match Summary** - aggregated stats across loaded matches
- **Match Expansion** - view full team scoreboards and detailed per-player stats for each match
- **MVP Highlighting** - MVP of each team is calculated using weighted score and highlighted

---

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Axios, Recharts, Framer Motion
- **Backend:** Node.js, Express, Needle, express-rate-limit, node-cache
- **Testing:** Jest, Supertest

---

## Architecture

The backend acts as an API proxy that forwards requests from and to, the React client and the Riot API.\
Per-region rate limiting that mirrors my allowed Riot API usage limit with a 90% safety margin.\
Caching for each response type, with separate TTLs.

On summoner page load, client sends 9 requests to the backend:

| #   | Endpoint                                     | Riot API Calls           |
| --- | -------------------------------------------- | ------------------------ |
| 1   | `GET /summoner/:region/:gameName/:tagLine`   | ACCOUNT-V1 + SUMMONER-V4 |
| 2   | `GET /summoner/main-champion/:region/:puuid` | CHAMPION-MASTERY-V4      |
| 3   | `GET /summoner/rank/:region/:puuid`          | LEAGUE-V4                |
| 4   | `GET /summoner/matches/:region/:puuid`       | MATCH-V5 (match IDs)     |
| 5-9 | `GET /summoner/match/:region/:matchId`       | MATCH-V5 (x5 matches)    |

Each **_Load More_** fetches 5 additional matches.

---

## Local Development

### Prerequisites

- Node.js 18+
- Riot API key

#### 1. Clone the repository

```bash
git clone https://github.com/todormitevski/lol-lookup.git
cd lol-lookup
```

#### 2. Server setup

Create a `.env` file in `server/` directory:

```env
PORT=8080
BASE_URL=http://localhost:3000
API_KEY=RIOT_API_KEY
```

```bash
cd server
npm i
npm run dev
```

#### 3. Client setup

Create a `.env.development` file in `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_PATCH_VER=LATEST_DATA_DRAGON_PATCH_VERSION

# optional
VITE_PLACEHOLDER_GAME_NAME=PlaceholderGameName
VITE_PLACEHOLDER_TAG_LINE=PlaceholderTagLine
```

```bash
cd client
npm i
npm run dev
```

#### 4. Testing

```bash
cd server
npm run test

# additional commands
npm run test:unit
npm run test:integration
npm run test:coverage
```

---

## Project Structure

This is a monorepo with `client` and `server` as separate packages.

```
lol-lookup/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # ui and layout components
│       ├── hooks/           # custom hooks
│       ├── pages/           # page components
│       ├── routes/          # app routing
│       ├── services/        # api clients
│       ├── types/           # type definitions
│       └── utils/           # utility functions
│
└── server/                  # Express backend
    │
    ├── config/              # constants and mappings
    ├── controllers/         # route handler logic
    ├── middleware/          # middleware
    ├── models/dtos/         # dtos
    ├── routes/              # route definitions
    ├── services/            # service layer logic
    └── tests/               # unit and integration tests
```

---

## Git Workflow

This project follows the **Gitflow** branching strategy:

- `master`: production code (tagged releases)
- `develop`: integration branch for features
- `feat/*`: feats
- `release/*`: release prep
- `hotfix/*`: bug fixes
- `docs/*`: documentation updates

---

## Legal Notice

LolLookup was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

---

## License

This project is licensed under the [MIT License](./LICENSE).

The MIT license applies to the original source code only and does not grant any rights to Riot's IP. Game data, assets, and all Riot Games intellectual property remain the property of Riot Games, Inc. and are subject to their [API Terms](https://developer.riotgames.com/terms) and [Legal Jibber Jabber](https://www.riotgames.com/en/legal).
