import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/images/09dbac20ad4620b2f75879f3cca5d228cb73420f.png')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../assets/images/ec2ed22c10bd9131ca2392114456f08ff7ebfa9d.png')}
                    style={styles.logo}
                />

                <MenuButton text="START READ" onPress={() => navigation.navigate('AnimalSelectScreen')} />
                <MenuButton text="🎨 BIG BUSHES" onPress={() => navigation.navigate('GameScreen')} />
                <MenuButton text="SETTINGS" onPress={() => navigation.navigate('SettingsScreen')} />
                {/*<MenuButton text="⭐ FAVORITES" onPress={() => navigation.navigate('FavoritesScreen')} />*/}
                <MenuButton text="COLLECTION" onPress={() => navigation.navigate('CollectionScreen')} />
            </SafeAreaView>
        </ImageBackground>
    );
};

const MenuButton = ({ text, onPress }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <Text style={styles.menuButtonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
    logo: {
        width: 280,
        borderRadius: 20,
        height: 280,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    menuButton: {
        backgroundColor: '#2d5900',
        borderColor: '#f08a24',
        borderWidth: 2,
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#f5deb3',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
