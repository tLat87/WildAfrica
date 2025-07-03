// AboutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'; // Import ScrollView
import Share from 'react-native-share'; // Assuming you have react-native-share installed

// Background image for the About screen
const backgroundImage = require('../assets/images/144ca4d465753c69b22e7841f1bf456e07c35cc4.png'); // Your existing background
const homeButtonImage = require('../assets/images/Group8.png'); // Your existing home button icon
const gameLogo = require('../assets/images/ec2ed22c10bd9131ca2392114456f08ff7ebfa9d.png'); // You will need to add an image for your game logo

const AboutScreen = ({ navigation }) => {
    // Function to handle sharing the app info
    const handleShare = async () => {
        try {
            const shareOptions = {
                message: 'Discover Wild Africa - Safari Story! An exciting journey through the African savannah with amazing animals and fun facts. Play "Big Bushes" game and share your favorite facts!',
                url: 'https://example.com/wild-africa-app', // Replace with your app's actual URL/store link
                title: 'Wild Africa - Safari Story',
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <Text style={styles.title}>ABOUT</Text>

            {/* ScrollView added here to make the content scrollable */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false} // Hide scroll indicator for cleaner look
            >
                <View style={styles.contentCard}>
                    {/* Game Logo/Header Image */}
                    <Image source={gameLogo} style={styles.gameLogo} />

                    {/* About Text Content */}
                    <Text style={styles.aboutText}>
                        Wild Africa - Safari Story - invites you on an exciting journey through the African savannah
                        through the stories of the inhabitants themselves: an elephant, zebra, lion and rhino.
                        The application contains unique stories from each animal, a collection of interesting facts
                        about them, as well as an interactive mini-game "Big Bushes".
                    </Text>
                    <Text style={styles.aboutText}>
                        Save your favorite facts in "Favorites", share
                        with friends with one touch and test your
                        attentiveness in a fun game.
                    </Text>

                    {/* Share Button */}
                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Text style={styles.shareButtonText}>SHARE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 200}}/>
            </ScrollView>

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
        // paddingTop: 100, // Removed this as paddingTop is now on the title
        backgroundColor: '#f5e4c3',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        paddingTop: 100, // Moved paddingTop to the title
        color: '#FFF', // White color for the title
        marginBottom: 30, // Space between title and content card
    },
    scrollView: {
        flex: 1, // Allow ScrollView to take available space
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center', // Center content horizontally within the scroll view
        paddingBottom: 20, // Add some padding at the bottom of the scrollable content
    },
    contentCard: {
        width: '90%',
        backgroundColor: '#FEFEC6', // Light yellow background for the card
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        // marginBottom: 30, // This margin will be handled by scrollViewContent paddingBottom
    },
    gameLogo: {
        width: 250, // Adjust size as needed
        height: 250, // Adjust size as needed
        resizeMode: 'contain',
        marginBottom: 20,
        borderRadius: 20
    },
    aboutText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 10,
        lineHeight: 22, // Improve readability
    },
    shareButton: {
        backgroundColor: '#4CAF50', // Green button color
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 50,
        elevation: 2,
        marginTop: 20, // Space above the share button
    },
    shareButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    homeButton: {
        position: 'absolute',
        bottom: 20,
        zIndex: 1, // Ensure home button is above scrollable content
        // Existing styles for the back button, if any, will apply
    },
});

export default AboutScreen;
