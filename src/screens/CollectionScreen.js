// CollectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';

// Background image for the screen
const backgroundImage = require('../assets/images/144ca4d465753c69b22e7841f1bf456e07c35cc4.png');
const homeButtonImage = require('../assets/images/Group8.png'); // Your existing home button icon

// --- Level Data (Animals and Facts) - Re-used from GameScreen for consistency ---
// This array defines which animal and fact correspond to each level.
// Ensure these paths and data match your GameScreen's levelsData for accurate display.
const levelsData = [
    {
        level: 1,
        animal: require('../assets/images/f277a2a1ef1e68ce2bb26d07388078f7d66ce602.png'), // Giraffe
        fact: 'Giraffes are the tallest land animals: males reach 5–6 m in height, females 4.5–5 m.\n'
    },
    {
        level: 2,
        animal: require('../assets/images/e474660680b1fd88cc78fdc252749569e3eb72ec.png'), // Rhinoceros
        fact: 'The white rhinoceros has a wide, flat mouth for cutting grass; the black rhinoceros has a pointed one for tearing leaves.\n'
    },
    {
        level: 3,
        animal: require('../assets/images/ce2f2f029789c3ef85a8d33d489cd5008fb54f07.png'), // Elephant
        fact: 'Elephants have the largest brain among land animals - about 5 kg.\n'
    },
    {
        level: 4,
        animal: require('../assets/images/2652e115ea9a93f61f99f87435602f9f6a13316a.png'), // Zebra
        fact: 'Each zebra has a unique pattern of stripes, like human fingerprints.\n'
    },
    {
        level: 5,
        animal: require('../assets/images/2c2a2242b2824b9f507f00e17d41da5193aba40c.png'), // Lion
        fact: 'The lion is the only big cat that forms permanent social groups (prides).\n'
    },
    // Add more levels here if you have them in GameScreen and want them to appear in the collection
];

const CollectionScreen = ({ navigation }) => {
    // Get the list of completed levels from Redux store
    const completedLevels = useSelector(state => state.levels.completedLevels);

    // Filter levelsData to show only completed levels
    const caughtAnimals = levelsData.filter(data => completedLevels.includes(data.level));

    // Function to handle sharing a specific animal's fact
    const handleShareFact = async (level, fact) => {
        try {
            const shareOptions = {
                message: `Я узнал новый факт о животном (Уровень ${level}): ${fact}`,
                url: 'https://example.com/wild-africa-app', // Replace with your app's actual URL/store link
                title: 'Wild Africa - Safari Story - Мои факты о животных',
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <Text style={styles.title}>MY COLLECTION</Text>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Display "NO FACTS ADDED" if no animals have been caught */}
                {caughtAnimals.length === 0 ? (
                    <View style={styles.noFactsContainer}>
                        <Text style={styles.noFactsText}>NO FACTS ADDED</Text>
                    </View>
                ) : (
                    // Map through caught animals and display their cards
                    caughtAnimals.map((item) => (
                        <View key={item.level} style={styles.animalCard}>
                            <Image source={item.animal} style={styles.animalImage} />
                            <View style={styles.factContainer}>
                                <Text style={styles.animalFactText}>{item.fact}</Text>
                                <TouchableOpacity
                                    style={styles.shareButton}
                                    onPress={() => handleShareFact(item.level, item.fact)}
                                >
                                    <Text style={styles.shareButtonText}>SHARE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5e4c3',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 36,
        marginTop: 100,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 30,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 80, // Space for the home button at the bottom
    },
    noFactsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50, // Adjust as needed
    },
    noFactsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
    animalCard: {
        flexDirection: 'row', // Layout image and fact horizontally
        backgroundColor: '#FEFEC6', // Light yellow background for the card
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        width: '90%', // Adjust width as needed
        alignItems: 'center', // Vertically align items in the card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    animalImage: {
        width: 100, // Adjust size as needed
        height: 100, // Adjust size as needed
        resizeMode: 'contain',
        marginRight: 15, // Space between image and text
    },
    factContainer: {
        flex: 1, // Allow fact text to take remaining space
        justifyContent: 'center',
    },
    animalFactText: {
        fontSize: 14, // Smaller font for facts to fit
        color: '#555',
        marginBottom: 10, // Space between fact and share button
    },
    shareButton: {
        backgroundColor: '#4CAF50', // Green button color
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignSelf: 'flex-start', // Align button to the left within its container
        elevation: 2,
    },
    shareButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    homeButton: {
        position: 'absolute',
        bottom: 50,
        zIndex: 1, // Ensure home button is above scrollable content
    },
});

export default CollectionScreen;
