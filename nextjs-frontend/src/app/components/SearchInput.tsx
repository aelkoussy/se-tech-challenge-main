"use client";
import TextField from "@mui/material/TextField";
import * as React from "react";

interface SearchInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{
        mb: 2,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    />
  );
};
