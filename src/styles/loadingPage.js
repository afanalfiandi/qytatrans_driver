import { Dimensions, StyleSheet } from "react-native";
import { color } from "./color";
import { StatusBar } from "expo-status-bar";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const loadingPage = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
