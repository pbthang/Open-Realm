import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { Typography, Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api/api";
import Post from "../components/Post";
import { useAuth0 } from "@auth0/auth0-react";
var axios = require("axios").default;

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
  const { email } = useParams();
  // const { user } = useAuth0();
  const [user, setUser] = useState({});
  const [startedStories, setStartedStories] = useState([]);
  const [publishedChapters, setPublishedChapters] = useState([]);

  // get user
  var options = {
    method: 'GET',
    url: `${process.env.REACT_APP_DOMAIN}/api/v2/users`,
    params: {q: 'email:"' + email +'"', search_engine: 'v3'},
    headers: {authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`}
  };

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  const userString = JSON.stringify(user);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.request(options);
      return response.data;
    };
    (async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    })();
  }, [userString, email]);

    // useEffect(() => {
    //   const getStartedStories = async () => {
    //     const queryString = user.startedStories?.map((x) => `id=${x}`).join("&");
    //     if (queryString?.length) {
    //       const response = await api.get("/stories?" + queryString);
    //       setStartedStories(response.data);
    //     }
    //   };
    //   const getPublishedChapters = async () => {
    //     const queryString = user.publishedChapters
    //     ?.map((x) => `id=${x}`)
    //     .join("&");
    //     if (queryString?.length) {
    //       const response = await api.get("/chapters?" + queryString);
    //       setPublishedChapters(response.data);
    //     }
    //   };
    //
    //   getStartedStories();
    //   getPublishedChapters();
    //   // eslint-disable-next-line
    // }, [userString]);

  return (
    <AppShell>
      <Typography variant="h2">User Profile</Typography>
      <div className={classes.user}>
        <Avatar src={user?.picture} className={classes.avatar} />
        <span className={classes.userInfo}>
          <Typography variant="h4"><b>Name:</b> {user?.name}</Typography>
          <Typography variant="h4"><b>Username:</b> {user?.nickname}</Typography>
          <Typography variant="h4"><b>Email:</b> {user?.email}</Typography>
        </span>
      </div>
    </AppShell>
      // <div className={classes.yourWorks}>
      //   {Object.keys(startedStories).length === 0 || (
      //     <>
      //       <Divider />
      //       <Typography variant="h3" className={classes.title}>
      //         Stories started
      //       </Typography>
      //       <div>
      //         {startedStories.map((story, idx) => (
      //           <Post
      //             type="book"
      //             book={story}
      //             author={story.author}
      //             key={idx}
      //           />
      //         ))}
      //       </div>
      //     </>
      //   )}
      // </div>
      // <div className={classes.yourWorks}>
      //   {Object.keys(publishedChapters).length === 0 || (
      //     <>
      //       <Divider />
      //       <Typography variant="h3" className={classes.title}>
      //         Chapters published
      //       </Typography>
      //       <div>
      //         {publishedChapters.map((chapter, idx) => (
      //           <Post
      //             type="chapter"
      //             book={chapter}
      //             author={chapter.author}
      //             key={idx}
      //           />
      //         ))}
      //       </div>
      //     </>
      //   )}
      // </div>

  );
}

export default Profile;
