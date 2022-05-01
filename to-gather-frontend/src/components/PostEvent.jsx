import { React, useState } from "react";
import { createEvent } from "../backend";
import { useAuth } from "../contexts/AuthContext";
import MultiSelect from "./MultiSelect";
// import handleError from "./ErrorHandler";
import BannerImage from "../assets/friends.png";
import { Grid, Paper, TextField, InputAdornment, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import "./PostEvent.css";

function PostEvent({ handleClose }) {
  const paperStyle = {
    padding: "40px 40px 50px 40px",
    width: 900,
    margin: "0px auto",
    borderRadius: 20,
  };

  const {
    register: reg,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const { currentUser } = useAuth();
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState();

  const onSubmit = (data) => {
    data.eventProps.tags = tags;
    data.eventProps.thumbnail = img;
    const dateTime = new Date(data.eventProps.time);
    data.eventProps.time = dateTime;
    //console.log(data);
    //console.log(currentUser.uid);
    //console.log(errors);
    createEvent(currentUser.uid, data.eventProps);
    handleClose();
  };

  return (
    <div
      className="EventContainer"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <Grid align="center" style={{ marginTop: "100px" }}>
        <h2 className="Title"> Create My Event </h2>
      </Grid>

      <div className="Event">
        <Paper elevation={10} style={paperStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} rowSpacing={1}>
              <Grid item xs={12}>
                <h3 className="FieldTitle">EVENT NAME</h3>
                <TextField
                  size="small"
                  className="form-field"
                  fullWidth
                  placeholder="Enter here"
                  {...reg("eventProps.name", {
                    required: "Required field",
                  })}
                />
              </Grid>

              <Grid item xs={5}>
                <h3 className="FieldTitle">DESCRIPTION</h3>
                <TextField
                  size="small"
                  className="form-field"
                  placeholder="Enter here"
                  multiline
                  rows={5}
                  sx={{ width: "350px" }}
                  {...reg("eventProps.description")}
                />
              </Grid>

              <Grid container item xs={4}>
                <Grid item xs={12}>
                  <h3 className="FieldTitle">TAGS</h3>
                  <MultiSelect
                    label="tags"
                    options={[
                      "Sports",
                      "Art",
                      "Music",
                      "Show",
                      "Crafting",
                      "Social",
                      "Food",
                      "Outdoor",
                      "Culture",
                      "Entertainment",
                    ]}
                    selected={tags}
                    setSelected={setTags}
                    style={{
                      width: "250px",
                      paddingTop: "10px",
                      paddingBottom: "18px",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h3 className="FieldTitle">WHEN</h3>
                  <TextField
                    size="small"
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2022-04-27T10:30"
                    sx={{
                      width: 250,
                      paddingTop: "10px",
                      paddingBottom: "18px",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...reg("eventProps.time", { required: "Required field" })}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={3}>
                <Grid item xs={12}>
                  <h3 className="FieldTitle">WHERE</h3>
                  <TextField
                    size="small"
                    className="form-field"
                    placeholder="Enter here"
                    sx={{ width: "200px" }}
                    {...reg("eventProps.location")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h3 className="FieldTitle">GROUP SIZE</h3>
                  <TextField
                    size="small"
                    className="form-field"
                    placeholder="How many"
                    sx={{ width: "200px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">people</InputAdornment>
                      ),
                    }}
                    {...reg("eventProps.preferredGroupSize", {
                      required: "Required field",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Please enter only numbers",
                      },
                    })}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <h3 className="FieldTitle">UPLOAD EVENT IMAGE</h3>
                <input
                  type="file"
                  style={{ paddingTop: "10px" }}
                  onChange={(event) => setImg(event.target.files[0])}
                />
              </Grid>

              <Grid
                container
                item
                xs={7.5}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  size="large"
                  id="submit-btn"
                  type="submit"
                  variant="contained"
                >
                  Post Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default PostEvent;
