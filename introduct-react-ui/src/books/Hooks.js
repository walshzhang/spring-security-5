import {useEffect, useState} from "react";

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  })
}

export function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return [value, handleChange]
}
