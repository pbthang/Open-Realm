import React from "react";
import AppShell from "../components/AppShell";
import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import poster from "../resources/poster.png";
import CreatorInfo from "../components/CreatorInfo";
import pbtAvatar from "../resources/pbtAvatar.jpg";
import lvmAvatar from "../resources/lvmAvatar.jpg";

const posterSize = [1587, 2245];
const posterScale = 0.2;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 2rem",
  },
  poster: {
    margin: "1rem",
    display: "inline-block",
    width: posterSize[0] * posterScale,
    height: posterSize[1] * posterScale,
  },
  aboutOpenRealm: {
    margin: "2rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  aboutOpenRealmFirstPara: {
    marginBottom: "1rem",
    display: "inline-block",
  },
  aboutOpenRealmSecondPara: {
    marginBottom: "1rem",
    display: "inline-block",
  },
  aboutOpenRealmText: {
    marginLeft: "0",
    display: "inline-block",
  },
  creators: {
    margin: "2rem 0",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  link: {
    color: "inherit",
    transition: "color 0.2s ease",
    "&:visited": {
      color: "inherit",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

function About() {
  const classes = useStyles();
  return (
    <AppShell>
      <div className={classes.root}>
        <Typography variant="h2">About Open Realms</Typography>
        <div className={classes.aboutOpenRealm}>
          <Avatar
            variant="square"
            src={poster}
            alt="OR"
            className={classes.poster}
          />
          <div className={classes.aboutOpenRealmText}>
            <Typography
              variant="body1"
              className={classes.aboutOpenRealmFirstPara}
            >
              The writing community has never been more active and dynamic than
              it is right now, in the age of the Internet. When everyone can
              write and post their stories in dozens of different forms and have
              it delivered all around the world in less than a second. The
              number of thrilling tales, astounding new worlds of fantasy has
              been surging stronger than ever. However, has this community
              reached its full potential in the mission to satisfy all men’s
              dreams and aspirations? Have all stories achieved their optimal
              form as a manifestation of creativity? In the point of view of our
              project, there might be a gap to fill in!
            </Typography>
            <Typography
              variant="body1"
              className={classes.aboutOpenRealmSecondPara}
            >
              Taking inspiration from the open-source software, we came up with
              an idea to develop a form of open-source story that is available
              for the community to tell their own version beside the original,
              creating an alternative world with the same “original”. This is
              analogous to the vast community of open-source developers, but
              taking a different shape. With this system in action, a single
              idea from one author can inspire thousands of stories.
            </Typography>
            <Typography variant="body1">
              This is a project under the Orbital Programme at the National
              University of Singapore. GitHub Repo:{" "}
              <a
                href="https://github.com/pbthang/Open-Realm"
                target="__blank"
                className={classes.link}
              >
                https://github.com/pbthang/Open-Realm
              </a>
            </Typography>
          </div>
        </div>
        <Typography variant="h2">Creators</Typography>
        <div className={classes.creators}>
          <CreatorInfo
            imgSrc={pbtAvatar}
            name="Phạm Bá Thắng"
            major="Computer Science"
            email="bathang02@gmail.com"
            linkedIn="https://www.linkedin.com/in/pbthang"
            gitHub="https://github.com/pbthang"
          />
          <CreatorInfo
            imgSrc={lvmAvatar}
            name="Lê Văn Minh"
            major="Information Systems"
            email="larby2409@gmail.com"
            linkedIn="https://www.linkedin.com/in/hedgehog0409"
            gitHub="https://github.com/IntrovertHedgehog"
          />
        </div>
      </div>
    </AppShell>
  );
}

export default About;
