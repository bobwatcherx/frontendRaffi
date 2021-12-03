import React,{useEffect,useState} from 'react'
import {View,ScrollView,Text,StyleSheet} from 'react-native'
import {useRecoilState} from 'recoil'
import {textState} from '../store/'
import {Button,Card} from 'react-native-elements'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import useSWR from 'swr'

const Beranda = ({navigation})=> {
	const [saveuser,setSaveuser] = useRecoilState(textState)
	const [user,setUser] = useState([])
	const [posting,setPosting] = useState([])
	const fetcher = (...args) => fetch(...args).then(res => res.json())

	// useEffect(()=>{
	// 	if(!saveuser){
	// 		navigation.navigate("Login")
	// 	}
	// },[saveuser])
		let jump = []
useEffect(async()=>{
	if(saveuser == []){
		navigation.navigate("Login")
	}
	await axios.get("http://localhost:8000/skripsi/" +  saveuser.name).then((res)=>{
		setPosting(res.data.data)
	})
	// console.log("hasilnua" + JSON.stringify(saveuser))
},[])	

async function reloadpage(){
	await axios.get("http://localhost:8000/skripsi/" +  saveuser.name).then((res)=>{
		setPosting(res.data.data)
	})
}	
		console.log("posing " + JSON.stringify(posting))
const styles = StyleSheet.create({
	container:{
		marginTop:50,
		alignItems:"center",
	},
	navbar:{
		backgroundColor:"purple",
		padding:20,

	},
	Heading:{
		fontSize:20,
		textAlign:"center",
		marginTop:30,
	},
	edit:{
		backgroundColor:"orange",
		width:60,
		marginTop:20
	},
	delete:{
		backgroundColor:"red",
		width:80,
		marginTop:20
	}
})

	return(
		<ScrollView >
		<View style={styles.navbar}>
			<Text 
			style={{color:"white",fontSize:20}}
			>Beranda</Text>
		</View>
		<View style={styles.container}>
		<Icon name="user" size={45}/>
		<Text style={{fontSize:30}}>Hello {saveuser.name}</Text>
		<Text style={{fontSize:15,color:'grey'}}>Nik {saveuser.nik}</Text>
		</View>
		<View style={{marginTop:60,alignItems:"center"}}>
		<Button title="Buat judul"
		style={{width:100}}
		onPress={()=> navigation.navigate("Buat")}
		/>
		</View>
		<Text style={styles.Heading}>Skripsi Anda</Text>
		<Button type="clear" title="Reload halaman"
		onPress={reloadpage}/>
		<View>
			{posting.map((p,key)=>(
				<Card>
					<Card.Title>{p[3]}</Card.Title>
					<Card.Divider></Card.Divider>

				<Text key={key}>Nama {p[1]} </Text>
				<Text key={key}>Jurusan : {p[2]}</Text>
				<Text key={key}>Judul : {p[3]}</Text>
				<Text key={key}>Date : {p[4]}</Text>
				<Text 
				style={{
					color: p[5] == "not" ? "red":"green"
				}}
				key={key}>Status : {p[5] == "not" ? "Skripsi Anda Belum Verified" : "Verified" }</Text>
				<Button
				title="Edit"
				  icon={
			    <Icon
			      name="edit"
			      size={15}
			      color="white"
			    />
  					}
  				buttonStyle={styles.edit}
  				onPress={() => {
          navigation.navigate('Edit', {
            id: p[0]
          });
        }}
				/>
				<Button
				title="Delete"
				  icon={
			    <Icon
			      name="trash"
			      size={15}
			      color="white"
			    />
  					}
  				buttonStyle={styles.delete}
 onPress={() => {
          navigation.navigate('Delete', {
            id: p[0]
          });
        }}
  				/>
				</Card>
			))}
		</View>
		</ScrollView>
		
		)


}
export default Beranda;
