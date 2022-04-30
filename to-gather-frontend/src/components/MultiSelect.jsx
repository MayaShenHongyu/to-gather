import React from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";

export default function MultiSelect({ label, options, selected, setSelected, style }) {
  return (
    <Autocomplete
      multiple
      value={selected}
      onChange={(_event, newValues) => setSelected(newValues)}
      id="tags-outlined"
      options={options}
      filterSelectedOptions
      renderInput={(params) => (
        <FormControl sx={style}>
          <TextField
            {...params}
            // sx={{ height: 30 }}
            size="small"
            label={label}
          />
        </FormControl>
      )}
    />
  );
}
