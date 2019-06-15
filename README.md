# Dogs!

Deployed here: https://ptrfrncsmrph.github.io/peter_murphy_simspace_challenge/

### Tools used (aside from TypeScript and React)

- **Sass:** Create React App ships with Sass support as of the 2.0 release, and I've found hot-reloading (without resetting app state) ideal for rapidly iterating on design. 

- **`fp-ts`:** Used this mostly to practice and get familiar with it, so still working out best practices, but I like encapsulating a "possibly loaded" state as
  ```typescript
  interface AppState {
    breeds: Option<Either<ErrorMsg, Breed[]>>;
    ...
  }
  ```
  for example, instead of
  ```typescript
  interface AppState {
    breeds: Breed[];
    fetchingBreeds: boolean;
    errorMessage: string;
    ...
  }
  ```
  as it explicitly makes certain combinations of state impossible.

- **`lodash`:** I pulled in `lodash` and ended up only using one function 😅. That's OK though because I'm only importing that one function so the impact on bundle size is minimal.

### Future considerations

- **Browser support:** I'm using the `fetch` API for AJAX requests because it's a simple browser built-in. I'm also using CSS `grid` because it makes grid-based layouts very easy to implement. Browser support for both those features isn't universal though, so it might be a good idea to either polyfill `fetch` or use a library like `axios`, as well as implement a fallback layout for browsers without `grid` support.

- **Accessibility optimization:** I think the `NavGrid` component falls under the WAI-ARIA "Grid" widget specification, so it would be nice to support the functionality outlined in the spec (with arrow-key navigation at least). I couldn't find a ready-made solution in React and didn't want to make things _less_ accessible by trying to roll my own.

- **Testing:** I manually tested the few edge cases I could think of (failed network connection, breaking changes in Dog API) which is possible given the current scale of the app, but if it were to grow this could use a test suite.

- **State management:** For simplicity I'm just using React's `useReducer` in a Redux-style but it would be nice to replace this with Redux to take advantage of its familiarity and existing tooling (browser DevTools, middleware).