
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
          let timeoutVar = setTimeout(() => ( setShown(!shown) ), 1000);

          return () => clearTimeout(timeoutVar);
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