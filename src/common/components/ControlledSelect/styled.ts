import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { neumorphism } from "theme";

export const StyledSelect = styled(Select)({
  "& .MuiInputBase-input": neumorphism,

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: neumorphism.borderRadius,
  },
});
