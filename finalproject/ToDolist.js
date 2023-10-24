import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { theme } from "./color";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const ToDoListScreen = ({ navigation }) => {
  const [click, setClick] = useState(true);
  const [toDoInput, setToDoInput] = useState("");
  const [toDos, setToDos] = useState({});

  const onChangeText = (text) => setToDoInput(text);
  const addToDo = () => {
    // return nothing if toDoInput is empty
    if (toDoInput === "") {
      return;
    }
    // save todo & combine old object with new object
    const newToDos = { ...toDos, [Date.now()]: toDoInput };
    setToDos(newToDos);
    setToDoInput("");
  };
  const deleteToDo = (id) => {
    const newToDos = { ...toDos };
    delete newToDos[id];
    setToDos(newToDos);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={addToDo}
            onChangeText={onChangeText}
            style={styles.input}
            keyboardType="email-address"
            placeholder="Write To Do"
            placeholderTextColor="#344A53"
            autoCapitalize="sentences"
            returnKeyType="done"
            value={toDoInput}
          ></TextInput>
        </View>
      </View>
      <View style={styles.center}>
        <ScrollView style={styles.centerContainer}>
          {Object.keys(toDos).map((listItem) => (
            <View style={styles.toDoWrapper} key={toDos}>
              <Text>{toDos[listItem]}</Text>
              <TouchableOpacity onPress={() => deleteToDo(listItem)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, backgroundColor: "#5B6265" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("ToDoList")}>
            <Text
              style={[
                styles.btnHeader,
                { color: click ? theme.lightblue : theme.black },
              ]}
            >
              ToDoList
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Weather")}>
            <Text
              style={[
                styles.btnHeader,
                { color: !click ? theme.lightblue : theme.black },
              ]}
            >
              Weather
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnHeader: {
    fontSize: 40,
    fontWeight: "600",
  },
  inputWrapper: {
    backgroundColor: "black",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    fontSize: 15,
    width: 400,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  center: {
    flex: 5,
    backgroundColor: "#C0FAFF",
  },
  toDoWrapper: {
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 3,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
