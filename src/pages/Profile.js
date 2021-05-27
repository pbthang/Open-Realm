import React from "react";
import AppShell from "../components/AppShell";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Avatar } from "@material-ui/core";

function Profile() {
  const { user } = useAuth0();

  return (
    <AppShell>
      <Typography variant="h2">User Profile</Typography>
      <Avatar src={user?.picture} style={{ height: 60, width: 60 }} />
      <span>
        <Typography variant="h4">Name: {user?.name}</Typography>
        <Typography variant="h4">Email: {user?.email}</Typography>
      </span>
    </AppShell>
  );
}

export default Profile;
