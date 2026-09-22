import { useEffect, useState } from "react";

export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);
  return canHover;
}
