import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { theme } from "./color";
import React, { useState } from "react";

const { width: SCREEN_SIZE } = Dimensions.get("window");

export const WeatherScreen = ({ navigation }) => {
  const [click, setClick] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flex: 6, backgroundColor: "#74b9ff" }}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Bloomington</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.weather}
        >
          <View style={styles.day}>
            <Text style={styles.temp}>3</Text>
            <Text style={styles.weatherLook}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>3</Text>
            <Text style={styles.weatherLook}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>3</Text>
            <Text style={styles.weatherLook}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>3</Text>
            <Text style={styles.weatherLook}>Sunny</Text>
          </View>
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
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "600",
  },
  weather: {},
  day: {
    width: SCREEN_SIZE,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  weatherLook: {
    marginTop: -30,
    fontSize: 60,
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
