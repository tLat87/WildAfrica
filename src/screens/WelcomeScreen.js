import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/images/09dbac20ad4620b2f75879f3cca5d228cb73420f.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/ec2ed22c10bd9131ca2392114456f08ff7ebfa9d.png')}
                    style={styles.logo}
                />

                <View style={styles.card}>
                    <Text style={styles.title}>Wild Africa — your new adventures begin here!</Text>
                    <Text style={styles.description}>
                        Immerse yourself in incredible stories from elephant, zebra, lion and rhino. Feel the spirit of the savannah and learn the secrets of wildlife!
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.replace('HomeScreen')}
                    >
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20
    },
    logo: {
        position: 'absolute',
        top: 100,
        width: 250,
        borderRadius: 20,
        height: 250,
        resizeMode: 'contain'
    },
    card: {
        backgroundColor: '#3a1e0cdd',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        color: '#ddd',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default WelcomeScreen;
