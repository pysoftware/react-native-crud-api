import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ApplicationNavigation} from './app/navigation/ApplicationNavigation';
import {HttpHelper} from './app/httpHelper';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import store from './app/store/index';
enableScreens();

export default function App() {
    const [isReady, setIsReady] = useState(false);

    return (
        <Provider store={store}>
            <ApplicationNavigation/>
        </Provider>
    );
}
