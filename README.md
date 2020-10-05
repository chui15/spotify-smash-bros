# Spotify Smash Bros

This is a project that was inspired by [Receiptify](https://receiptify.herokuapp.com/).  It takes the user's top 4 artists from the last month, the last 6 months, or all time and displays them in the Super Smash Bros character select screen format.  This was created for fun so that I could learn how to work with Spotify's API and share something cool with my friends! 

## Installation

Clone the repository and install its dependencies running:

    $ npm install

### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. I registered these Redirect URIs:

* http://localhost:8888 (needed for the implicit grant flow)
* http://localhost:8888/callback

Once you have created your app, replace the `client_id`, `redirect_uri` and `client_secret` in the examples with the ones you get from My Applications.

## Running the examples
In order to run the different examples, open the folder with the name of the flow you want to try out, and run its `app.js` file. For instance, to run the Authorization Code example do:

    $ cd authorization_code
    $ node app.js

Then, open `http://localhost:8888` in a browser.
