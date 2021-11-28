import React,{useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	Input,
	Button
} from 'react-native-elements'
import axios from 'axios'
const Register = ({navigation})=>{
	const [user,setUser] = useState('')
	const [pass,setPass] = useState('')
	const [nik,setNik] = useState('')
	const [mess,setMess] = useState(false)
	async function registerbtn (){
	
		await axios.post("http://localhost:8000/user/add",{
			username:user,
			password:pass,
			nik:nik
		}).then((res)=>{
			if(res.data == "data created"){
				setMess(true)
				setUser("")
				setPass("")
				setNik("")
			}
			console.log(res.data)
		})
	}
	return(
		<SafeAreaProvider style={styles.container}>
		<Text  style={{fontSize:30}}>Register {user} {nik} {pass}</Text>
 
        <Input
          placeholder='Username'
          style={{width:20}}
          onChange={(e)=> setUser(e.target.value)}
        />

        <Input
          placeholder='Nik'
          style={{width:20}}
          onChange={(e)=> setNik(e.target.value)}

        />

        <Input
          placeholder='New Password'
          secureTextEntry={true}
          onChange={(e)=> setPass(e.target.value)}

        />
            <Button
          title="Daftar"
          onPress={registerbtn}
        />
        {mess == true && <View> <Text style={styles.suc}>User telah terbuat
          silahkan </Text> <Button type="clear"
          onPress={()=> navigation.navigate("Login")} title="login"/>
          </View> }
          
		</SafeAreaProvider>
		)
}
const styles = StyleSheet.create({
	container:{
		marginTop:50,
		alignItems:"center",
	},
	suc:{
		marginTop:30,
		color:"green",
		fontSize:20
	}
})
export default Register;