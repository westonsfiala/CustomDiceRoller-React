
import React from 'react';

import 
{
    Text,
    TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function SimpleDieView({imageName, name, size, pressCallback}) {
    return(
        <TouchableOpacity style={{ flexDirection:'column', alignItems:'center', width:size, padding:2}} onPress={() => {pressCallback()}}>
            <Icon style={{flexDirection:'column'}} iconStyle={{marginRight:0}} name={imageName} size={size-2} color="#ffffff"/>
            <Text numberOfLines={3} style={{fontSize:size/4, color:'#ffffff'}}>{name}</Text>
        </TouchableOpacity>
    );
};