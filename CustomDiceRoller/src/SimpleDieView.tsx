
import React, {} from 'react';

import 
{
    View,
    Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function SimpleDieView({imageName, name}) {
    return(
        <View style={{alignItems:'center'}}>
            <Icon.Button iconStyle={{marginRight:0}} name={imageName} color="#ffffff"/>
            <Text style={{color:'#ffffff'}}>{name}</Text>
        </View>
    );
};