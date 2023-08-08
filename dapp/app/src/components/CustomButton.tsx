import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const CustomButton = ({ onClick, children }: CustomButtonProps) => {

  const sx = {
    width: "100%"
  };

  const variant = "contained";

  return (
    <Button sx={sx} variant={variant} onClick={onClick}>{children}</Button>
  );
};