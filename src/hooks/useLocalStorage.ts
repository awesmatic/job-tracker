import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid?: (value: unknown) => boolean
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue === null) {
        return initialValue;
      }
      const parsedValue: unknown = JSON.parse(savedValue);
      if (isValid && !isValid(parsedValue)) {
        console.warn(`Saved data for "${key}" has the wrong shape. Using defaults.`);
        return initialValue;
      }
      return parsedValue as T;
    } catch (error) {
      console.error("Could not read from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
