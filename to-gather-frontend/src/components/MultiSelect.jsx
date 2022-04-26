import React from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";

export default function MultiSelect({ label, options, selected, setSelected }) {
  return (
    <Autocomplete
      multiple
      value={selected}
      onChange={(_event, newValues) => setSelected(newValues)}
      id="tags-outlined"
      options={options}
      // getOptionLabel={(option) => option}
      //   defaultValue={[top100Films[13]]}
      filterSelectedOptions
      renderInput={(params) => (
        <FormControl sx={{ m: 1, width: 300 }}>
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
