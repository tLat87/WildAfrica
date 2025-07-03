// GameScreen.js
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Modal, ImageBackground} from 'react-native';
import { useDispatch } from 'react-redux';
import {completeLevel} from "../redux/slices/levelSlice";
import Share from 'react-native-share'; // Make sure react-native-share is installed

// Bushes image (remains the same for all levels)
const bushImage = require('../assets/images/b4e88798bb2caf6dbd3450b3cc7259dfe620e8f2.png');
const backgroundImage = require('../assets/images/144ca4d465753c69b22e7841f1bf456e07c35cc4.png');
const backButtonImage = require('../assets/images/Group8.png');

// --- Level Data (Animals and Facts) ---
// Add more levels, animals, and facts here as needed!
const levelsData = [
    {
        level: 1,
        animal: require('../assets/images/f277a2a1ef1e68ce2bb26d07388078f7d66ce602.png'), // Example: Giraffe
        fact: 'Giraffes are the tallest land animals: males reach 5–6 m in height, females 4.5–5 m.\n'

    },
    {
        level: 2,
        animal: require('../assets/images/e474660680b1fd88cc78fdc252749569e3eb72ec.png'), // Example: Rhinoceros
        fact: 'The white rhinoceros has a wide, flat mouth for cutting grass; the black rhinoceros has a pointed one for tearing leaves.\n'
    },
    {
        level: 3,
        animal: require('../assets/images/ce2f2f029789c3ef85a8d33d489cd5008fb54f07.png'), // Example: Elephant
        fact: 'Elephants have the largest brain among land animals - about 5 kg.\n'
    },
    {
        level: 4,
        animal: require('../assets/images/2652e115ea9a93f61f99f87435602f9f6a13316a.png'), // Example: Zebra
        fact: 'Each zebra has a unique pattern of stripes, like human fingerprints.\n'
    },
    {
        level: 5,
        animal: require('../assets/images/2c2a2242b2824b9f507f00e17d41da5193aba40c.png'), // Example: Lion
        fact: 'The lion is the only big cat that forms permanent social groups (prides).\n'
    },
    // You can add more levels by extending this array:
    // {
    //     level: 6,
    //     animal: require('../assets/images/your_animal_6.png'),
    //     fact: 'Ваш новый бонусный факт для уровня 6.',
    // },
];

// --- WinModal Component ---
const WinModal = ({ isVisible, onClose, onShare, level, animalImage, bonusFact, navigation }) => {
    // Function to handle continuing to the next level
    const handleContinue = () => {
        onClose(); // Close the modal
        // Navigate to the next level, generating a new correctBushIndex
        // The animal and fact for the next level will be determined by 'level + 1' in GameScreen
        navigation.push('GameScreen', { level: level + 1, correctBushIndex: Math.floor(Math.random() * 3) });
    };

    // Function to handle sharing the bonus fact
    const handleShare = async () => {
        try {
            const shareOptions = {
                message: `I found an animal in the game! Level ${level}! Bonus fact: ${bonusFact}`,
                // url: 'https://example.com/my-game', // Optional: A URL to share along with the message
                title: 'My game about animals',
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                {/* Changed ImageBackground to View and set background color */}
                <View  style={[modalStyles.modalView, {backgroundColor: '#FEFEC6'}]}>
                    <Text style={modalStyles.roundCompletedText}>ROUND {level} - COMPLETED</Text>
                    <Text style={modalStyles.foundText}>FOUND!</Text>
                    <Image source={animalImage} style={modalStyles.modalAnimalImage} /> {/* Use dynamic animalImage */}
                    <Text style={modalStyles.bonusFactTitle}>BONUS FACT:</Text>
                    <Text style={modalStyles.bonusFactText}>{bonusFact}</Text>

                    <View style={modalStyles.modalButtonRow}>
                        <TouchableOpacity style={modalStyles.modalButton} onPress={handleContinue}>
                            <Text style={modalStyles.modalButtonText}>CONTINUE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.modalButton} onPress={handleShare}>
                            <Text style={modalStyles.modalButtonText}>SHARE</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Back button added to WinModal */}
                    <TouchableOpacity style={modalStyles.modalBackButton} onPress={() => navigation.goBack()}>
                        <Image source={backButtonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// --- LoseModal Component ---
const LoseModal = ({ isVisible, onPlayAgain, onLeave }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onLeave}
        >
            <View style={modalStyles.centeredView}>
                {/* Set background color for LoseModal */}
                <View style={[modalStyles.loseModalView, {backgroundColor: '#FEFEC6'}]}>
                    <Text style={modalStyles.loseText}>You Lost!</Text>
                    <TouchableOpacity style={modalStyles.loseButton} onPress={onPlayAgain}>
                        <Text style={modalStyles.loseButtonText}>Try Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={modalStyles.loseButton} onPress={onLeave}>
                        <Text style={modalStyles.loseButtonText}>Leave</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// --- GameScreen Component ---
const GameScreen = ({ route, navigation }) => {
    // Get current level from route params.
    const { level = 1 } = route.params || {};

    // Use a state for the correct bush index to ensure randomness on initial mount
    const [correctBushIndex, setCorrectBushIndex] = useState(() => {
        // If correctBushIndex is passed via route params and is a number, use it.
        // This covers subsequent levels and "Try Again" scenarios where it's already randomized.
        if (typeof route.params?.correctBushIndex === 'number') {
            return route.params.correctBushIndex;
        }
        // If not passed (e.g., initial app load to GameScreen), generate a random one.
        return Math.floor(Math.random() * 3);
    });

    const [revealedIndex, setRevealedIndex] = useState(null);
    const [showWinModal, setShowWinModal] = useState(false);
    const [showLoseModal, setShowLoseModal] = useState(false);
    const dispatch = useDispatch();

    // Find the data for the current level. If not found, default to the first level's data.
    const currentLevelData = levelsData.find(data => data.level === level) || levelsData[0];
    const currentAnimalImage = currentLevelData.animal;
    const currentBonusFact = currentLevelData.fact;

    const handleBushPress = (index) => {
        // Only allow a press if no modal is visible and the bush hasn't been revealed yet
        if (showWinModal || showLoseModal || revealedIndex !== null) {
            return;
        }

        setRevealedIndex(index); // Show the chosen bush

        if (index === correctBushIndex) {
            dispatch(completeLevel(level)); // Dispatch action to mark level complete
            setTimeout(() => {
                setShowWinModal(true); // Show the win modal
            }, 800); // Small delay for visual effect
        } else {
            setTimeout(() => {
                setShowLoseModal(true); // Show the lose modal
            }, 800); // Small delay for visual effect
        }
    };

    // Function to handle playing again after losing
    const handlePlayAgain = () => {
        setShowLoseModal(false); // Hide the lose modal
        setRevealedIndex(null); // Reset revealed bush
        // Generate a new random correctBushIndex for trying again
        setCorrectBushIndex(Math.floor(Math.random() * 3));
        // No need to navigate.replace here, as state update will re-render
    };

    // Function to handle leaving the game after losing
    const handleLeaveGame = () => {
        setShowLoseModal(false); // Hide the lose modal
        setRevealedIndex(null); // Reset revealed bush
        navigation.goBack(); // Go back to the previous screen (e.g., Home or Level Select)
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <Text style={styles.title}>Find who hid behind the bush!</Text>
            <Text style={styles.round}>round {level}</Text>

            <View style={styles.bushRow}>
                {[0, 1, 2].map((index) => (
                    <TouchableOpacity key={index} onPress={() => handleBushPress(index)} disabled={revealedIndex !== null}>
                        <View style={styles.bushContainer}>
                            {/* Display animal if correctly guessed and this bush, otherwise display bush */}
                            {revealedIndex === index && index === correctBushIndex ? (
                                <Image source={currentAnimalImage} style={styles.animal} /> // Use dynamic animal image
                            ) : (
                                <Image source={bushImage} style={styles.bush} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={backButtonImage} />
            </TouchableOpacity>

            {/* Win Modal Component */}
            <WinModal
                isVisible={showWinModal}
                onClose={() => setShowWinModal(false)}
                level={level}
                animalImage={currentAnimalImage} // Pass dynamic animal image
                bonusFact={currentBonusFact} // Pass dynamic bonus fact
                navigation={navigation} // Pass navigation prop to WinModal
            />

            {/* Lose Modal Component */}
            <LoseModal
                isVisible={showLoseModal}
                onPlayAgain={handlePlayAgain}
                onLeave={handleLeaveGame}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5e4c3',
        width: '100%', // Ensure background covers full width
        height: '100%', // Ensure background covers full height
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        textAlign: 'center',
        position: 'absolute',
        top: 100,
        width: '80%', // Adjust width for better readability on smaller screens
        color: '#333', // Darker text for contrast
    },
    round: {
        fontSize: 26,
        marginBottom: 20,
        fontWeight: '900',
        color: '#AC4711',
        position: 'absolute',
        top: 70,
    },
    bushRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 100, // Adjust margin to accommodate title and round text
    },
    bushContainer: {
        marginHorizontal: 10,
        borderRadius: 10, // Rounded corners for bush container
        overflow: 'hidden', // Clip content if it overflows
    },
    bush: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    animal: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    backButton: {
        position: 'absolute',
        bottom: 50, // Increased bottom margin
        // Removed padding, borderRadius, and backgroundColor as requested
    }
});

// Styles for the Modals
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
    },
    modalView: {
        width: '85%', // Adjust width for better appearance
        height: '70%', // Adjust height for better appearance
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-around', // Distribute content evenly
        overflow: 'hidden', // Ensure image background is clipped
        // Removed resizeMode: 'cover' as ImageBackground is no longer used here
    },
    roundCompletedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#AC4711', // Orange color from screenshot
        marginBottom: 10,
    },
    foundText: {
        fontSize: 48,
        fontWeight: '900',
        color: '#333', // Darker text for contrast
        marginBottom: 10,
    },
    modalAnimalImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    bonusFactTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    bonusFactText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
        marginBottom: 30,
        paddingHorizontal: 10, // Add some padding
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#4CAF50', // Green button color
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 25,
        elevation: 2,
        marginHorizontal: 10,
        flex: 1, // Allow buttons to take equal space
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16, // Changed font size to 16
    },
    // Lose Modal Styles
    loseModalView: {
        width: '70%',
        backgroundColor: '#FEFEC6', // Set background color for LoseModal
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    loseText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF0000', // Red color for 'You Lost!'
    },
    loseButton: {
        backgroundColor: '#FF6347', // Tomato color for lose buttons
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 8,
        width: '80%', // Make buttons a bit wider
        alignItems: 'center',
    },
    loseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    // New style for the back button inside the modal
    modalBackButton: {
        marginTop: 20, // Add some margin from buttons
    }
});

export default GameScreen;
