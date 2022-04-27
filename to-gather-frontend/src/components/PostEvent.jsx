import { React, useState } from "react";
import { createEvent} from "../backend";
import { useAuth } from "../contexts/AuthContext";
// import handleError from "./ErrorHandler";
// import BannerImage from "../assets/friends.png";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";

function PostEvent() {
  const paperStyle = {
    padding: "40px 80px 50px 80px",
    width: 400,
    margin: "50px auto",
    borderRadius: 20,
  };

  const {
    register: reg,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { currentUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    // createEvent(currentUser.uid, data.eventProps);
  }

  return (
    <div className="landing">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2> Post Event </h2>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                size="small"
                className="form-field"
                label="Event Name"
                placeholder="Enter event name"
                fullWidth
                {...reg("eventProps.name", {
                  required: "Required field",
                })}
              />

              {/* <TextField
                size="small"
                className="form-field"
                label="Event Date"
                placeholder="yyyy-mm-dd"
                fullWidth
                {...reg("eventProps.date", {
                  required: "Required field",
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                    message: "Invalid date format",
                  },
                })}
                error={!!errors?.date}
                helperText={errors?.date?.message}
              /> */}

              <TextField
                size="small"
                className="form-field"
                label="Description"
                multiline
                rows={4}
                fullWidth
                {...reg("eventProps.description")}
              />  

              <TextField
                size="small"
                className="form-field"
                label="Location"
                fullWidth
                {...reg("eventProps.Location")}
              /> 

              <FormControl >
                <FormLabel>Tags</FormLabel>
                <div style={{display: "flex", flexWrap: "wrap"}}> 
                  <FormControlLabel control={<Checkbox />} label="Sports" {...reg("eventProps.tags.0")} />
                  <FormControlLabel control={<Checkbox />} label="Art" {...reg("eventProps.tags.1")} />
                  <FormControlLabel control={<Checkbox />} label="Music" {...reg("eventProps.tags.2")} />
                  <FormControlLabel control={<Checkbox />} label="Show" {...reg("eventProps.tags.3")} />
                  <FormControlLabel control={<Checkbox />} label="Crafting" {...reg("eventProps.tags.4")} />
                  <FormControlLabel control={<Checkbox />} label="Social" {...reg("eventProps.tags.5")} />
                  <FormControlLabel control={<Checkbox />} label="Food" {...reg("eventProps.tags.6")} />
                  <FormControlLabel control={<Checkbox />} label="Outdoor" {...reg("eventProps.tags.7")} />
                  <FormControlLabel control={<Checkbox />} label="Culture" {...reg("eventProps.tags.8")} />
                  <FormControlLabel control={<Checkbox />} label="Entertainment" {...reg("eventProps.tags.9")} />
                </div>
                

                
              </FormControl>

              <Button
                id="submit-btn"
                type="submit"
                variant="contained"
                fullWidth
              >
                Post Event
              </Button>
        </form>

        </Paper>
      </Grid>



    </div>
  );
}

export default PostEvent;
