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
  const { sub } = useParams();
  // const { user } = useAuth0();
  const [user, setUser] = useState({});
  const [startedStories, setStartedStories] = useState([]);
  const [publishedChapters, setPublishedChapters] = useState([]);

  // console.log(sub);

  // axios.request(options).then(function (response) {
  //   console.log(response.data[0].user_id);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  const userString = JSON.stringify(user);
  useEffect(() => {
    const getUser = async () => {
      const MGMT_API_ACCESS_TOKEN = await axios.post(
        "https://dev-d1rzgdpx.jp.auth0.com/oauth/token",
        {
          client_id: "BAhbwdqvE0H4AJsipKsGbd8oJnsKXujZ",
          client_secret:
            "xtdHTnZzQERByW4wmxM0lVnp1ns9oSa-NZSv2E35_93UQg9zxw3yzHCIkaHwt8QH",
          audience: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/",
          grant_type: "client_credentials",
        }
      );

      const response = await axios.request({
        method: "GET",
        url: "https://dev-d1rzgdpx.jp.auth0.com/api/v2/users",
        params: { q: 'user_id: "' + sub + '"', search_engine: "v3" },
        headers: {
          authorization: `Bearer ${MGMT_API_ACCESS_TOKEN.data.access_token}`,
        },
      });
      return response.data[0];
    };
    try {
      (async () => {
        const user = await getUser();
        if (user) {
          setUser(user);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [userString, sub]);

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
