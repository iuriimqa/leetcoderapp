import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "@rneui/base";
import { Button } from '@rneui/themed';


export default function Auth({navigation}) 
{
  const register = () => {
    navigation.navigate("register");
  };

  const login = () => {
    navigation.navigate("Login");
  };



  return (
    <View style={styles.container}>
      <Text h2 
        style={{ backgroundColor: "black", color: "lightblue"}}
      >
        This application can help you with coding by solving logic tasks and puzzles, Happy Hacking
      </Text>
      <View style={styles.buttons}>

      <Button
        style={styles.button}
        color={"warning"}
        size="lg"
        onPress={register}
      >
        Registration
      </Button>

      <Button
        style={styles.button}
        color={"primary"}
        size="lg"
        onPress={login}
      >
        Login
      </Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    alignItems: "baseline",
    justifyContent: "center",
  },
buttons:{
  paddingLeft:'35%',
  marginTop:30,
},
button:{
  paddingTop:10,
}});