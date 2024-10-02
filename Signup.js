import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function Signup({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: 2 },
    { label: "Student", value: 1 },
  ]);

  const [getMobileNo, setMobileNo] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword,setPassword] = useState("");
  const [getUserType, setUserType] = useState("");

//   useEffect(() => {
//     getUserTypesFromType();
//   }, []);

//   function getUserTypesFromType() {
//     fetch("http://10.0.2.2/MyNote/signup.php")
//       .then((response) => {
//         return response.json();
//       })
//       .then((usertypes) => {
//         var usertypeList = [];

//         usertypes.forEach((usertype) => {
//           var usertypeObject = {
//             label: usertype.name,
//             value: usertype.id.toString(), // Ensure that the value is a string
//           };
//           usertypeList.push(usertypeObject);
//           //   Alert.alert("ok");
//         });

//         setItems(usertypeList);
//       })
//       .catch((error) => {
//         console.error("Error", error);
//       });
//   }

  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText1}>MY NOTE</Text>

      <Text style={styles.titleText}>Sign Up</Text>

      <TextInput
        placeholder="Mobile Number"
        style={styles.defaultTextInput}
        marginTop={30}
        onChangeText={setMobileNo}
        autoCorrect={false}
        autoComplete="cc-number"
      />
      <TextInput
        placeholder="First Name"
        style={styles.defaultTextInput}
        marginTop={28}
        onChangeText={setFirstName}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.defaultTextInput}
        marginTop={28}
        onChangeText={setLastName}
        autoCorrect={false}
      />

      <View style={styles.btnContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          marginTop={22}
          onChangeValue={(val) => {
            setUserType(val);
          }}
          placeholder="Select User Type"
        />

        <TextInput
          placeholder="Password"
          style={styles.defaultTextInput}
          marginTop={28}
          secureTextEntry={true}
          onChangeText={setPassword}
          autoCorrect={false}
        />

        <Pressable onPress={registerUser}>
          <View style={styles.btn}>
            <Text style={styles.brnText}>Sign Up</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  async function registerUser() {
    const signUpDetails = {
      mobile: getMobileNo,
      fname: getFirstName,
      lname: getLastName,
      password: getPassword,
      type: getUserType,
    };
    fetch("http://10.0.2.2/MyNote/signup.php", {
      method: "POST",
      body: JSON.stringify(signUpDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((value) => {
        Alert.alert("Success", value);
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        Alert.alert("Error: " + error);
      });
    // viewData();
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText1: {
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 23,
    color: "green",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 5,
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
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
    marginTop: 28,
  },
  brnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  btnContainer: {
    marginTop: 30,
    width: 300,
    height: 50,
  },
});
