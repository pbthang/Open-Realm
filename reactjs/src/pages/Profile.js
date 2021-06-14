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

  console.log(sub);
  // get user
  var options = {
    method: 'GET',
    url: 'https://dev-d1rzgdpx.jp.auth0.com/api/v2/users',
    params: {q: 'user_id: "' + sub + '"', search_engine: 'v3'},
    headers: {authorization: "Bearer  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkRBcENyZ2pnakp3MmtxdWVZRWEzdiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kMXJ6Z2RweC5qcC5hdXRoMC5jb20vIiwic3ViIjoiQkFoYndkcXZFMEg0QUpzaXBLc0diZDhvSm5zS1h1alpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWQxcnpnZHB4LmpwLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjIzNjUyMjQ4LCJleHAiOjE2MjM3Mzg2NDgsImF6cCI6IkJBaGJ3ZHF2RTBINEFKc2lwS3NHYmQ4b0puc0tYdWpaIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.pYadhJ4KVxqGGtOdJ83vfHKNeseRGTu2x8kxnZWCsF9PDQwmVU09sPB9rViGuVMO2stUCW2Ap7uarKEOfbE1goA7BKbi7C1htwZlNu19cX3ekqua53KVxN5TVwQ1TH_YLGTs4Gql-nsFLd0-Gp161vKKfIxfZmsrdF9gtl9t_F3zH8O7OHHrx1iX8xvrr7tKHscIcR-SwfiAcWBylI3ndqb1ClrDTydbpSb81eea3cMuDGzNhU1Zib-aa5QetaIrjxS0tIBjVJNFcP3gyCPiw_lTM0NdzGppTGp31_evgjxU2GbAkq1QcMHnT71d7bQ1GspC4a95qH9nrlrAyvM9aw"}
  };

  // axios.request(options).then(function (response) {
  //   console.log(response.data[0].user_id);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  const userString = JSON.stringify(user);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.request(options);
      return response.data[0];
    };
    (async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    })();
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
