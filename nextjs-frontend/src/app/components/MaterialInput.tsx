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
      id="standard-basic"
      label={label}
      variant="standard"
      onChange={onChange}
    />
  );
};
