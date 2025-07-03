import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    ScrollView, // Import ScrollView
} from 'react-native';

const animalStories = {
    lion: {
        title: 'THE FIRST ROAR OF THE KING OF THE SAVANNAH',
        pages: [
            {
                text: "When I was a young lion cub, I lived on the slopes of the red-orange morning light. I looked hopefully into my mother’s shining eyes and felt a powerful push in my chest: my time would come to show true strength.",
                image: require('../assets/images/f85e9704d0a9f98af9970ff48e1b163024019a37.png'), // Use existing lion image
            },
            {
                text: "For the first time, stepping onto the soft grass, I gathered all the courage in the world and let out a mighty roar that spread across the vast plains. The birds soared into the sky, and the other lion cubs hid behind their mother - they felt that the little son of the king was no longer just a child, but a future ruler.\n\nThat day I learned that true power comes with a voice that can not only sweep away the silence, but also touch the hearts of those who listen.",
                image: require('../assets/images/f85e9704d0a9f98af9970ff48e1b163024019a37.png'), // Use existing lion image
            },
        ],
    },
    zebra: {
        title: 'STRIPED DANCE UNDER THE STARS',
        pages: [
            {
                text: "As dusk falls over the vast grasslands, I, a striped zebra, step out of camp onto the night pasture. My black and white stripes seem to sparkle in the moonlight, creating an optical dance that captivates the gaze of even the most attentive predators.",
                image: require('../assets/images/2652e115ea9a93f61f99f87435602f9f6a13316a.png'), // Zebra image from levelsData
            },
            {
                text: "As I walk, each hoofprint on the soft ground resembles a note in the melody of the savannah, where every sound is a whisper of grass and a quiet splash of a river. I hear the voice of a tribe of antelopes in the distance and feel the common rhythm of life. In this dance lies my strength: stripe by stripe I remind myself and everyone that the union of contrasts creates harmony.\n\nAnd though the ominous sound of lions' footsteps may appear elsewhere, I believe in the protective magic of my pattern—in the darkness, my stripes merge with the world, leaving only mysterious silhouettes that mislead enemies and grant me another night of peaceful wandering under the stars.",
                image: require('../assets/images/2652e115ea9a93f61f99f87435602f9f6a13316a.png'), // Zebra image from levelsData
            },
        ],
    },
    elephant: {
        title: 'THE MARCH OF THE GREAT SAGE',
        pages: [
            {
                text: "When the first orange rays of the sun touch the horizon of the savannah, I, the old elephant leader, set off on a long journey to the watering hole. Each step I take is like a deep drum that echoes across the vast plains, echoing among the acacia trees.",
                image: require('../assets/images/ce2f2f029789c3ef85a8d33d489cd5008fb54f07.png'), // Elephant image from levelsData
            },
            {
                text: "My skin bears the deep scars of territorial battles, but my heart is always open to the young lion cubs and zebras who walk alongside me in the shade of my mighty tusks. During this march, I feel every blade of grass under my feet and listen to the birdsong - for true strength comes from respecting the life around me.\n\nWhen we reach the river, the young ones trumpet loudly, and I know that my knowledge will help them find their way in this wild and beautiful world.",
                image: require('../assets/images/ce2f2f029789c3ef85a8d33d489cd5008fb54f07.png'), // Elephant image from levelsData
            },
        ],
    },
    rhino: {
        title: 'THE STEP OF THE ARMORED GIANT',
        pages: [
            {
                text: "I, the mighty rhinoceros, the guardian of the savannah, wake up before dawn. When the first mists spread over the plains, my heavy footsteps sound like a nabataeh, warning everyone: I am leaving.",
                image: require('../assets/images/e474660680b1fd88cc78fdc252749569e3eb72ec.png'), // Rhinoceros image from levelsData
            },
            {
                text: "My thick skin, scarred by ancient battles, shines with a silvery hue in the soft morning light. Each troop of antelopes and birds stops as I slowly approach the salt flats - a favorite place where I strengthen my body, rolling my horn in the dust.\n\nHere I maintain the peace of the pride, because my task is to protect the young and mark the borders of our land. In this greatness and strength, I feel my true calling: to be a support and protector in the wild and ruthless world of the savannah.",
                image: require('../assets/images/e474660680b1fd88cc78fdc252749569e3eb72ec.png'), // Rhinoceros image from levelsData
            },
        ],
    },
    giraffe: {
        title: 'A CLOSER LOOK FROM ABOVE',
        pages: [
            {
                text: "I, a graceful giraffe-observer of the savannah, emerge among the acacias, stretching my long neck high under the blue sky. My body in golden spots seems to blaze under the midday sun, and my eyes, set high, see more - distant hills lost in the warm mist.",
                image: require('../assets/images/f277a2a1ef1e68ce2bb26d07388078f7d66ce602.png'), // Giraffe image from levelsData
            },
            {
                text: "I walk solemnly on the soft grass, looking around: where small antelopes can hide, where exotic birds fly. When the wind shakes my narrow ears, I feel the pulse of the savannah's life - the silence rises to a whisper, and I become like a beacon of safety for everyone who lives in my field of vision.",
                image: require('../assets/images/f277a2a1ef1e68ce2bb26d07388078f7d66ce602.png'), // Giraffe image from levelsData
            },
        ],
    },
};


const AnimalStoryScreen = ({ route, navigation }) => {
    const { animalId } = route.params;
    const story = animalStories[animalId];
    const [page, setPage] = useState(0);

    return (
        <ImageBackground source={require('../assets/images/09dbac20ad4620b2f75879f3cca5d228cb73420f.png')} style={styles.bg}>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>{story.title}</Text>

                    {/* ScrollView added here to make the content scrollable */}
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Image source={story.pages[page].image} style={styles.image} />
                        <Text style={styles.text}>{story.pages[page].text}</Text>
                    </ScrollView>

                    <Text style={styles.pageIndicator}>Page {page + 1}</Text> {/* Renamed style for clarity */}

                    <View style={styles.nav}>
                        {/* Previous Button - only show if not on the first page */}
                        {page > 0 && (
                            <TouchableOpacity
                                onPress={() => setPage(page - 1)}
                                style={styles.navButton}
                            >
                                {/* Rotated 180 degrees or scaled -1 to make it a left arrow */}
                                <Image source={require('../assets/images/maki_arrow.png')} style={[styles.icon, { transform: [{ scaleX: -1 }] }]} />
                            </TouchableOpacity>
                        )}
                        {/* Empty view to push next button to the right if no previous button */}
                        {page === 0 && <View style={styles.navButtonPlaceholder} />}

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.navButton}
                        >
                            <Image source={require('../assets/images/Group8.png')} style={styles.icon} />
                        </TouchableOpacity>

                        {/* Next Button - only show if not on the last page */}
                        {page < story.pages.length - 1 && (
                            <TouchableOpacity
                                onPress={() => setPage(page + 1)}
                                style={styles.navButton}
                            >
                                {/* Removed scaleX: -1 to make it a right arrow */}
                                <Image source={require('../assets/images/maki_arrow.png')} style={styles.icon} />
                            </TouchableOpacity>
                        )}
                        {/* Empty view to push previous button to the left if no next button */}
                        {page === story.pages.length - 1 && <View style={styles.navButtonPlaceholder} />}
                    </View>
                </View>
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
        padding: 20,
        marginHorizontal: 30,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fae4b2',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        flex: 1, // Allow card to take available space for ScrollView
        maxHeight: '90%', // Limit card height so it doesn't push off-screen
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    scrollContent: {
        alignItems: 'center', // Center content horizontally within ScrollView
        paddingBottom: 10, // Add some padding at the bottom of the scrollable content
    },
    image: {
        width: 320,
        height: 260,
        // borderRadius: 90, // Keeping commented as in original
        // borderWidth: 2, // Keeping commented as in original
        borderColor: '#AC4711',
        resizeMode: 'contain',
        marginVertical: 10,
    },
    text: {
        color: '#5A2A00',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    pageIndicator: { // Renamed from 'page'
        fontSize: 12,
        color: '#333',
        marginTop: 10, // Add some margin from the text
        marginBottom: 10, // Add some margin before nav buttons
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Use full width of the card
        marginTop: 20,
        paddingHorizontal: 10, // Add padding to keep buttons from edges
    },
    navButton: {
        padding: 10,
        borderRadius: 10,
    },
    navButtonPlaceholder: { // New style for empty view to balance buttons
        width: 54 + 20, // Width of icon + padding to match navButton
        height: 54 + 20, // Height of icon + padding
    },
    icon: {
        width: 54,
        height: 54,
    },
});

export default AnimalStoryScreen;
