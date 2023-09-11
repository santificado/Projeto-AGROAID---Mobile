import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View, 
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projeto-ivern-default-rtdb.firebaseio.com/',
});



export default function App(props) {
  const [lista, setLista] = useState([]);

  const atualizarLista = () => {
    api.get('/users/'+ props.logedUser.id+ '/anotacoes.json').then((resp) => {
      const listaNova = [];
      for (const chave in resp.data) {
        const obj = resp.data[chave];
        obj["id"] = chave;

        listaNova.push(obj);
      }
      setLista(listaNova);
    });
  };

  const remover = (obj) => {
    api.delete('/users/'+ props.logedUser.id +'/anotacoes/' + obj.id + '.json').then(() => {
      const newList = [];
      for (const item of lista) {
        if (item.id !== obj.id) {
          newList.push(despesa);
        }
      }
      setLista(newList);
    });
  };

  useEffect(() => {
    atualizarLista();
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {lista.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>

              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemDescription}>
                Descrição: {item.descricao}
              </Text>
            <View style={{right:0}}>
            <FontAwesome5
                name="trash"
                size={18}
                onPress={()=>{remover(item)}}
                style={{color:'#27ae60', marginHorizontal:'95%'}}
              />
              </View>
            </View>
            
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353740',
  },
  innerContainer: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#353740'
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemTextContainer: {
    backgroundColor: '#444654',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#27ae60',
  },
  itemDescription: {
    fontSize: 14,
    color: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    marginVertical: 10,
  },
});
