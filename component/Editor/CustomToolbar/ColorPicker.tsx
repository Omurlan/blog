import React from "react";
import { BlockPicker, BlockPickerProps } from "react-color";
import { CiPickerEmpty } from "react-icons/ci";

interface ColorPickerProps {
  expanded: boolean;
  onExpandEvent: (a: any) => void;
  onChange: (a: string, b: string) => void;
  currentState: BlockPickerProps;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  expanded,
  currentState: { color },
  onExpandEvent,
}) => {
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  const handleChange = (color: any) => {
    onChange("color", color.hex);
  };

  const renderModal = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          boxShadow: "1px 0px 5px var(--gray)",
          borderRadius: 6,
        }}
        onClick={stopPropagation}
      >
        <BlockPicker color={color} onChangeComplete={handleChange} />
      </div>
    );
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-label="rdw-color-picker"
    >
      <div onClick={onExpandEvent}>
        <CiPickerEmpty />
      </div>
      {expanded ? renderModal() : undefined}
    </div>
  );
};

export default ColorPicker;
