export type PickerItem = {
  label: string;
  value: string;
  isSelected: boolean;
};

export type ExpoWheelPickerProps = {
  id: string;
  placeholder: string;
  error: boolean;

  items: PickerItem[];
  onSelectItem: (item: PickerItem | null) => void;

  selectedItemCode?: string;
  visibleCount?: number;
  title?: string;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
};

export type ExpoWheelPickerModalProps = {
  visible: boolean;
  items: PickerItem[];
  initialIndex?: number;

  title?: string;
  selectLabel?: string;
  cancelLabel?: string;

  selectButtonColor?: string;
  cancelButtonColor?: string;
  itemLabelColor?: string;
  highLightColor?: string;

  visibleCount?: number;
  minScale?: number; // default 0.75
  minOpacity?: number; // default 0.35

  setVisible: () => void;
  handleSelectItem: (item: PickerItem) => void;
};
