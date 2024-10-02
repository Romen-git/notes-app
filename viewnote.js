import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

export function ViewNote({ navigation, route }) {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    fetch(
      "http://10.0.2.2//get-all-note.php?userId=" + route.params.mobile
    )
      .then((response) => response.json())
      .then((notes) => {
        setNoteList(notes);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text1}>View Note</Text>
        <Text>{route.params.first_name}</Text>
        <Text>{route.params.last_name}</Text>
        <Text>{route.params.type}</Text>
      </View>
      <View>
        {noteList.map((note) => (
           
          <View style={styles.view} key={note.id}>
            <View style={styles.view2}>
              
              <Image
                style={{ width: 80, height: 80, objectFit: "contain" }}
                // source={{ uri: "https://cdn-icons-png.flaticon.com/512/201/201623.png" }} 
                source={note.imgpath}
              />
            </View>
            <View style={styles.view1}>
              <Text>Title: {note.title}</Text>
              <Text>Description: {note.description}</Text>
              <Text>Category ID: {note.category_id}</Text>
              <Text>User ID: {note.user_id}</Text>
              <Text>Date: {note.date}</Text>
            </View>
          </View>
        ))}
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
  view1: {
   
    alignItems: "flex-end",
  },
  view2: {
    
    marginTop: 10,
    alignItems: "flex-start",
  },
  view: {
    backgroundColor: "red",
    marginTop: 10,
  },
});
