import React,{useEffect,useState} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native'
import {
	Button,

} from 'react-native-elements'
import axios from 'axios'
const Delete = ({route,navigation})=>{
	const styles = StyleSheet.create({
		container:{
			marginTop:30,
		},
		heading:{
			fontSize:30,
			fontWeight:300
		},
		child:{
			marginTop:20,
			padding:10

		},
		backbtn:{
			backgroundColor:"green",
			marginTop:100
		},
		delbtn:{
			backgroundColor:"red",
			marginTop:150
		}
	})
	const tinggi = Dimensions.get('window').height;
	const {id} = route.params
	const [post,setPost] = useState([])
	const [suc,setSuc] = useState("false")
	useEffect(()=>{
		axios.get("http://localhost:8000/skripsi/details/" + id).then((res)=>{
			console.log(res.data)
			setPost(res.data.data)
		})
	},[])
	function deletefunc(){
		axios.delete("http://localhost:8000/delete/" + id).then((res)=>{
			console.log(res.data)
			if(res.data.status == "delete"){
				setSuc("True")
				
			}
		})
	}
	return(
		<View style={styles.container}>
		<Text style={styles.heading}>Ingin Menghapus Judul ?</Text>
		{post.map((p)=>(
		<View style={styles.child}>
		<Text style={{fontSize:20}}>Hapus skripsi "{p[3]}" </Text>
		<Text>Nama : {p[1]}</Text>
		<Text>Jurusan : {p[2]}</Text>
		<Text>Judul : {p[3]}</Text>
		<Button title="Kembali" 
		buttonStyle={styles.backbtn}
		onPress={()=>navigation.goBack()}
		/>
		{suc == "false" &&
		<Button title="Hapus" 
		buttonStyle={styles.delbtn}
		onPress={deletefunc}
		/> }
		</View>
			))}

		{suc == "True" ? 
		<Text
		style={{color:"green",textAlign:"center",fontSize:30}}
		>Berhasil Terhapus </Text>:""}
		</View>
		)
}
export default Delete;