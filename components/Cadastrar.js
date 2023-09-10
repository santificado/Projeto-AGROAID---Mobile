import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

const api = axios.create(
  { baseURL: "https://projeto-ivern-default-rtdb.firebaseio.com/" }
);

export default function App(props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [lista, setLista] = useState([]);
  const [errorNome, setErrorNome] = useState("");
  const [errorDescricao, setErrorDescricao] = useState("");

  const atualizarLista = () => {
    api.get("/anotacoes.json")
      .then((resp) => {
        const listaNova = [];
        for (const chave in resp.data) {
          const obj = resp.data[chave];
          listaNova.push(obj);
        }
        setLista(listaNova);
      })
  }

  useEffect(() => {
    atualizarLista();

    AsyncStorage.getItem('anotacoesData')
      .then((data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          setLista(parsedData);
        }
      })
      .catch((error) => {
        console.error('Error loading data from AsyncStorage:', error);
      });
  }, []);

  const validar = () => {
    let isValid = true;

    if (!nome) {
      setErrorNome("Nome da Anotação é obrigatório.");
      isValid = false;
    } else {
      setErrorNome("");
    }

    if (!descricao) {
      setErrorDescricao("Descrição é obrigatória.");
      isValid = false;
    } else {
      setErrorDescricao("");
    }

    return isValid;
  };

  const inserir = (obj) => {
    if (validar()) {
      api.post("/users/" + props.logedUser.id + "/anotacoes.json", obj)
        .then((resp) => {
          atualizarLista();

          // Update and save data in AsyncStorage
          const updatedData = [...lista, obj];
          AsyncStorage.setItem('anotacoesData', JSON.stringify(updatedData))
            .then(() => {
              console.log('Data saved in AsyncStorage');
            })
            .catch((error) => {
              console.error('Error saving data to AsyncStorage:', error);
            });
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome da Anotação</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={nome}
          onChangeText={(value) => {
            setNome(value);
            setErrorNome("");
          }}
          style={errorNome ? styles.errorInput : styles.input}
        />
        <Text style={styles.errorMessage}>{errorNome}</Text>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={descricao}
          onChangeText={(value) => {
            setDescricao(value);
            setErrorDescricao("");
          }}
          style={errorDescricao ? styles.errorInput : styles.inputParagraph}
          multiline
          numberOfLines={4}
        />
        <Text style={styles.errorMessage}>{errorDescricao}</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => { const o = { nome, descricao }; inserir(o); setNome(''); setDescricao(''); }}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#353740',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2ecc71',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2ecc71',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#444654',
    color: 'white',
  },
  inputParagraph: {
    borderWidth: 1,
    borderColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#444654',
    color: 'white',
    height: 200,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    backgroundColor: '#27ae60',
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#444654',
    color: 'white',
  },
});
