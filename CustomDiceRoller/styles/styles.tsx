import {
    StyleSheet
} from 'react-native'

export const styles = StyleSheet.create({
    AppBackground: {
      flex:1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor:'#3f3f3f', // Dark Theme
    },
    flexRow: {
      flex: 1, 
      flexWrap: 'wrap',
      alignContent: 'center',
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red'
    },
    flexColumn: {
      flex: 1, flexDirection: 'column',
      padding: 10, backgroundColor: 'blue'
    },
    AppBarStyle: {
        flex:1
    }
  });