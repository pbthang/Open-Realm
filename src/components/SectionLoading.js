import React from "react";
import ReactLoading from "react-loading";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem",
  },
  loader: {
    marginRight: "1rem",
  },
}));

function SectionLoading({ msg }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.loading}>
      <ReactLoading
        type="bars"
        color={theme.palette.primary.main}
        className={classes.loader}
      />
      <Typography variant="subtitle1">{msg}</Typography>
    </div>
  );
}

export default SectionLoading;
