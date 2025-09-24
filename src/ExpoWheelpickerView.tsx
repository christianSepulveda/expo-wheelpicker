// React General
import {
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  InteractionManager,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PickerItem, ExpoWheelPickerModalProps } from "./ExpoWheelpicker.types";
import ExpoPickerRenderItemView from "./ExpoPickerRenderItemView";
import { ExpoWheelpickerStyles } from "./ExpoWheelpickerStyles";

export const ITEM_HEIGHT = 50;

const ExpoWheelpickerView = (props: ExpoWheelPickerModalProps) => {
  // -------- Animations global config --------
  const VISIBLE_COUNT_RAW = props.visibleCount ?? 5;
  const VISIBLE_COUNT =
    VISIBLE_COUNT_RAW % 2 === 0 ? VISIBLE_COUNT_RAW + 1 : VISIBLE_COUNT_RAW;
  const CONTAINER_HEIGHT = VISIBLE_COUNT * ITEM_HEIGHT; // real picker height
  const TOP_PADDING = CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2; // this center the highlight

  const MIN_SCALE = props.minScale ?? 0.75;
  const MIN_OPACITY = props.minOpacity ?? 0.35;

  const clamp = (n: number, min: number, max: number) =>
    Math.min(Math.max(n, min), max);

  // -------- refs / states --------
  const lastSelectedRef = useRef(0);
  const flatListRef = useRef<Animated.FlatList<PickerItem>>(null);
  const scrollYAnim = useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(0); // logic state

  // Snap for android devices
  const SNAP_OFFSETS = useMemo(
    () => props.items.map((_, i) => i * ITEM_HEIGHT),
    [props.items.length]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  //this one focus the picker to the last selected item
  useEffect(() => {
    if (!props.visible || props.items.length === 0) return;

    const target = clamp(
      lastSelectedRef.current ?? props.initialIndex ?? 0,
      0,
      props.items.length - 1
    );

    InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({ index: target, animated: false });
        setSelectedIndex(target);
        scrollYAnim.stopAnimation();
        // @ts-ignore
        scrollYAnim.setValue(target * ITEM_HEIGHT);
      });
    });
  }, [props.visible, props.items.length, scrollYAnim]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = clamp(Math.round(y / ITEM_HEIGHT), 0, props.items.length - 1);
    if (idx !== selectedIndex) setSelectedIndex(idx);
    lastSelectedRef.current = idx; // save the index of the last item selected
  };

  const setSelectedItem = () => {
    const item = props.items[selectedIndex];
    props.handleSelectItem(item);
  };

  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.setVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={[ExpoWheelpickerStyles.backdrop, { opacity: 0.8 }]}
        onPress={props.setVisible}
      />

      <View style={ExpoWheelpickerStyles.sheet}>
        {props.title && (
          <View
            style={{
              width: "100%",
              height: 50,
              justifyContent: "center",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{props.title}</Text>
          </View>
        )}

        {!props.title && <View style={{ marginVertical: 15 }} />}

        <View
          style={[
            ExpoWheelpickerStyles.pickerContainer,
            { height: CONTAINER_HEIGHT },
          ]}
        >
          <View
            style={[
              ExpoWheelpickerStyles.pickerHighlightContainer,
              {
                height: ITEM_HEIGHT,
                top: TOP_PADDING,
                backgroundColor:
                  props.highLightColor ?? "rgba(128, 0, 128, 0.1)",
              },
            ]}
          />

          <Animated.FlatList
            ref={flatListRef}
            data={props.items}
            renderItem={({ item, index }) => (
              <ExpoPickerRenderItemView
                item={item}
                itemIndex={index}
                selectedIndex={selectedIndex}
                scrollYAnim={scrollYAnim}
                itemHeight={ITEM_HEIGHT}
                visibleCount={VISIBLE_COUNT}
                minScale={MIN_SCALE}
                minOpacity={MIN_OPACITY}
                itemLabelColor={props.itemLabelColor}
              />
            )}
            keyExtractor={(el, i) => el.value ?? String(i)}
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: TOP_PADDING,
              paddingBottom: TOP_PADDING,
            }}
            snapToOffsets={SNAP_OFFSETS}
            snapToAlignment="start"
            disableIntervalMomentum
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollYAnim } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={onMomentumEnd}
            getItemLayout={getItemLayout}
            onScrollToIndexFailed={({ index }) => {
              flatListRef.current?.scrollToOffset({
                offset: index * ITEM_HEIGHT,
                animated: false,
              });
              requestAnimationFrame(() => {
                flatListRef.current?.scrollToIndex({
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

        <View style={ExpoWheelpickerStyles.buttonGroup}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: props.selectButtonColor ?? "purple",
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
            onPress={setSelectedItem}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              {props.selectLabel ?? "Select"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.setVisible}
            style={{ marginBottom: 40 }}
            activeOpacity={0.8}
          >
            <Text
              style={[
                ExpoWheelpickerStyles.inputLabel,
                {
                  color: props.cancelButtonColor ?? "black",
                  textDecorationLine: "underline",
                  textDecorationStyle: "solid",
                },
              ]}
            >
              {props.cancelLabel ?? "Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExpoWheelpickerView;
