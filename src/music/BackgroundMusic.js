import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';

const BackgroundMusic = () => {
    const isMusicOn = useSelector(state => state.settings.isMusicOn);
    const [backgroundMusic, setBackgroundMusic] = useState(null);

    useEffect(() => {
        if (isMusicOn) {
            const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    return;
                }

                music.setNumberOfLoops(-1);
                music.setVolume(0.5);
                music.play((success) => {
                    if (!success) {
                        console.log('Error');
                    }
                });

                setBackgroundMusic(music);
            });
        } else {
            if (backgroundMusic) {
                backgroundMusic.stop(() => backgroundMusic.release());
                setBackgroundMusic(null);
            }
        }

        return () => {
            if (backgroundMusic) {
                backgroundMusic.stop(() => backgroundMusic.release());
                setBackgroundMusic(null);
            }
        };
    }, [isMusicOn]);

    return null;
};

export default BackgroundMusic;
