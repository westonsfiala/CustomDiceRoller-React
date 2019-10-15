
import React, {
    useState,
    useEffect,
  } from 'react';
  
import {
    Text,
  } from 'react-native';

export function Blink({text}) {
    const [shown, setShown] = useState(true);
  
    useEffect(
      () => {
        setTimeout(() => (
          setShown(!shown)
          ), 1000);
        }
      );
  
    if(shown) {
      return (
        <Text>{text}</Text>
      )
    };
  
    return (
      <Text />
    )
  }