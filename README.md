# Will Ling Stan React Challenge

## Libraries/Technology Used
- Typescript
- Babel
- Webpack
- Jest (with react-testing-library)
- Styled Components
- React Router

## Installation
Install dependencies by running `npm i`

## Running Tests
The command to run the test suite is `npm run test`. 

You can also run with coverage with `npm run test:coverage`

## Running locally
You can run locally with `npm run dev`

## Production build
You can make a production build with `npm run build`. This will output the following 4 files into the `dist` folder

- app.js
- styles.css
- logo.svg
- index.html

# Architechtural decisions

## State management
The quick and easy way to manage state is just to have a top-level `useState` hook but this will quickly blow out of control as the app scales. Furthermore, you'll be heavily reliant on prop drilling which despite looking ugly, can make debugging quite difficult

I decided to store all the program data and relevant functions for updating the data in a context which is then provided to all the components that require it at the top level. This reduces clutter as all state management is in one place. 

## Data fetching
I made a hook that is called in the context file mentioned above. I'm a big fan of the `react-query` library by Tanstack as it provides simple data fetching and error handling out of the box with a few simple hooks. I aimed to replicate this with my `useFetchPrograms` hook, while also adding in memoization to improve performance

## Routing
I wanted to avoid using `react-router` if possible but I couldn't think of a way to get different programs to load with their ID without passing it through the url

## Error handling
To keept things simple, I added a boolean error state to the context. This error state would change to true if the data failed to fetch or the user lands on a program url that doesn't exist. Once this was triggered it would load the hard-coded error component

## Styling with styled-components
I definitely have a bias towards styled-components because I've been using it for most of my professional career. I find that they are a cleaner way to create components, especially when the principle of Atomic design is being followed properly. 

I've also once worked for a company with a legacy app that had old `.scss` files everywhere. It was an absolute mission to make small changes to components as you had to make sure you didn't break anything by changing the class name. Sometimes class-names you want were already taken and it would cause a clash.

## Testing
It's quite unconventional to use Jest without react-testing-library or mocha for the following reasons:
1. Jest by itself does not provide an easy way to interact with the DOM or simulate user events. Libraries like React Testing Library build on top of Jest to provide utilities that allow tests to interact with rendered components as users would, such as firing events or querying the DOM.
2. React Testing Library is designed to work seamlessly with React's patterns and practices. It includes utilities for handling React's asynchronous nature, such as hooks and state updates.
3. Without the utilities provided by React Testing Library, you might miss out on the abstractions that handle updates to the DOM or component lifecycle events, leading to tests that don't accurately reflect the user experience.

This is why I strongly believe that using react testing library with jest is a case of best practice in this scenario

Within these unit tests I am testing for rendering and component structure, user interaction and events, functionality, and accessiblity.

## File Structure
I followed a component and logic based structure where core functionality (hooks, components, etc) have their own folder containing all related files (JSX, CSS, tests). I strived to make components modular and reusable while also using clear and consistent naming. 

# Improvements that can be made
- When pressing `backspace` from a selected program, the homepage opens but it doesn't retain the scroll position of your previous selection. I would like to fix that
- I'm not a big fan of what I've done for the error handling. I would rather have dynamic messages that would display depending on the issue
  

# Things that I would do differently given more time
- I got lazy with typescript and didn't properly add an interface to everything given the time limit. I would properly type everything
- I would fix the scroll memory issue I mentioned above
- I'd improve the error handling 
- I'd improve the carousel to work with the mouse when hovering over images
- Cleaning up the CSS so things are better aligned would be nice too

# Functionality I would add if technology and time allowed
- I would create a simple e2e test in playwright or cypress. I prefer e2e testing over over a high coverage of unit tests because it makes refactoring quite easy. Plus, it could also be a good source of documentation for the flow
- I'd add commit hooks to automate most of the workflow
- I would spin up a mock server for the mock `data.json` file so that it could be used in the production build


