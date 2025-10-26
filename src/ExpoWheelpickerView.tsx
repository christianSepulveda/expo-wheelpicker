// React General
import {
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  InteractionManager,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { PickerItem, ExpoWheelPickerModalProps } from "./ExpoWheelpicker.types";
import { ExpoWheelpickerStyles } from "./ExpoWheelpickerStyles";
import ExpoPickerContainerView from "./ExpoPickerContainerView";
import ExpoPickerButtonGroupView from "./ExpoPickerButtonGroupView";

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

        <ExpoPickerContainerView
          CONTAINER_HEIGHT={CONTAINER_HEIGHT}
          ITEM_HEIGHT={ITEM_HEIGHT}
          MIN_OPACITY={MIN_OPACITY}
          MIN_SCALE={MIN_SCALE}
          TOP_PADDING={TOP_PADDING}
          VISIBLE_COUNT={VISIBLE_COUNT}
          flatListRef={flatListRef}
          highLightColor={props.highLightColor}
          items={props.items}
          onMomentumEnd={onMomentumEnd}
          scrollYAnim={scrollYAnim}
          selectedIndex={selectedIndex}
          itemLabelColor={props.itemLabelColor}
        />

        <ExpoPickerButtonGroupView
          selectLabel={props.selectLabel}
          cancelLabel={props.cancelLabel}
          cancelButtonColor={props.cancelButtonColor}
          selectButtonColor={props.selectButtonColor}
          setVisible={props.setVisible}
          setSelectedItem={setSelectedItem}
        />
      </View>
    </Modal>
  );
};

export default ExpoWheelpickerView;
