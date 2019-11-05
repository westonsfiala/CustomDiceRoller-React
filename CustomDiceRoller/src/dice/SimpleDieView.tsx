
import React from 'react';

import 
{
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import { getRequiredImage } from './DieImageGetter';
import EStyleSheet from 'react-native-extended-stylesheet';

export function SimpleDieView({imageID, name, size, pressCallback}) {
    return(
        <TouchableOpacity style={[styles.Touchable, {width:size}]} onPress={() => {pressCallback()}}>
            <Image source={getRequiredImage(imageID)} style={{width:size-2, height:size-2}}/>
            <Text numberOfLines={3} style={[styles.Text, {fontSize:size/4}]}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    Touchable:{
        flexDirection:'column', 
        alignItems:'center', 
        padding:2
    },
    Text:{
        color:'$textColor'
    }
})