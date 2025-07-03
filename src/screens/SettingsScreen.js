// SettingsScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMusic, deleteData } from '../redux/slices/settingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearLevels} from "../redux/slices/levelSlice"; // For deleting data (You already have this installed)

// Background image for the settings screen
const backgroundImage = require('../assets/images/144ca4d465753c69b22e7841f1bf456e07c35cc4.png');
const homeButtonImage = require('../assets/images/Group8.png'); // Assuming this is your home button icon

// Music icons
const musicOnIcon = require('../assets/images/Group18.png'); // Path to your 'music on' image
const musicOffIcon = require('../assets/images/Group19.png'); // Path to your 'music off' image
const deleteIcon = require('../assets/images/Groupff18.png'); // Path to your 'delete' icon image

const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // Get music state from Redux
    const isMusicOn = useSelector(state => state.settings.isMusicOn);

    // No useEffect for music playback here, as it's handled externally now.

    // Custom alert function to replace native Alert
    const showAlert = (title, message, buttons) => {
        Alert.alert(title, message, buttons);
    };

    // Handle toggling music
    const handleToggleMusic = () => {
        dispatch(toggleMusic());
    };

    // Handle deleting data
    const handleDeleteData = async () => {
        showAlert(
            'Delete Data',
            'Are you sure you want to delete all data? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            dispatch(clearLevels()); // Dispatch action to acknowledge data deletion in Redux
                            console.log('All data cleared successfully!');
                            showAlert('Success', 'All data has been successfully deleted!');
                        } catch (error) {
                            console.error('Error clearing data:', error);
                            showAlert('Error', 'An error occurred while deleting data.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <Text style={styles.title}>SETTINGS</Text>

            {/*<View style={styles.optionContainer}>*/}
            {/*    <Text style={styles.optionText}>MUSIC</Text>*/}
            {/*    <View style={styles.buttonGroup}>*/}
            {/*        <TouchableOpacity*/}
            {/*            style={[styles.musicButton, isMusicOn ? styles.activeButton : styles.inactiveButton]}*/}
            {/*            onPress={() => isMusicOn ? null : handleToggleMusic()} // Only toggle if currently off*/}
            {/*        >*/}
            {/*            <Image source={musicOnIcon} style={styles.musicIcon} />*/}
            {/*        </TouchableOpacity>*/}
            {/*        <TouchableOpacity*/}
            {/*            style={[styles.musicButton, !isMusicOn ? styles.activeButton : styles.inactiveButton]}*/}
            {/*            onPress={() => isMusicOn ? handleToggleMusic() : null} // Only toggle if currently on*/}
            {/*        >*/}
            {/*            <Image source={musicOffIcon} style={styles.musicIcon} />*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</View>*/}

            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>DELETE DATA</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteData}>
                    <Image source={deleteIcon} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>

            {/* Home button */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.goBack()}>
                <Image source={homeButtonImage} />
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center',
        backgroundColor: '#f5e4c3',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        paddingTop: 100,
        color: '#FFF', // White color for the title
        marginBottom: 50,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#FEFEC6', // Light yellow background
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    optionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#AC4711', // Orange color from your screenshot
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    musicButton: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#4CAF50', // Green for active (ON)
        // Add a subtle border or shadow for active state
        borderColor: '#388E3C',
        borderWidth: 2,
    },
    inactiveButton: {
        backgroundColor: '#D3D3D3', // Gray for inactive (OFF)
        borderColor: '#A9A9A9',
        borderWidth: 2,
    },
    musicIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: 'white', // Ensure icons are white
    },
    deleteButton: {
        backgroundColor: '#FF0000', // Red for delete
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    deleteIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    homeButton: {
        position: 'absolute',
        bottom: 50,
        // Existing styles for the back button, if any, will apply
    },
});

export default SettingsScreen;
