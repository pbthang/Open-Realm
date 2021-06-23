import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { Typography, Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";
import UserDataService from "../services/user.service";
import Post from "../components/Post";

const useStyles = makeStyles({
  user: {
    display: "flex",
    alignItems: "center",
    margin: "2rem 0",
  },
  avatar: {
    height: 200,
    width: 200,
  },
  userInfo: {
    marginLeft: "2rem",
  },
  yourWorks: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  title: {
    margin: "1rem",
  },
});

function Profile() {
  const classes = useStyles();
  const { sub } = useParams();

  const [user, setUser] = useState();

  const [publishedPrompts, setPublishedPrompts] = useState([]);
  const [publishedWritings, setPublishedWritings] = useState([]);

  const userString = JSON.stringify(user);
  useEffect(() => {
    const getUser = async () => {
      // get user id
      const response = await UserDataService.get(sub);
      return response.data;
    };

    getUser()
      .then((user) => user && setUser(user))
      .catch((err) => console.error(err));
  }, [userString, sub]);

  useEffect(() => {
    const getPrompts = async () => {
      const response = await PromptDataService.findByAuthorId(sub);
      setPublishedPrompts(response.data);
    };

    const getWritings = async () => {
      const response = await WritingDataService.findByAuthorId(sub);
      setPublishedWritings(response.data);
    };

    getPrompts();
    getWritings();
  }, [sub]);

  return (
    <AppShell>
      <Typography variant="h2">User Profile</Typography>
      <div className={classes.user}>
        <Avatar src={user?.picture} className={classes.avatar} />
        <span className={classes.userInfo}>
          <Typography variant="h4">
            <b>Name:</b> {user?.name}
          </Typography>
          <Typography variant="h4">
            <b>Username:</b> {user?.nickname}
          </Typography>
          <Typography variant="h4">
            <b>Email:</b> {user?.email}
          </Typography>
        </span>
      </div>
      <div className={classes.yourWorks}>
        {publishedPrompts.length === 0 || (
          <>
            <Divider />
            <Typography variant="h3" className={classes.title}>
              Published Prompts
            </Typography>
            <div>
              {publishedPrompts.map((prompt) => (
                <Post type="prompt" book={prompt} key={prompt?.id} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={classes.yourWorks}>
        {publishedWritings.length === 0 || (
          <>
            <Divider />
            <Typography variant="h3" className={classes.title}>
              Published Writings
            </Typography>
            <div>
              {publishedWritings.map((writing, idx) => (
                <Post type="writing" book={writing} key={idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default Profile;
