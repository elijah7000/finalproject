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

export const WeatherScreen = ({ navigation }) => {
  const [click, setClick] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flex: 6, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
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
    color: theme.background,
    fontSize: 15,
    width: 400,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
