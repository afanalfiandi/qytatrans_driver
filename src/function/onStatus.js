import { View, Text } from "react-native";
import React from "react";
import { api } from "./baseUrl";

const onStatus = async (no_transaksi, id_status) => {
  const res = await fetch(api + "onStatus", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      no_transaksi: no_transaksi,
      id_status: id_status,
    }),
  });

  const data = await res.json();
  return data;
};

export default onStatus;
