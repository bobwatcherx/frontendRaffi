import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  Button,
  Input
 } from 'react-native-elements';
import axios from 'axios'
import {useRecoilState} from 'recoil'
import {textState} from '../store/'
export default function Login({navigation}) {
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const [msg,setMsg] = useState(false)
  const [saveuser,setSaveuser] = useRecoilState(textState)

  // useEffect(()=>{
  //   if(saveuser == []){
  //     navigation.navigate("Login")
  //   }
  // },[saveuser])
  async function ceklogin(){
   try{
     await axios.post("http://localhost:8000/user/login",{
      username:user,
      password:pass
    }).then((res)=>{
      let result = res.data;
      if(res.data.status == "found"){
        let main = result.data.forEach((p)=>{
        setSaveuser({"name":p.username,"nik":p.nik,"active":p.active})
        })
        if(!saveuser == []){
        navigation.navigate("Beranda")

        }
        console.log(JSON.stringify(saveuser))
      }
    })
  }catch(err){
    setMsg(true)
  }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login </Text>
        {msg == true && <Text style={{color:'red'}}>Username dan Password salah ..</Text>}
        <Input
          placeholder='Username'
          style={{width:20}}
          onChange={(e)=> setUser(e.target.value)}

        />

        <Input
          placeholder='Password'
          secureTextEntry={true}
          onChange={(e)=> setPass(e.target.value)}

        />
            <Button
          title="Login"
          onPress={ceklogin}
        />
          <Button
          title="Belum punya akun? Daftar"
          type="clear"
          onPress={()=>navigation.navigate('Register')}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:50
  },
  heading:{
    fontSize:30,
  }
});
