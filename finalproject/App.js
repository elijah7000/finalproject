import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./color";
import React, { useState } from "react";

export default function App() {
  const [click, setClick] = useState(true);
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState({});
  const toDoList = () => setClick(true);
  const Weather = () => setClick(false);

  const onChangeText = (text) => setToDo(text);
  const addToDo = () => {
    if (toDo === "") {
      return;
    }
    // save todo
    const newToDos = Object.assign({}, toDo, {
      [Date.now()]: { toDos, toDolist: click },
    });
    setToDos(newToDos);
    setToDo("");
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
            value={toDo}
          ></TextInput>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toDoList}>
            <Text
              style={[
                styles.btnHeader,
                { color: click ? theme.lightblue : theme.black },
              ]}
            >
              ToDoList
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Weather}>
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
}

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
    color: theme.background,
    fontSize: 15,
    width: 400,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
