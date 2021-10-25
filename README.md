# Cuteel

This is the backend for _Cuteel_, the final project for my Master / Engineering Degree. Built on top of `Node.js` using `Express.js` and `TypeScript`

## Dependencies

- Node.js
- TypeScript

## Tools

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (consistent code formatting)

## Dev Environment

Create an `.env` file in your root directory and add theses entries to it:

```lang-none
PORT=8080
DATABASE_URL=mongodb://localhost:27017/cuteel?readPreference=primary&ssl=false # update this if needed
JWT_SECRET=some-super-secret-sentence
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
STRIPE_SECRET_KEY=...
```

In this case `DATABASE_URL` is the MongoDB connection URL

Install the dependencies

```lang-none
yarn
```

Run the app in development mode.

```lang-none
yarn dev
```

## Production

To build the app for production:

```lang-none
yarn build
```
