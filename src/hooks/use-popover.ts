import { MutableRefObject, useRef, useState } from "react";

interface PopoverController<T> {
  anchorRef: MutableRefObject<T | null>;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = useRef<T>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleToggle = (): void => {
    setOpen((prevState) => !prevState);
  };

  return { anchorRef, handleClose, handleOpen, handleToggle, open };
}
