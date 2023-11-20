import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./baseUrl";

const getRiwayat = async (id_status) => {
  const id_driver = await AsyncStorage.getItem("id_driver");
  const res = await fetch(api + "getRiwayat", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      id_status: id_status,
      id_driver: id_driver,
    }),
  });

  const data = await res.json();

  return data;
};

export default getRiwayat;
