import React,{useEffect,useState} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput
} from 'react-native'
import {
	Button,
} from 'react-native-elements'
import axios from 'axios'
const Edit = ({route,navigation})=>{
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
		},
		delbtn:{
			backgroundColor:"blue",
			marginTop:150
		},
		textInput:{
			borderColor:"black",
			borderRadius:30,
			borderWidth:5,
			borderBottomWidth:1.0
		}
	})
	const tinggi = Dimensions.get('window').height;
	const {id} = route.params
	const [post,setPost] = useState([]);
	const [jurusan,setJurusan] = useState('')
	const [judul,setJudul] = useState('')
	const [suc,setSuc] = useState("false")
	useEffect(()=>{
		axios.get("http://localhost:8000/skripsi/details/" + id).then((res)=>{
			console.log(res.data)
			setPost(res.data.data)
		})
	},[])
	post.forEach((p)=>{
		console.log(p[1])
		setJurusan(p[2])
		console.log(jurusan)
	})
	function editfunc(){
		axios.put("http://localhost:8000/edit/" + id,{
			jurusan:jurusan,
			judul:judul
		}).then((res)=>{
			console.log(res.data)
			if(res.data.status == "postingan updated"){
				setSuc("True")
				
			}
		})
	}
	return(
		<View style={styles.container}>
		<Text style={styles.heading}>Edit Judul Skripsi {jurusan}</Text>
		{post.map((p)=>{
			return (
		<View style={styles.child}>
		<Text style={{fontSize:20}}>Edit skripsi "{p[3]}" </Text>
		
		
		<Text >Jurusan : </Text> <TextInput
			style={styles.textinput}
			 value={p[2]}
			 onChange={(e)=>setJurusan(e.target.value)}
		/>
		<Text >Judul : </Text> <TextInput 
			style={styles.textinput} 
			value={p[3]}
			onInput={(e)=>setJudul(e.target.value)}
		/>

		<Button title="Kembali" 
		buttonStyle={styles.backbtn}
		onPress={()=>navigation.goBack()}
		/>
		{suc == "false" &&
		<Button title="Edit" 
		buttonStyle={styles.delbtn}
		onPress={editfunc}
		/> }
		</View>
			)})}

		{suc == "True" ? 
		<Text
		style={{color:"green",textAlign:"center",fontSize:30}}
		>Berhasil Di Update </Text>:""}
		</View>
		)
}
export default Edit;