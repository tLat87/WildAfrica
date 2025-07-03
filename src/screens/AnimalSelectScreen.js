import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    FlatList,
} from 'react-native';

const animals = [
    { id: 'lion', name: 'Lion', image: require('../assets/images/2c2a2242b2824b9f507f00e17d41da5193aba40c.png') },
    { id: 'zebra', name: 'Zebra', image: require('../assets/images/2652e115ea9a93f61f99f87435602f9f6a13316a.png') },
    { id: 'elephant', name: 'Elephant', image: require('../assets/images/ce2f2f029789c3ef85a8d33d489cd5008fb54f07.png') },
    { id: 'rhino', name: 'Rhino', image: require('../assets/images/e474660680b1fd88cc78fdc252749569e3eb72ec.png') },
    { id: 'giraffe', name: 'Giraffe', image: require('../assets/images/f277a2a1ef1e68ce2bb26d07388078f7d66ce602.png') },
];

const AnimalSelectScreen = ({ navigation }) => {
    const handleSelect = (animal) => {
        navigation.navigate('AnimalStoryScreen', { animalId: animal.id });
    };

    return (
        <ImageBackground  source={require('../assets/images/09dbac20ad4620b2f75879f3cca5d228cb73420f.png')}
                                     style={styles.bg}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>CHOOSE AN ANIMAL</Text>
                <FlatList
                    data={animals}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelect(item)}
                            style={styles.animalCard}
                        >
                            <Image source={item.image} style={styles.animalImage} />
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.homeButton}>
                    <Image source={require('../assets/images/Group8.png')} style={styles.icon} />
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    grid: {
        alignItems: 'center',
    },
    animalCard: {
        backgroundColor: '#2d5900',
        margin: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#DEEF02',
        borderRadius: 12,
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animalImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    homeButton: {
        position: 'absolute',
        bottom: 30,
    },
    icon: {
        width: 80,
        height: 80,
    },
});

export default AnimalSelectScreen;
