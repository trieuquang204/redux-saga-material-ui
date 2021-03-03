import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from './styles';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl style={{width: '100%'}} error={touched && error}>
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      // native
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple",
      }}
      value={input.value}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

export default withStyles(styles)(renderSelectField);
