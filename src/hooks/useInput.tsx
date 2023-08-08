// useInput.tsx
import { useState, ChangeEvent } from "react";

type UseInputReturnType = [
  string,
  (e: ChangeEvent<HTMLInputElement>, newValue?: string) => void,
  React.Dispatch<React.SetStateAction<string>>
];

const useInput = (initialValue = ""): UseInputReturnType => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>, newValue?: string) => {
    setValue(newValue || e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;

