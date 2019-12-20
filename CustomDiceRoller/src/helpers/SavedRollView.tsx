
import React from 'react'

import {
    View, 
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Roll} from '../dice/Roll';
import RollManager from '../sync/RollManager';

interface SavedRollInterface {
    roll: Roll;
    displayRoll: (roll : Roll) => void;
}

export function SavedRollView(props : SavedRollInterface) {
   
    return (
        <View style={styles.ButtonContainer}> 
            <Touchable 
                style={styles.ButtonBackground}
                foreground={Touchable.Ripple('white')}
                onPress={() => props.displayRoll(props.roll)}
                delayLongPress={300}
                onLongPress={() => RollManager.getInstance().removeRoll(props.roll)}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={styles.TextBackground}>
                        <Text style={styles.RollName}>{props.roll.mRollName}</Text>
                        <Text style={styles.RollDetails}>{props.roll.getDetailedRollName()}</Text>
                    </View>
                    <View>
                        <Touchable 
                            style={styles.ButtonBackground}
                            foreground={Touchable.Ripple('white')}
                            onPress={() => null}
                            delayLongPress={300}
                            onLongPress={() => null}
                        >
                            <Icon 
                                name='information-outline'
                                size={styles.IconConstants.width}
                                color={styles.IconConstants.color}
                            />
                        </Touchable>
                    </View>
                </View>
            </Touchable>
        </View>
    );
}

const styles = EStyleSheet.create({
    TextBackground:{
        flex:1,
        marginLeft:10,
        marginBottom:5
    },
    IconConstants:{
        width:'48rem',
        color:'$textColor',
        backgroundColor:'transparent'
    },
    ButtonBackground:{
        flex:1,
        justifyContent:'center',
        backgroundColor: '$primaryColorLightened',
        borderRadius: '10rem',
        overflow:'hidden'
    },
    ButtonContainer:{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '5rem',
    },
    RollName:{
        fontSize: '20rem', 
        color: '$textColor',
    },
    RollDetails:{
        fontSize: '15rem', 
        color: '$textColorDarkened',
    },
})