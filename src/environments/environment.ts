// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:5000/schools-io-d0066/us-central1",
  apiBaseUrlD: "http://localhost:8010/schools-io-d0066/us-central1",
  prodApiBaseUrl: "https://us-central1-schools-io-d0066.cloudfunctions.net",
  firebase: {
    apiKey: "AIzaSyBKAQAy4yb1BpE-eoMjFg_ZRFALUhejg8U",
    authDomain: "schools-io-d0066.firebaseapp.com",
    databaseURL: "https://schools-io-d0066.firebaseio.com",
    projectId: "schools-io-d0066",
    storageBucket: "schools-io-d0066.appspot.com",
    messagingSenderId: "276194740345",
    appId: "1:276194740345:web:715ed962a8565d6f9ceca8",
    measurementId: "G-RS2ZSDQDWC"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
