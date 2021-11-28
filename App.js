import React from 'react'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// SCREENS
import Login from './screens/Login';
import Register from './screens/Register';
import Beranda from './screens/Beranda';
import Buat from './screens/Buat';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const Stack = createNativeStackNavigator();

export default function App(){
    const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  };
  return(
    <RecoilRoot>
    <NavigationContainer theme={MyTheme}>
    <Stack.Navigator screenOptions={{
    headerShown: false, 
  }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Beranda" component={Beranda} />
        <Stack.Screen name="Buat" component={Buat} />
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
    )
}