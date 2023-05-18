const { defineConfig } = require("cypress");
//const { defineConfig } = require('cypress')
// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
})

module.exports = defineConfig({
  e2e: {

    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    failOnStatusCode: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 100000


  //    baseUrl: "https://pickmy.link",
  //   host:
  //   {"https://pickmy.link":"127.0.0.1"
  //  },
    // setupNodeEvents(on, config) {
    //   require("cypress-localstorage-commands/plugin")(on, config);
    //   return config;
     
      






    // },
  },
});





