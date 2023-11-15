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
  ActivityIndicator,
} from "react-native";
import { theme } from "./color";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const { width: SCREEN_SIZE } = Dimensions.get("window");

const API_KEYS = "ecf8fcdc109cf9fd31f4211a5edc67e8";

export const WeatherScreen = ({ navigation }) => {
  const [city, setCity] = useState("Loading...");
  const [click, setClick] = useState(false);
  const [days, setDays] = useState([]);
  const [allow, setAllow] = useState(true);
  const permission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setAllow(false);
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 1 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    const cityName = location[0].city || location[0].name || "Unknown City";

    setCity(cityName);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEYS}&units=metric`
    );
    const json = await response.json();

    setDays(json.daily);
  };

  useEffect(() => {
    permission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flex: 6, backgroundColor: "#74b9ff" }}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}
        >
          {days.length === 0 ? (
            <View style={styles.day}>
              <ActivityIndicator
                color="white"
                style={{ marginTop: 10 }}
                size="large"
              />
            </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>

                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            ))
          )}
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
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
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
