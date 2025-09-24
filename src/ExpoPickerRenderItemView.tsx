// Components
import { Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Animated } from "react-native";
import { PickerItem } from "./ExpoWheelpicker.types";
import { ExpoWheelpickerStyles } from "./ExpoWheelpickerStyles";

type Props = {
  item: PickerItem;
  itemIndex: number;
  selectedIndex: number;
  itemLabelColor?: string;

  // animación y parámetros del wheel
  scrollYAnim: Animated.Value;
  itemHeight: number;
  visibleCount: number;
  minScale: number; // default 0.75
  minOpacity: number; // default 0.35
};

const ExpoPickerRenderItemView = ({
  item,
  itemIndex,
  itemLabelColor,
  selectedIndex,
  scrollYAnim,
  itemHeight,
  visibleCount,
  minScale,
  minOpacity,
}: Props) => {
  const isSelected = itemIndex === selectedIndex;

  // IMPORTANTE: ESTE USEMEMO SE ENCARGA DE ANIMAR EL ITEM SEGÚN SU POSICIÓN DENTRO DEL PICKER
  const { inputRange, scaleRange, opacityRange } = useMemo(() => {
    const half = Math.floor(visibleCount / 2); // distancia máxima desde el centro
    const input: number[] = [];
    const scaleOut: number[] = [];
    const opacityOut: number[] = [];

    for (let k = -half; k <= half; k++) {
      const indexAtK = itemIndex + k;
      input.push(indexAtK * itemHeight);

      const t = half === 0 ? 0 : Math.abs(k) / half;
      const s = 1 - (1 - minScale) * t;
      const o = 1 - (1 - minOpacity) * t;

      scaleOut.push(s);
      opacityOut.push(o);
    }

    return {
      inputRange: input,
      scaleRange: scaleOut,
      opacityRange: opacityOut,
    };
  }, [itemIndex, itemHeight, visibleCount, minScale, minOpacity]);

  const scale = scrollYAnim.interpolate({
    inputRange,
    outputRange: scaleRange,
    extrapolate: "clamp",
  });

  const opacity = scrollYAnim.interpolate({
    inputRange,
    outputRange: opacityRange,
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        ExpoWheelpickerStyles.itemContainer,
        {
          height: itemHeight,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity activeOpacity={1}>
        <Text
          numberOfLines={1}
          style={[
            ExpoWheelpickerStyles.itemLabel,
            {
              fontWeight: isSelected ? "600" : "400",
              color: isSelected
                ? itemLabelColor
                  ? itemLabelColor
                  : "black"
                : "gray",
            },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(ExpoPickerRenderItemView);
