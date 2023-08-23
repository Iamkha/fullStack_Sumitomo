import * as React from "react";

import { TextField, Box } from "@mui/material";
import Icons from "../icons";

interface IProps {
  text: string;
  disableEdit?: boolean;
  onChangeText?: any;
}

const EditableText = ({
  text,
  disableEdit = false,
  onChangeText = () => undefined,
}: IProps) => {
  const [inputValue, setInputValue] = React.useState(text);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const inputRef = React.useRef<any>(null);

  React.useEffect(() => {
    setInputValue(text);
  }, [text]);

  React.useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleConfirm = () => {
    onChangeText(inputValue);
    setIsEditing(false);
    setIsHovering(false);
  };

  if (disableEdit) {
    return (
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span style={{ whiteSpace: "pre-line" }}>{text}</span>
      </Box>
    );
  }

  if (!isEditing)
    return (
      <Box
        className="relative inline-block pr-[30px] min-h-[16.8px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span style={{ whiteSpace: "pre-line" }}>{text}</span>
        <span
          className="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {isHovering || !text ? <Icons name={"edit"} /> : null}
        </span>
      </Box>
    );

  return (
    <Box
      className={`relative inline-block pr-[30px] [&>div>div>input]:p-[0_8px] [&>div]:w-full`}
    >
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") handleConfirm();
        }}
        inputRef={inputRef}
      />
      <span
        className="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer"
        onClick={handleConfirm}
      >
        {isHovering ? <Icons name={"check"} /> : null}
      </span>
    </Box>
  );
};

export default EditableText;
