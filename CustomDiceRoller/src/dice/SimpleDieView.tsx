
import React from 'react';

import 
{
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import { getRequiredImage } from './DieImageGetter';

export function SimpleDieView({imageID, name, size, pressCallback}) {
    return(
        <TouchableOpacity style={{ flexDirection:'column', alignItems:'center', width:size, padding:2}} onPress={() => {pressCallback()}}>
            <Image source={getRequiredImage(imageID)} style={{width:size-2, height:size-2}}/>
            <Text numberOfLines={3} style={{fontSize:size/4, color:'#ffffff'}}>{name}</Text>
        </TouchableOpacity>
    );
};