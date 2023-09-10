import { Button, TextInput, Text, View, ImageBackground, ScrollView, Image, Modal, StyleSheet, BackHandler } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CustomButton from './components/CustomButton';
import ChatGPT from './components/ChatGPT';
import Cadastro from './components/Cadastrar';
import Listagem from './components/Listar';
import axios from 'axios';
import RegExp from 'regexp';
import AsyncStorage from '@react-native-async-storage/async-storage';


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const nomeRegex = /^[A-Za-z\s]+$/;
const numeroRegex = /^[0-9]+$/;

const api = axios.create({
  baseURL: 'https://projeto-ivern-default-rtdb.firebaseio.com/',
});

const { Navigator, Screen } = createBottomTabNavigator();

const Perfil = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#1C2120" }}>
      <View style={{ flex: 1, backgroundColor: "#023020" }}>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 7, backgroundColor: "#353740", borderTopRightRadius: 80 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: "#27ae60", marginBottom: 30 }}>{props.logedUser.nome}</Text>
          <Text style={styles.txtPerfil}>{props.logedUser.userName}</Text>
          <Text style={styles.txtPerfil}>{props.logedUser.numero}</Text>
        </View>
      </View>
    </View>
  );
}


export default App = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [logedUser, setLogedUser] = useState();
  const [userList, setUserList] = useState([]);
  const [stateShow, setStateShow] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNome, setErrorNome] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorNumero, setErrorNumero] = useState(false);

  const validar = () => {
    let erro = false;

    if (!emailRegex.test(userName)) {
      setErrorEmail(true);
      erro = true;
    }

    if (!passwordRegex.test(password)) {
      setErrorPassword(true);
      erro = true;
    }

    if (!nomeRegex.test(nome)) {
      setErrorNome(true);
      erro = true;
    }

    if (!numeroRegex.test(numero)) {
      setErrorNumero(true);
      erro = true;
    }

    return !erro;
  }

  const atualizarLista = async () => {
    try {
      const resp = await api.get("/users.json");
      const listaNova = Object.keys(resp.data).map((chave) => ({
        ...resp.data[chave],
        id: chave,
      }));
      setUserList(listaNova);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  useEffect(() => {
    atualizarLista();

    // Check if user data exists in AsyncStorage
    AsyncStorage.getItem('userData')
      .then((userData) => {
        if (userData) {
          const user = JSON.parse(userData);
          setLogedUser(user);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar dados do AsyncStorage:', error);
      });
  }, []);

  const inserir = async (userData) => {
    try {
      const resp = await api.post("/users.json", userData);
      atualizarLista();
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  }

  const error = StyleSheet.create({
    email: {
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    borderWidth: 1,
    borderColor: errorEmail ? 'red' : 'gray',
    placeholderTextColor:errorEmail ? 'red' : 'black',
    width:300, 
    height:70,
    marginBottom:15   
  },
    password: {
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    borderWidth: 1,
    borderColor: errorPassword ? 'red' : 'gray',
    placeholderTextColor:errorPassword ? 'red' : 'black',
    width:300, 
    height:70,
    marginBottom:15   
  },
    nome: {
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    borderWidth: 1,
    borderColor: errorNome ? 'red' : 'gray',
    placeholderTextColor:errorNome ? 'red' : 'black',
    width:300, 
    height:70,
    marginBottom:15   
  },
    numero: {
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    borderWidth: 1,
    borderColor: errorNumero ? 'red' : 'gray',
    placeholderTextColor:errorNumero ? 'red' : 'black',
    width:300, 
    height:70,
    marginBottom:15   
  },
})


  return(
      <NavigationContainer independent={true}>
      <View style ={{flex:1}}>
          <Modal visible={!logedUser}>
            <View style={{flex:1, backgroundColor:"#023020"}}>
              <View style={{flex:2}}/>
              <View style ={{flex:7, backgroundColor: "lightcyan", borderTopRightRadius:70}}>
                <Text style={{ fontSize:35, fontWeight:'bold', textAlign:'center'}} aling="center">LOGIN</Text>
                <Text style={{color:'gray', textAlign:'center', marginBottom:50}} aling="center">Faça Login para continuar</Text>
                <Text style={{ fontSize:20, color:'gray',  marginBottom:5, marginHorizontal:'5%'}}>E-mail</Text>
                <TextInput style={styles.txtBox1} value={userName} onChangeText={setUserName} placeholder='digite seu e-mail'/>
                <Text style={{ fontSize:20, color:'gray',marginBottom:5, marginHorizontal:'5%'}}>Senha</Text>
                <TextInput style={styles.txtBox2} value={password} onChangeText={setPassword} placeholder='digite sua senha' />
                <CustomButton  title={'LOGIN'} onClick={() => {let achou = false
                          for (let i = 0; i < userList.length; i++) {
                            const item = userList[i];
                            if (item.userName === userName 
                                && item.password === password) {
                                  setLogedUser(item)
                                  achou = true;
                    
                                  break;
                                  
                            }
                          }
                          if (!achou) { 
                            alert("Usuario ou senha estao incorretos")
                          }
                        
                        }}/>
                <CustomButton  title={'REGISTRAR'} onClick={()=>{setStateShow(true)
                                                                  setUserName("")
                                                                  setPassword("")
                                                                  setNome("")
                                                                  setNumero("")}}/>
              </View>
            </View>
          </Modal>  
          <Modal visible={stateShow}>
            <View style={{backgroundColor:'#000000aa', flex: 1}}>
              <View style={{backgroundColor:'#ffffff',  flex:1}}>
                <View style={{flex:1, backgroundColor:"#023020"}}>
              <View style={{flex:2}}/>
              <View style ={{flex:7, backgroundColor: "lightcyan", borderTopRightRadius:70}}>
                <Text style={{ fontSize:35, fontWeight:'bold', textAlign:'center'}} aling="center">REGISTRO</Text>
                <Text style={{color:'gray', textAlign:'center', marginBottom:10}} aling="center">Crie sua conta</Text>
                <Text style={{ fontSize:15, color:'gray',marginBottom:5, marginHorizontal:'5%'}}>Nome</Text>
                <TextInput style={error.nome} 
                            value={nome} 
                            onChangeText={(value)=>{setNome(value); setErrorNome(false)}} 
                            placeholder={errorNome ? 'Nome Obrigatório' : 'Digite seu Nome'}                            
                />
                <Text style={{ fontSize:15, color:'gray',marginBottom:5, marginHorizontal:'5%'}}>Telefone</Text>
                <TextInput style={error.numero} 
                            value={numero} 
                            onChangeText={(value)=>{setNumero(value); setErrorNumero(false)}} 
                            placeholder={errorNumero ? 'Telefone Obrigatório' : 'Digite seu Telefone'}                            
                />
                <Text style={{ fontSize:15, color:'gray',  marginBottom:5, marginHorizontal:'5%'}}>E-mail</Text>
                <TextInput style={error.email} 
                            value={userName} 
                            onChangeText={(value)=>{setUserName(value); setErrorEmail(false)}} 
                            placeholder={errorEmail ? 'E-mail Obrigatório' : 'Digite seu E-mail'}  
                                                     
                />
                <Text style={{ fontSize:15, color:'gray',marginBottom:5, marginHorizontal:'5%'}}>Senha</Text>
                <TextInput style={error.password} 
                            value={password} 
                            onChangeText={(value)=>{setPassword(value); setErrorPassword(false)}}  
                            placeholder={errorPassword ? 'Senha Obrigatória' : 'Digite sua Senha'}  
                />
                <CustomButton  title={'CRIAR CONTA'} onClick={()=>{if(validar()){
                                                                  const o = {userName, password, nome, numero};  
                                                                  inserir(o);
                                                                  alert("Usuario registrado com sucesso")
                                                                  setUserName("")
                                                                  setPassword("")
                                                                  setNome("")
                                                                  setNumero("")}}
                }/>
                <CustomButton  title={'VOLTAR'} onClick={()=>{setStateShow(false)
                                                                  setUserName("")
                                                                  setPassword("")
                                                                  setNome("")
                                                                  setNumero("")
                                                                  setErrorEmail(false)
                                                                  setErrorPassword(false)
                                                                  setErrorNome(false)
                                                                  setErrorNumero(false)}}/>
              </View>
            </View>
              </View>
            </View>          
          </Modal>
              <View style={{flex:1}}>
          <Navigator  screenOptions={{ headerShown: false, tabBarLabelStyle:{display: "none"},tabBarStyle:{backgroundColor:'#27ae60', height:70}, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'black' }} >
            <Screen name="Cadastro" options={{tabBarIcon: 
                  (props)=><AntDesign name="pluscircle" {...props} />}}>{(props)=><Cadastro {...props} logedUser={logedUser}/>}</Screen>
            <Screen name="Listagem" options={{tabBarIcon: 
                  (props)=><Feather name="list" {...props} />}}>{(props)=><Listagem {...props} logedUser={logedUser}/>}</Screen>
            <Screen name="chat" options={{tabBarIcon: 
                  (props)=><Entypo name="chat" {...props} />}}>{()=><ChatGPT/>}</Screen>
            <Screen name="Perfil" options={{tabBarIcon: 
                    (props)=><Ionicons name="person" {...props} />}}>{(props)=><Perfil {...props} logedUser={logedUser}/>}</Screen>
          </Navigator> 
        </View>
      </View>
    </NavigationContainer>
  )


}




const styles =  StyleSheet.create({
  txtBox1:{
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    width:300, 
    height:30,
    marginBottom:15    
  },
  txtBox2: {
    marginHorizontal:10,
    backgroundColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30, 
    width:300, 
    height:30,
    marginBottom:50   
  },
  txtPerfil:{
    backgroundColor:'#27ae60', 
    color:'white',                 
    fontWeight:'bold', 
    textAlign:'center', 
    fontSize:20, 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10, 
    width:300, 
    height:40, 
    marginTop:70,
     marginHorizontal:'5%'
    },
  
});










