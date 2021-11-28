import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
const Buat = ()=>{
	const styles = StyleSheet.create({
	navbar:{
		backgroundColor:"purple",
		padding:20,

	}
})
	return(
		<View>
		<View style={styles.navbar}>
			<Text 
			style={{color:"white",fontSize:20}}
			>Beranda</Text>
		</View>
			<Text>buat</Text>
		</View>
		)
}

export default Buat;