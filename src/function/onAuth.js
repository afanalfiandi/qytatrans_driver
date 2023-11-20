import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { api } from "./baseUrl";

const onAuth = async (username, password) => {
  const res = await fetch(api + "onAuth", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await res.json();

  return data;
};

export default onAuth;
