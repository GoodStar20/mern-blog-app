## Blogging Platform

This is the blogging platform with user authentication, post creation/editing, and additional features like comments and tags.

Tech Stack: React for the frontend, Node.js with Express for the backend, MongoDB for the database.

## Prerequisites

### Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install MongoDB

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

### Run MongoDB

```bash
brew services start mongodb-community
```

## Clone this repo

```bash
$ git clone https://github.com/GoodStar20/mern-blog-app.git
```

### Install dependencies

#### Front-end

```bash
cd frontend
yarn install
yarn start
```

#### Back-end

Please change `.env.example` in backend directory to `.env`

```bash
cd backend
yarn install
yarn start
```

### Screenshots
