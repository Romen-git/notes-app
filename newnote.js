import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function NewNote({ navigation, route }) {
  // textinput states
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getCategory, setCategory] = useState("");

  // textinput states

  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // {label: 'Apple', value: 'apple'},
    // {label: 'Banana', value: 'banana'}
  ]);

  useEffect(() => {
    fetch("http://10.0.2.2/MyNote/getcategory.php")
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        var categoryList = [];

        categories.forEach((category) => {
          var categoryObject = {
            label: category.name,
            value: category.id,
          };
          // Alert.alert("ok");
          categoryList.push(categoryObject);
        });
        setItems(categoryList);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  function sendNoteDataRequest() {
    const noteDetails = {
      title: getTitle,
      description: getDescription,
      category_id: getCategory,
      mobile: route.params.mobile,
    };

    fetch("http://10.0.2.2/MyNote/savenote.php", {
      method: "POST",
      body: JSON.stringify(noteDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        Alert.alert(user.first_name);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text1}>Add New Note</Text>
        <Text>{route.params.first_name}</Text>
        {/* <Text>{route.params.id}</Text> */}
        {/* <Text>{route.params.last_name}</Text>
        <Text>{route.params.type}</Text> */}
      </View>
      <View>
        <Text>Title</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newTText) => setTitle(newTText)}
        />
        <Text>Desciption</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(newDText) => setDescription(newDText)}
        />
        <Text>Category</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={() => {
            // Alert.alert("Message", value);
            setCategory(value);
          }}
        />
      </View>

      <View>
        <Button onPress={sendNoteDataRequest} title="Save Note" />
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  TextInput: {
    height: 30,
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    padding: 5,
  },
});
