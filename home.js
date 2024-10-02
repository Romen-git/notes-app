import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export function Home({ navigation, route }) {
  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText1}>Home</Text>
      <Text>{route.params.first_name}</Text>
      <Text>{route.params.last_name}</Text>
      <Text>{route.params.type}</Text>
      <View style={styles.btnContainer}>
        <CustomButton
          title="Add New Note"
          onPress={() => navigation.navigate("NewNote", route.params)}
        />
        <CustomButton
          title="View Note"
          onPress={() => navigation.navigate("ViewNote", route.params)}
        />
      </View>
    </SafeAreaView>
  );
  return ui;
}

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.btn}>
      <Button onPress={onPress} title={title} color="#FFFFFF" />
    </View>
  );
};

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