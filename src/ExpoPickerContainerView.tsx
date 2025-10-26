import {
  Animated,
  ColorValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { ExpoWheelpickerStyles } from "./ExpoWheelpickerStyles";
import ExpoPickerRenderItemView from "./ExpoPickerRenderItemView";
import { PickerItem } from "./ExpoWheelpicker.types";
import { useCallback, useMemo } from "react";

type Props = {
  TOP_PADDING: number;
  MIN_SCALE: number;
  MIN_OPACITY: number;
  CONTAINER_HEIGHT: number;
  ITEM_HEIGHT: number;
  VISIBLE_COUNT: number;
  highLightColor: ColorValue | undefined;
  flatListRef: React.RefObject<Animated.FlatList<PickerItem> | null>;
  items: PickerItem[];
  onMomentumEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  selectedIndex: number;
  scrollYAnim: Animated.Value;
  itemLabelColor?: string;
};

export default function ExpoPickerContainerView(props: Props) {
  // Snap for android devices
  const SNAP_OFFSETS = useMemo(
    () => props.items.map((_, i) => i * props.ITEM_HEIGHT),
    [props.items.length]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: props.ITEM_HEIGHT,
      offset: props.ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View
      style={[
        ExpoWheelpickerStyles.pickerContainer,
        { height: props.CONTAINER_HEIGHT },
      ]}
    >
      <View
        style={[
          ExpoWheelpickerStyles.pickerHighlightContainer,
          {
            height: props.ITEM_HEIGHT,
            top: props.TOP_PADDING,
            backgroundColor: props.highLightColor ?? "rgba(128, 0, 128, 0.1)",
          },
        ]}
      />

      <Animated.FlatList
        ref={props.flatListRef}
        data={props.items}
        renderItem={({ item, index }) => (
          <ExpoPickerRenderItemView
            item={item}
            itemIndex={index}
            selectedIndex={props.selectedIndex}
            scrollYAnim={props.scrollYAnim}
            itemHeight={props.ITEM_HEIGHT}
            visibleCount={props.VISIBLE_COUNT}
            minScale={props.MIN_SCALE}
            minOpacity={props.MIN_OPACITY}
            itemLabelColor={props.itemLabelColor}
          />
        )}
        keyExtractor={(el, i) => el.value ?? String(i)}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: props.TOP_PADDING,
          paddingBottom: props.TOP_PADDING,
        }}
        snapToOffsets={SNAP_OFFSETS}
        snapToAlignment="start"
        disableIntervalMomentum
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: props.scrollYAnim } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={props.onMomentumEnd}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={({ index }) => {
          props.flatListRef.current?.scrollToOffset({
            offset: index * props.ITEM_HEIGHT,
            animated: false,
          });
          requestAnimationFrame(() => {
            props.flatListRef.current?.scrollToIndex({
              index,
              animated: false,
            });
          });
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        overScrollMode="never"
        removeClippedSubviews={false}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={15}
      />
    </View>
  );
}
