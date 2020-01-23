
import Sound from 'react-native-sound';
import ShakeVolumeManager from '../sync/ShakeVolumeManager';

export default class SoundManager {

    private static mInstance = null as SoundManager;

    private mDiceRollNoSilence1 : Sound;
    private mDiceRollQuiet1 : Sound;
    private mDiceRollNoSilence2 : Sound;
    private mDiceRollQuiet2 : Sound;
    private mDiceRollNoSilence3 : Sound;
    private mDiceRollQuiet3 : Sound;
    private mPlayDiceRollNoSilence = true;

    static getInstance() : SoundManager {
        if(SoundManager.mInstance === null) {
            SoundManager.mInstance = new SoundManager();
        }

        return this.mInstance;
    }

    private constructor() {
        this.mDiceRollNoSilence1 = new Sound('diceroll_no_silence.mp3', Sound.MAIN_BUNDLE);
        this.mDiceRollNoSilence2 = new Sound('diceroll_no_silence.mp3', Sound.MAIN_BUNDLE);
        this.mDiceRollNoSilence3 = new Sound('diceroll_no_silence.mp3', Sound.MAIN_BUNDLE);
        this.mDiceRollQuiet1 = new Sound('diceroll_quiet.mp3', Sound.MAIN_BUNDLE);
        this.mDiceRollQuiet2 = new Sound('diceroll_quiet.mp3', Sound.MAIN_BUNDLE);
        this.mDiceRollQuiet3 = new Sound('diceroll_quiet.mp3', Sound.MAIN_BUNDLE);
    }

    playDiceRoll(volume : number) {
        let playVolume = Math.min(volume * ShakeVolumeManager.getInstance().volumeModifier, 1.0);

        if(playVolume <= 0.01) { return; }

        // Swap between the two types of sounds when rolling dice.
        if(this.mPlayDiceRollNoSilence) {
            if(this.mDiceRollNoSilence1.isLoaded() && !this.mDiceRollNoSilence1.isPlaying()) {
                this.mDiceRollNoSilence1.setVolume(playVolume);
                this.mDiceRollNoSilence1.play();
            } else if(this.mDiceRollNoSilence2.isLoaded() && !this.mDiceRollNoSilence2.isPlaying()) {
                this.mDiceRollNoSilence2.setVolume(playVolume);
                this.mDiceRollNoSilence2.play();
            } else if(this.mDiceRollNoSilence3.isLoaded() && !this.mDiceRollNoSilence3.isPlaying()) {
                this.mDiceRollNoSilence3.setVolume(playVolume);
                this.mDiceRollNoSilence3.play();
            }
        } else {
            if(this.mDiceRollQuiet1.isLoaded() && !this.mDiceRollQuiet1.isPlaying()) {
                this.mDiceRollQuiet1.setVolume(playVolume);
                this.mDiceRollQuiet1.play();
            } else if(this.mDiceRollQuiet2.isLoaded() && !this.mDiceRollQuiet2.isPlaying()) {
                this.mDiceRollQuiet2.setVolume(playVolume);
                this.mDiceRollQuiet2.play();
            } else if(this.mDiceRollQuiet3.isLoaded() && !this.mDiceRollQuiet3.isPlaying()) {
                this.mDiceRollQuiet3.setVolume(playVolume);
                this.mDiceRollQuiet3.play();
            }
        }

        this.mPlayDiceRollNoSilence = !this.mPlayDiceRollNoSilence;
    }
}