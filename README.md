# Crossword Find Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

1.) run `npm install` to install dependencies

2.) run `npm start` to run the development server, navigate in your browser to [http://localhost:3000](http://localhost:3000) to view the app

3.) run `npm test` to launch the test runner in interactive watch mode

## Notes

- a demonstration of a game's playthrough has been provided via `'duolingo-final-app-demonstration.mov'`

- API Requests are proxy'd via the `proxy` key defined in package.json. This mitigates requests being denied due to CORS. The `duolingoAPI` module would need to be modified accordingly in production to send reqeusts to an appropriate baseURL.

- `redux-devtools-extension` is imported in `store/index.tsx` it would need to be removed during production.
