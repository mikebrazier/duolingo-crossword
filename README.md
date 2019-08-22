# Crossword Find Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

1.) run `npm install` to install dependencies

2.) run `npm start` to run the development server, navigate in your browser to [http://localhost:3000](http://localhost:3000) to view the app

3.) run `npm test` to launch the test runner in interactive watch mode

## Notes

- API Requests are proxy'd via the `proxy` key defined in package.json. This mitigates requests being denied due to CORS. The `duolingoAPI` module would need to be modified accordingly in production to send reqeusts to an appropriate baseURL.

- `redux-devtools-extension` is imported in `store/index.tsx` it would need to be removed during production.

## Requirements

#### 1.) Display the word _source_ and a grid of letters that contains all the _targets_.

The container component `CWContainer` contains three child components, `CWPrompt`, `CWKeyword`, and `CWGrid` which receive props of the current game data and present the user the challenge, keyword, and crossword respectively.

```
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
```

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

- Duolingo's web app was immitated to emulate an experience comparable to a production-quality lesson.

- The crossword compensates for users making non-diagonal, non-straight word selections, by calculating a new endpoint, based off the sign and greater of differences in magnitude between coordinate start and endpoints.

- A check answer button allows users make their selection, without it being evaluated immediately after being made. If this wasn't the case, users could unintentionally select a word they did not mean to, and have it be graded as false. In production, this could result in their lesson score being reduced, and their learning knowledge misrepresented.

- The check answer, continue button is enabled and disabled depending on the game state, as is the crossword grid via a `wordSelectEnabled` field. The CSS `cursor` style field switches between `default` and `pointer` to indicate if these DOM elements are clickable.

- The previously mentioned indications, along with the different stylings of the check answer, continue button, help guide the user in a linear manner during their progression through the lesson. Only a single word can be evaluated at a time, which simplifies the crossword interface, promotes focus, and prevents the grid from becoming too cluttered with user selections.

- The footer provides an obvious and friendly indication of the correctness of their answer via coloring, a message, and an encircled ✓ or ✗ graphic.

- A progress bar, similar to one found in Duolingo's app, helps the user understand that words remain to be found within the crossword. The ✗ in the top righthand corner may be clicked to reset the lesson.

- Audio assets from Duolingo's app provide additional indications to a user of their answer's correctness, in addition to the lesson's completion. This makes the learning experience more engaging, exciting, and game-like.

- A loading view is _(artificially)_ served at the beginning of the app, to indicate consideration for hypothetical network latency, or startup initialization. This includes a friendly Duolingo animated graphic.

- A game complete page indicates the lesson is complete, and prompts the user to repeat the lesson if they so desire. Another cute graphic of Duo is added for enjoyment.

- All styling, including fonts, were referenced from Duolingo's production code and style guidelines. This was done to provide a cohesive experience to the user and emphasize an importance of production-like quality during development.

#### 2. Correctness: Are all requirements met? Does your app have bugs or crashes?

- See the **Requirements** section. All requirements, to the creator's knowledge, were met.

- Current playthroughs have not yet indicated bugs or crashes. TDD was implemented, to a certain extent, to validate the main logic of the game.

#### 3. Cleanliness: Is the code well­organized and easily maintainable?

- The `npm create-react-app` module was used to generate standard boilerplate code, along with development tools for serving, testing, and building the app during development.

- Redux was used to manage state. The benefits of which are well-known. Extending the application to have its state persisted server-side would be trivial.

- Source files were organized into folders _actions_, _api_, _components_, _constants_, _containers_, _reducers_, _store_, _types_, as community best practices suggest.

- TDD with Jest was implemented to demonstrate module usage and validate behavior for the main logic of the game.

- All source files include documentation generated by Sublime Text's DoxyDoxgen package.

- Git version control was used to commit changes as the app progressed from a static React app, to an interactive Redux-powered app.

- JSPrettier Linting tools were used to standardize code formatting.

- The React and Redux sites were referenced to follow recommended best practices, and _Fullstack React_ published by Fullstack.io was referenced during development

- Components, containers, and modules were written to be modular and promote general separation of concerns. Basic React components were written to be more-or-less presentational, while application and Redux integration logic was held in container components.

- While the app contains a fair amount of features & visual complexity, the underlying Redux store `AppState` consists of two parameters: `gameIndex` and `games`. Each `CWGame` within the `games` array contains a `CWGameState` containing only three members, and a `CWGameData` object which is intended to be `readonly`.
  All other _"game state"_ is derived from this data structure, reducing complexity and eliminating non-essential data.

## Additional Features

- LocalStorage was used to persist lesson state between page visits/refreshes.

- A loading page is _artificially_ shown when initially visiting the page. The calls to configure the `AppState` are delayed by a `setTimeout()`, in `componentDidMount()`.

## Discussion

The rendering algorithm within ```CWGrid``` iterates through all ```CWLetters``` and determines if they should be set as ```selected``` or ```validated```.

It does so by calling ```Array.some()``` on each ```foundWord``` and the current `selectedWord` for every ```CWLetter``` within the grid.  

Thus with a grid of length *L* letters, a set of `foundWords` containing *F* letters, and a `selectedWord` containing *S* letters, the amount of comparisons that would need to be made at worst would be *L* x *F* x *S*.  

An alternative approach would be to create a lookup table on grid initialization for every letter.  This could be implemented by setting keys on an Table object to strings generated by a function, such as `hash=CWLetter.c+CWLetter.x.toString()+CWLetter.y.toString()`.  Entries would contain an object as such: `{ selected: boolean, validated: boolean}`

When a word would be found, each letter would need to be hashed and the lookup table updated only once.  Whenever a selection would be made, the same process would take place.  Unselecting would need to occur on selection change, and un-validating would occur whenever the foundWords array contained different values than previously.

The rendering algorithm, would then execute *L* lookups on each call, with, at worst, and additional *2F*+*2S* calculations for validating/devalidating and deselecting/selecting previous entries in the lookup table. Since this would not happen often for found words, the actual cost would be more close to *L+2S* lookups and selections/deselections.

Initially the `CWGrid` component was not written to monitor changes in `foundWords` and `selectedWord` between updates.  This could be performed in 
`getDerivedStateFromProps()`, and local copies of `foundWords` and `selectedWord` could be stored within the component's state.

However, implementing all this increases the complexity and responsibility of the `CWGrid` component, and given the current code, would require additional refactoring and reimplemntation.

It would be better to remove all `selected` `validated` logic, and for that matter, `findSelectedPoints()` logic into a parent container, and pass all view-related props to a purely presentational `CWGrid` component.

The ultimate cost of the current render algorithm, however, using  React's profiler in Chrome on my Retina, 15-inch, Mid 2015 Macbook, averaged about
2-3ms to render the entire component, or ~333Hz.

Thus, reimplementing the render algorithm for optimization was not done in the submission, but I felt an alternative approach was worth discussing.

## Things To Improve

- #### DOM Layout/Styling

  - #### CSS

      - Most of the CSS styling was done early on to layout the user interace, and the approach was to use broswer developer tools to inspect Duolingo's stylesheets and copy/paste CSS rather haphazardly into *[Component]*.css files and add modifications until presentation was adequate.  A handful of styles are also defined inline with the components. A better approach would've been to define styles in a more consistant, standardized, maintainable manner, and use Sass rather than pure CSS.

  - #### DOM Wrappers

      - While mocking up the UI, a bunch of wrapper ```<divs>``` were added to help align content to match Duolingo's layout.  The imposed wrappers were specifically for this applications layout, and would likely need to be removed & restyled if ever repurposed for another page.

  - #### Responseive Design

    - Media Queries for various different view sizes were not added due to time constraints. Luckily, because Flexbox was used for the majority of the layout, pressing ⌘- a couple times to zoom out the page will likely provide a view that looks reasonably presentable in any desktop browser.

  - #### Mobile Device UI

        - The site was not tested on any mobile devices, however, Firefox & Chrome's mobile Response Design Mode were used to inspect UI performance for Touch Events.  This revealed that **the grid selection mechanism was effectively broken for TouchEvents**.  A handful of hours were dedicated to using React's onTouch synthetic events, but they were not triggered as anticipated.  Making grid seletion mobile friendly revealed to be a potentially time-consuming, non-critical investment, so **the app should only be expected to work in Desktop browsers running the most recent version of Firefox/Chrome**.

  - #### Component Resuability

        - Some of the components, such as the ```GameAnswerIndicator``` footer, are tightly coupled to application's design, and contain multiple DOM elements that could be refactored into separate, more generalized components.  The audio files referenced in the ```GameAudio``` component are hard-coded, and the logic for initiating audio playback is derived off the ```currentAnswerCorrect``` state value toggling between ```undefined``` and ```true``` or ```false```.

        - As mentioned above, the ```CWGrid``` could be refactored into being an entirely presentational, controlled component.  This could require defining ```selected```, ```validated```, ```findSelectedPoints``` logic in a parent container, and passing props of the ```CWLetter``` components.  ```CWGrid``` was the initial component to receive implementation attention, and refactoring its code was omitted for sake of time.

  - #### Testing

        - Relatively few of the modules were tested.  DOM render testing not was undertaken for components.  This is obviously one of the main drawbacks for maintainability, and typically the additional overhead of testing is not a valid excuse given the risks of untested code.  I caught myself using a sorting function to  compare ```CWWord```s, forgetting the fact that letter order is crucial for determing word equality.
        Untested code risks are especially relevant for the reducer function, which contains all logic for mutating application state over time.  A single uncaught edge case could render the entire game unplayable.

        - The reducer makes heavy use of the ```CWGame``` module, however its switch statement contains relatively simple logic for responding to game actions.  Because the main game logic is related to the crossword, once the stateless ```CWGameState``` & ```CWGameData``` design was determined, the ```CWGame``` module was provided a test suite to validate crossword functionality.

        - To improve on the entire source code's quality, test suites would need to be written for full code coverage.  However, this added friction to reaching a working submission quickly.

        - I'm not a fan of "it just works", leaving assumed non-existant bugs hidden, undiscovered, waiting to reveal themselves.  Ultimately, though, through successive playthroughs, I found that the basic functionality had been implemented without any noticeable erroneous behavior.