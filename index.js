import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Navigator from './src/Navigator'

import storeConfig from './src/Store/storeCongif'

import axios from 'axios'
axios.defaults.baseURL = 'https://instaclone-ca298.firebaseio.com/'

const store = storeConfig()

const Redux = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
