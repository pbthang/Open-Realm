import React from "react";
import { Typography, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    padding: "2rem 2rem",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    display: "inline-block",
    width: 200,
    height: 200,
  },
  name: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  major: {
    marginBottom: 0,
  },
  school: {
    marginTop: 0,
  },
  contact: {
    display: "inline-block",
    paddingLeft: 0,
    borderSpacing: "10px 0",
    marginTop: "1rem",
  },
  contactItem: {
    display: "inline-block",
  },
  link: {
    // textDecoration: "none",
    color: "inherit",
    transition: "color 0.2s ease",
    "&:visited": {
      //   textDecoration: "none",
      color: "inherit",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

function CreatorInfo({ imgSrc, name, major, email, linkedIn, gitHub }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Avatar alt={name} src={imgSrc} className={classes.img} />
      <Typography variant="h5" className={classes.name}>
        <b>{name}</b>
      </Typography>
      <Typography variant="h6" className={classes.major}>
        {major}
      </Typography>
      <Typography variant="h6" className={classes.school}>
        NUS School of Computing
      </Typography>
      <table className={classes.contact}>
        <tr>
          <td>
            <Typography variant="body1" className={classes.contactItem}>
              <b>Email:</b>
            </Typography>
          </td>
          <td>
            <Typography
              component="a"
              href={`mailto:${email}`}
              className={classes.link}
            >
              {email}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body1" lassName={classes.contactItem}>
              <b>LinkedIn:</b>
            </Typography>
          </td>
          <td>
            <Typography component="a" href={linkedIn} className={classes.link}>
              {linkedIn.split("/").slice(-1)[0]}
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography variant="body1" lassName={classes.contactItem}>
              <b>GitHub:</b>
            </Typography>
          </td>
          <td>
            <Typography component="a" href={gitHub} className={classes.link}>
              {gitHub.split("/").slice(-1)[0]}
            </Typography>
          </td>
        </tr>
      </table>
    </Paper>
  );
}

export default CreatorInfo;
