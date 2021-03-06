'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'esteamay',
    environment,
    rootURL: '/',
    locationType: 'auto',

    firebaseConfig: {
      apiKey: 'AIzaSyAMhrnEu1SbhoHZ8on5SWI79En8eb6U-KU',
      authDomain: 'esteamay-eca8d.firebaseapp.com',
      projectId: 'esteamay-eca8d',
      storageBucket: 'esteamay-eca8d.appspot.com',
      messagingSenderId: '1071522383728',
      appId: '1:1071522383728:web:32fa964c772b235c7031b5',
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
