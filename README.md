# Cuteel

This is the backend for _Cuteel_

## Dependencies

- Node.js
- TypeScript

## Tools

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (consistent code formatting)

## Dev Environment

Create an `.env` file in your root directory and add theses entries to it:

```lang-none
PORT=...
DATABASE_URL=...
JWT_SECRET=...
```

In this case `DATABASE_URL` is the MongoDB connection URL

Install the dependencies

```lang-none
yarn
```

Run the app in development mode.

```lang-none
yarn start
```

## Production

To build the app for production:

```lang-none
yarn build
```
