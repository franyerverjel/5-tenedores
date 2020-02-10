import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import ListTopRestaurans from "../components/Ranking/ListTopRestaurants";

import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      db.collection("restaurants")
        .orderBy("rating", "desc")
        .limit(5)
        .get()
        .then(response => {
          const restaurantsArray = [];
          response.forEach(doc => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            restaurantsArray.push(restaurant);
          });
          setRestaurants(restaurantsArray);
        })
        .catch(() => {
          toastRef.current.show("Error al cargar el ranking");
        });
    })();
  }, []);

  return (
    <View>
      <ListTopRestaurans restaurants={restaurants} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}
