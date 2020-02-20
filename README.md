# Sample Single Page Application using [Next.JS](https://nextjs.org/)

This project is an exercise in my study of NextJS and ReactJS.<br>

* Main objective is to make a Single Page Application using NextJS.
* Secondary objective includes using Redux to handle data and Materialize CSS for layout. 

## Description

Sample Quiz Application<br><br>

* The quiz data is taken from individual question files in
JSON format for convenience.<br>
The number of questions shown is controlled in next.config.js file.

* The quiz data is managed using [Redux](https://react-redux.js.org/) + [ImmutableJS](https://immutable-js.github.io/immutable-js/docs/#/).

* The layout and styling is done by [material-ui](https://material-ui.com/).


## Available Scripts

In the project directory, you can run:

### `npm install`

To install the required modules.

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Known Bug

During dev, sometimes the banner image in the Welcome component is not shown when you reload the page.<br>
Browser console throws the following error.

> Warning: Prop `className` did not match. Server: "MuiCardMedia-root makeStyles-media-104" Client: "MuiCardMedia-root makeStyles-media-31