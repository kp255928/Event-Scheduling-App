# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

<br>Make sure to run the code:

### `npm install`

in the client directory<br />

This is the client side of the project.

The client side will display and capture the data needed with backend for our application to work properly.

### `App.js`
This page creates the routes for each site being used

### `index.js`
This page launch the app

### `NavBar.js`
This is the navigation bar for user to switch between routes and search for events using search bar

### `LoginControl.js`
This keep track with whether a user is logged in or not, and check if a user exists from our database or not

### `SignUp.js`
Access this page by going to the directory "/signup" or click on the Log in button on the navbar and click on create account under the form.
This allows user to sign up an account with our app. It is not a bug to display the password out. We are not hiding the password so the user don't have to check if there's a typo with their password.

### `SignIn.js`
Access this page by going to the directory "/signin" or click on the Log in button on the navbar.
This reads the user's username and password and check with backend if the user is registered in our database.

### `Home.js`
Access this page by going to the directory "/" or click on our App's name on the top left.
This display the homepage to the user. Which contains create events, check conflicts, and load for all events in the user's account form database.

### `Invite.js`
Access this page by going to the directory "/invite" or click on the invitation button on the navbar
This allows user to invite another existing user to join an event that current user is in. A error message will display if no specific events found in current user's account. It also allows user to accept or decline the invitation from others. Once accepted, the event will be added to the user's account, and can be displayed in search bar or homepage.

### `SearchBar`
This created the search bar displayed in the navbar. and connect with backend to be functional.

### `index.css`
This contains all the design for the webpage that will be displayed to the client.

### `Calendar.html`
This code compiles, and is the original look for our homepage. But we are suffering to link React app with this html file. So we make a new simple version instead.



In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
