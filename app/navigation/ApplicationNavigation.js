import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    TransitionSpecs,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import {HomeScreen} from '../views/HomeScreen';
import {ProfileScreen} from '../views/ProfileScreen';
import {ListScreen} from '../views/ListScreen';
import {AddScreen} from '../views/AddScreen';

const Stack = createStackNavigator();

export const ApplicationNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen"
                             screenOptions={{
                                 gestureEnabled: true,
                                 cardOverlayEnabled: true,
                                 // FadeFromBottomAndroid
                                 ...TransitionPresets.FadeFromBottomAndroid,
                                 gestureDirection: 'horizontal',
                             }}
                             mode="modal"
                             headerMode="none">

                <Stack.Screen name="AddScreen" component={AddScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
                <Stack.Screen name="ListScreen" component={ListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
