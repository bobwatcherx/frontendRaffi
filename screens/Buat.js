import React,{useState,useEffect} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import {useRecoilState} from 'recoil'
import {textState} from '../store/'

const Buat = ({navigation})=>{
	const [judul,setJudul] = useState('')
	const [jurusan,setJurusan] = useState('')
	const [saveuser,setSaveuser] = useRecoilState(textState)
	
	
	async function submitbtn(){
		if(jurusan && judul == ""){
			console.log("kosong  jurusan judul")
		}
		try{
			await axios.post("http://localhost:8000/add",{
				nama:saveuser.name,
				jurusan:jurusan,
				judul:judul
			}).then((res)=>{
				console.log(res.data)
				if(res.data == "data create"){
					navigation.navigate("Beranda")
				}
			})
		}catch(err){
			console.log(err.message)
		}
	}
	const styles = StyleSheet.create({
		container:{
			marginTop:50,
			alignItems:"center",
			padding:20
		}
})
	return(
		<View>
<View>
<Icon
  name='arrow-left' 
  size={30}
  color="cyan"
style={{marginTop:20,marginLeft:20}}
	onPress={()=>navigation.goBack()}
  />

</View>
		<View style={styles.container}>
			<Text h1
			style={{}}
			>Buat Judul </Text>
			<Input
			  placeholder='Masukkan Judul'
			  onChange={(e)=>setJudul(e.target.value)}
			/>
			<Input
			  placeholder='Jurusan'
			  onChange={(e)=>setJurusan(e.target.value)}

			/>
			<Button
			  title="Kirim Judul"
			  onPress={submitbtn}
			/>

		</View>
		</View>
		)
}

export default Buat;