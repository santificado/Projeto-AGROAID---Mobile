import * as React from 'react';
import { TouchableOpacity,Text, View, StyleSheet } from 'react-native';


export default function({title, onClick}){
  return(
    <TouchableOpacity style={styles.container} onPress={onClick}>
    <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:'20%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:20,
    backgroundColor:'#00dd99',
    borderWidth:3,
    borderColor:'green',
    marginBottom:10
  },
  txt: {
    fontSize:18,
    fontWeight:'bold '
  },
});