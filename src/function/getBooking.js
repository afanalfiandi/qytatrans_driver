import { View, Text } from "react-native";
import React from "react";
import { api } from "./baseUrl";

const getBooking = async (no_transaksi) => {
  const res = await fetch(api + "getBooking", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      no_transaksi: no_transaksi,
    }),
  });

  const data = await res.json();
  return data;
};

export default getBooking;
