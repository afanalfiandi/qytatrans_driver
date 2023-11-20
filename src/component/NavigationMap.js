import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const NavigationMap = ({
  latDriver,
  longDriver,
  latDestination,
  longDestination,
}) => {
  return (
    <WebView
      source={{
        uri:
          "http://maps.google.com/maps?saddr=" +
          latDriver +
          "," +
          longDriver +
          "&daddr=" +
          latDestination +
          "," +
          longDestination +
          "&dirflg=d",
      }}
      onShouldStartLoadWithRequest={(event) => {
        if (event.url.match(/(goo\.gl\/maps)|(maps\.app\.goo\.gl)/)) {
          Linking.openURL(event.url);
          return false;
        }
        return true;
      }}
    />
  );
};

export default NavigationMap;
