import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AnimalSelectScreen from "./src/screens/AnimalSelectScreen";
import AnimalStoryScreen from "./src/screens/AnimalStoryScreen";
import GameScreen from "./src/screens/GameScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import CollectionScreen from "./src/screens/CollectionScreen";
import BackgroundMusic from "./src/music/BackgroundMusic";

const Stack = createStackNavigator();



export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                        headerTintColor: 'white',
                        headerShadowVisible: false,
                    }}>

                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{}} />
                        <Stack.Screen name="AnimalSelectScreen" component={AnimalSelectScreen} options={{}} />
                        <Stack.Screen name="AnimalStoryScreen" component={AnimalStoryScreen} options={{}} />
                        <Stack.Screen name="GameScreen" component={GameScreen} options={{}} />
                        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{}} />
                        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{}} />
                        <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{}} />


                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}

// <BackgroundMusic/>
