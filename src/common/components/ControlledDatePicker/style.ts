import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { neumorphism } from "theme";

export const StyledDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-root": neumorphism,
});
