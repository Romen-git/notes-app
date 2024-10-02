
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,

} from "react-native";

export function Signin({ navigation }) {

    const [getUserName, setUsername] = useState("");
    const [getPassword, setPassword] = useState("");

  function sendRequest() {
    // Alert.alert(getUserName);
    // Alert.alert(getPassword);
    const loginDetails = {
        "username":getUserName,
        "password":getPassword
      };

      fetch("http://10.0.2.2/MyNote/signin.php",
      {
        method: "POST",
        body:JSON.stringify(loginDetails)
      })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
       
   
        if (user.first_name !== "nope") {
            // Alert.alert(user.first_name)
            // saveDataToLocalStorage(user);
            Alert.alert("success");
            navigation.navigate("Home",user);
        } else {
            Alert.alert("Invalid login details", "Please check your username and password");
        }
        
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }

    const ui = (
        <SafeAreaView style={styles.container}>

            <Text style={styles.titleText1}>MY NOTE</Text>


            <Text style={styles.titleText}>Sign In</Text>

            <TextInput placeholder="Enter mobile" style={styles.defaultTextInput} marginTop={30} autoComplete="cc-number" autoCorrect={false} onChangeText={(newUText) => setUsername(newUText)}/>
            <TextInput placeholder="Enter password" style={styles.defaultTextInput} marginTop={22} secureTextEntry={true} autoCorrect={false} onChangeText={(newPText) => setPassword(newPText)}/>

            <View style={styles.btnContainer}>
            
                <Pressable flex={1} onPress={sendRequest}>
                    <View style={styles.btn} >
                        <Text style={styles.btnText}>
                            SIGN IN
                        </Text>
                    </View>
                </Pressable>


                <Pressable   marginStart={5} flex={1} onPress={goToSignUp}> 
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>
                            SIGN UP
                        </Text>
                    </View>
                </Pressable>

                {/* <Button title="Sign Up"/> */}
            </View>




        </SafeAreaView>
    );

    function goToSignUp(){
        navigation.navigate("SignUp");
    }


    return ui;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",

    },
    titleText1: {
        fontWeight: "bold",
        fontSize: 40,
        marginTop: 23,
        color:"green",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 23
    },
    defaultTextInput: {
        borderWidth: 1,
        borderRadius: 7,
        width: 300,
        height: 50,
        padding: 15,
    },
    btn: {
        backgroundColor: "#2986cc",
        borderWidth: 1,
        borderRadius: 7,
         
        padding: 15,
        justifyContent: 'center',
        alignItems: "center",

    },
    btnText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    btnContainer:{
        flexDirection:"row",
        marginTop:30,
        width: 300,
        height: 50,
    },

});

