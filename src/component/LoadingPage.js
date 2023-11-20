import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { loadingPage } from "../styles/loadingPage";
import Loading from "./Loading";
const LoadingPage = () => {
  return (
    <View style={loadingPage.container}>
      <Loading />
    </View>
  );
};

export default LoadingPage;
