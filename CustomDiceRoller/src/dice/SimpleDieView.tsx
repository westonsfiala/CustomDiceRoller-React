
import React from 'react';

import 
{
    View,
    Text,
    Image,
} from 'react-native'

import Touchable from 'react-native-platform-touchable';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getRequiredImage } from './DieImageGetter';

export function SimpleDieView({imageID, name, size, pressCallback}) {
    return(
        <Touchable style={{width:size}} background={Touchable.Ripple('white')} onPress={() => {pressCallback()}}>
            <View style={styles.Touch}>
                <Image source={getRequiredImage(imageID)} style={{width:size-2, height:size-2}}/>
                <Text numberOfLines={3} style={[styles.Text, {fontSize:size/4}]}>{name}</Text>
            </View>
        </Touchable>
    );
};

const styles = EStyleSheet.create({
    Touch:{
        flexDirection:'column', 
        alignItems:'center', 
        padding:2
    },
    Text:{
        color:'$textColor'
    }
})