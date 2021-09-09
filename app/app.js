import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'esteamay/config/environment';
import { initializeApp } from 'firebase/app';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
/*
const firebaseConfig = {
  apiKey: 'AIzaSyAMhrnEu1SbhoHZ8on5SWI79En8eb6U-KU',
  authDomain: 'esteamay-eca8d.firebaseapp.com',
  projectId: 'esteamay-eca8d',
  storageBucket: 'esteamay-eca8d.appspot.com',
  messagingSenderId: '1071522383728',
  appId: '1:1071522383728:web:32fa964c772b235c7031b5',
};

const firebaseApp = initializeApp(firebaseConfig);
*/

loadInitializers(App, config.modulePrefix);
