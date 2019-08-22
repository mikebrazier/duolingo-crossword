# Crossword Find Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

1.) run `npm install` to install dependencies

2.) run `npm start` to run the development server, navigate in your browser to [http://localhost:3000](http://localhost:3000) to view the app

3.) run `npm test` to launch the test runner in interactive watch mode

## Requirements

#### 1.) Display the word _source_ and a grid of letters that contains all the _targets_.

The container component `CWContainer` contains three child components, `CWPrompt`, `CWKeyword`, and `CWGrid` which receive props of the current game data and present the user the challenge, keyword, and crossword respectively.

    <CWPrompt

sourceLanguage={this.props.currentGame.gameData.sourceLanguage}
targetLanguage={this.props.currentGame.gameData.targetLanguage}
/>
<CWKeyword keyword={this.props.currentGame.gameData.sourceWord} />
<CWGrid
          onGridSelecting={this.onGridSelection}
          onGridSelection={this.onGridSelection}
          wordSelectEnabled={this.props.wordSelectEnabled}
          characterGrid={this.state.characterGrid}
          foundWords={this.props.currentGame.state.foundWords}
          currentlySelected={this.props.currentGame.state.selectedWord}
    />

#### 2.) When the user selects letters by dragging on the cells of the grid, and they form a valid translation of the source word, they should remain highlighted, otherwise the selection should disappear

The `CWContainer` component provides its child `CWGrid` component `onGridSelecting(word: CWWord)` and `onGridSelection(word: CWWord)` callbacks, which are triggered anytime a user selection is being made, or has been made.

When called, the `CWWord` argument, containing the user-selected word is `dispatch()`ed to the Redux store, which sets the respective `CWGameState.selectedWord` field for the current game.

The `CWGameState.selectedWord` field is then mapped to `CWContainerState.currentlySelected`.  
This is then passed to `CWGrid` via props, which handles rendering `CWLetterBox` components with a boolean `selected` prop. The styling of these letters is defined in the respective `CWLetterBox.css` file. They are rendered as blue prior to being validated.

Internally `CWGrid` uses `onCWLetterBoxMouseDown()`,`onCWLetterBoxMouseEnter()`, on its child `CWLetter` components to trigger prop callbacks while a user is selecting, and `handleMouseUp()` when a selection is complete.

`CWGrid` also contains a function `findSelectedPoints(start: Coords, end: Coords)` which finds the best straight-line or diagonal for the user based off of `CWGridState.startPoint` and `CWGridState.endPoint` .

When a selection is `dispatch()`'d, via the `WORD_SELECTION` Redux action, an answer `<button/>` is enabled for the user in the footer of the page. This immitates Duolingo's own lesson interface.

Clicking the check answer button triggers the `CHECK_SELECTION` action, and the reducer uses `checkSelectedWord(gameData: CWGameData, state: CWGameState)` from the `CWGame` module to update the `CWGameState`. `CWGameState` holds members `CWGameState.currentAnswerCorrect: boolean` and `CWGameState.foundWords: Array<CWWord>`.

After a `CONTINUE_GAME` ACTION, the `CWGameState.selectedWord` field is cleared. If the answer was correct, the selected word will be persisted within the `CWGameState.foundWords` array. Otherwise, it will not.

`CWGrid` finally receives the current `CWGameState.foundWords` array, and sets the boolean `validated` field on its `CWLetterBox` child components. These are rendered as green to indicate their correctness.

#### 3.) After all targets have been found, the app should display a new grid and source word

Within the reducer's switch statement, `CONTINUE_GAME` contains uses `getWordsRemaining(gameData: CWGameData, state: CWGameState)` from the `CWGame` module for determining if all `CWGame.gameData.targetLocations` have been found.

If all words for the current game have been found, the `AppState.gameIndex` index is incremented, and the updated state is propogated throughout the application, resulting in the next `CWGame` being rendered as the current game.

#### 4.) App should make a network request to obtain the source data

Within the `App` component's `componentDidMount()` function, `fetchGames()` from the `duolingoAPI` module is called, which requests `/find_challenges.txt`. The response is parsed and an array of `CWGameData` is returned.

#### 5.) Targets should be selectable both forwards & backwards

`CWGrid` simply creates a `CWWord`, or an `Array<CWLetter>` from user selection start point to endpoint. Thus, the returned array may potentially contain a given word's letters in reverse order.

Within `checkSelectedWord(gameData: CWGameData, state: CWGameState)`, `wordIsValid(gameData: CWGameData, searchWord: CWWord)` uses `wordsAreEqual(wordA: CWWord, wordB: CWWord)` and compares each letter in every word in `CWGame.gameData.targetLocations`, in order, against every `CWLetter` within `CWGame.state.selectedWord`.

The order of the letters in a word matters, as do the coordinates associated with the word. Thus `wordsAreEqual()` will return false if either of these conditions are false.

If the initial check on `CWGame.state.selectedWord` returns false, `Array.reverse()` is called, and an additional check is made.

#### 6.) App must use React and either Typescript or Javascript

Typescript was used throughout the entire codebase, to provide additional typechecking.  
The React framework also used.

#### 7.) You may bundle the game data inside your app instead of making a network request.

A network request is made, but in the case that it fails, `defaultGamesDataArray` from the `CWDefaultGameData` module is used to configure the `AppState.games` array.

#### 8.) Your app must support the latest version of Chrome

Chrome Version 76.0.3809.100 and Firefox 68.0.2 were used during development.

## Evaluation

#### 1. Usability: Is it easy to select words? Is the UI intuitive?

-   Duolingo's web app was immitated to emulate an experience comparable to a production-quality lesson.

-   The crossword compensates for users making non-diagonal, non-straight word selections, by calculating a new endpoint, based off the sign and greater of differences in magnitude between coordinate start and endpoints.

-   A check answer button allows users make their selection, without it being evaluated immediately after being made. If this wasn't the case, users could unintentionally select a word they did not mean to, and have it be graded as false. In production, this could result in their lesson score being reduced, and their learning knowledge misrepresented.

-   The check answer, continue button is enabled and disabled depending on the game state, as is the crossword grid via a `wordSelectEnabled` field. The CSS `cursor` style field switches between `default` and `pointer` to indicate if these DOM elements are clickable.

-   The previously mentioned indications, along with the different stylings of the check answer, continue button, help guide the user in a linear manner during their progression through the lesson. Only a single word can be evaluated at a time, which simplifies the crossword interface, promotes focus, and prevents the grid from becoming too cluttered with user selections.

-   The footer provides an obvious and friendly indication of the correctness of their answer via coloring, a message, and an encircled ✓ or ✗ graphic.

-   A progress bar, similar to one found in Duolingo's app, helps the user understand that words remain to be found within the crossword. The ✗ in the top righthand corner may be clicked to reset the lesson.

-   Audio assets from Duolingo's app provide additional indications to a user of their answer's correctness, in addition to the lesson's completion. This makes the learning experience more engaging, exciting, and game-like.

-   A loading view is _(artificially)_ served at the beginning of the app, to indicate consideration for hypothetical network latency, or startup initialization. This includes a friendly Duolingo animated graphic.

-   A game complete page indicates the lesson is complete, and prompts the user to repeat the lesson if they so desire. Another cute graphic of Duo is added for enjoyment.

-   All styling, including fonts, were referenced from Duolingo's production code and style guidelines. This was done to provide a cohesive experience to the user and emphasize an importance of production-like quality during development.

#### 2. Correctness: Are all requirements met? Does your app have bugs or crashes?

-   See the **Requirements** section. All requirements, to the creator's knowledge, were met.

-   Current playthroughs have not yet indicated bugs or crashes. TDD was implemented, to a certain extent, to validate the main logic of the game.

#### 3. Cleanliness: Is the code well­organized and easily maintainable?

-   The `npm create-react-app` module was used to generate standard boilerplate code, along with development tools for serving, testing, and building the app during development.

-   Redux was used to manage state. The benefits of which are well-known. Extending the application to have its state persisted server-side would be trivial.

-   Source files were organized into folders _actions_, _api_, _components_, _constants_, _containers_, _reducers_, _store_, _types_, as community best practices suggest.

-   TDD with Jest was implemented to demonstrate module usage and validate behavior for the main logic of the game.

-   All source files include documentation generated by Sublime Text's DoxyDoxgen package.

-   Git version control was used to commit changes as the app progressed from a static React app, to an interactive Redux-powered app.

-   JSPrettier Linting tools were used to standardize code formatting.

-   The React and Redux sites were referenced to follow recommended best practices, and _Fullstack React_ published by Fullstack.io was referenced during development

-   Components, containers, and modules were written to be modular and promote general separation of concerns. Basic React components were written to be more-or-less presentational, while application and Redux integration logic was held in container components.

-   While the app contains a fair amount of features & visual complexity, the underlying Redux store `AppState` consists of two parameters: `gameIndex` and `games`. Each `CWGame` within the `games` array contains a `CWGameState` containing only three members, and a `CWGameData` object which is intended to be `readonly`.  
    All other _"game state"_ is derived from this data structure, reducing complexity and eliminating non-essential data.

## Additional Features

-   LocalStorage was used to persist lesson state between page visits/refreshes.

## Discussion

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
