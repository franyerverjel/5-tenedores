import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import CarouselBanner from "react-native-banner-carousel";

export default function Carousel(props) {
  const { arrayImages, height, width } = props;

  return (
    <CarouselBanner
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.indicatorActive}
    >
      {arrayImages.map(imageUrl => (
        <View key="urlImage">
          <Image style={{ width, height }} source={{ uri: imageUrl }} />
        </View>
      ))}
    </CarouselBanner>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#00a680"
  },
  indicatorActive: {
    backgroundColor: "#00ffc5"
  }
});
