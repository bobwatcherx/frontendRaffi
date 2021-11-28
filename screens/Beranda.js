import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {useRecoilState} from 'recoil'
import {textState} from '../store/'
import {Button} from 'react-native-elements'
const Beranda = ({navigation})=> {
	const [saveuser,setSaveuser] = useRecoilState(textState)
	const [user,setUser] = useState([])
	// useEffect(()=>{
	// 	if(!saveuser){
	// 		navigation.navigate("Login")
	// 	}
	// },[saveuser])
useEffect(()=>{
	if(saveuser == []){
		navigation.navigate("Login")
	}
	console.log("hasilnua" + JSON.stringify(saveuser))
})	
const styles = StyleSheet.create({
	container:{
		marginTop:50,
		alignItems:"center",
	},
	navbar:{
		backgroundColor:"purple",
		padding:20,

	}
})

	return(
		<View >
		<View style={styles.navbar}>
			<Text 
			style={{color:"white",fontSize:20}}
			>Beranda</Text>
		</View>
		<View style={styles.container}>
		<Text style={{fontSize:30}}>Hello {saveuser.name}</Text>
		<Text style={{fontSize:15,color:'grey'}}>Nik {saveuser.nik}</Text>
		</View>
		<View style={{marginTop:60,alignItems:"center"}}>
		<Button title="Buat judul"
		style={{width:100}}
		onPress={()=> navigation.navigate("Buat")}
		/>
		</View>
		</View>
		
		)


}
export default Beranda;
