
import React from 'react'

import {
    View, 
    Text,
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

interface HistoryButtonInterface {
    canRestoreHistory: boolean;
    restoreHistory: () => void;
}

export function RestoreHistoryButton(props : HistoryButtonInterface) {
    if(props.canRestoreHistory) {
        return (
            <View style={styles.Container}>
                <Touchable 
                    style={styles.ButtonBackground}
                    foreground={Touchable.Ripple('white')}
                    onPress={props.restoreHistory}
                >
                    <Text style={styles.Text}>Restore History</Text>
                </Touchable>
            </View>
        );
    } else {
        return null;
    }
}

const styles = EStyleSheet.create({
    Container:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    ButtonBackground:{
        flex:1,
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    Text:{
        fontSize: '30rem', 
        textAlign: 'center', 
        color: '$textColor',
    },
})