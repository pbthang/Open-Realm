import React, { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import EditIcon from "@material-ui/icons/Edit";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField,
  Input,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import UserDataService from "../services/user.service";

const useStyles = makeStyles((theme) => ({
  optionBtn: {
    marginRight: "1rem",
    position: "absolute",
    right: 20,
    top: 40,
  },
  iconBtn: {
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
  },
  cancelBtn: {
    color: theme.palette.error.main,
  },
  profilePicInput: {
    marginTop: "1rem",
  },
  avatar: {
    height: 200,
    width: 200,
  },
  inputContainer: {
    display: "inline",
  },
  dialogContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

function EditProfileBtn({ user, reload }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const currUser = useAuth0().user;
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.nickname);
  const [picture, setPicture] = useState(null);
  const [previewSource, setPreviewSource] = useState(user?.picture);

  const [open, setOpen] = useState(false);
  const handleEditBtnClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName(user?.name);
    setUsername(user?.nickname);
    setPicture(null);
    setPreviewSource(user?.picture);
  };
  const handleEditSubmit = async () => {
    if (
      name.length <= 0 ||
      name.length > 32 ||
      username.length <= 0 ||
      username.length > 32
    ) {
      enqueueSnackbar(
        "Name or username should have at least 1 and at most 32 characters",
        { variant: "warning" }
      );
      return;
    }

    setLoading(true);
    try {
      await UserDataService.patch(user.user_id, {
        name: name,
        nickname: username,
      });
      await handleImageUploadToCloud();
      reload();
      enqueueSnackbar("Update user info successfully", { variant: "success" });
      handleClose();
    } catch (error) {
      enqueueSnackbar("Error updating user info", { variant: "error" });
    }
    setLoading(false);
  };

  const handleImageUploadToCloud = async () => {
    if (!picture) return;
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "wldwciwz");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dic0ykohn/image/upload",
      formData
    );
    await UserDataService.patch(user.user_id, {
      picture: response.data.secure_url,
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.length) {
      setPicture(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onloadend = () => {
        setPreviewSource(fileReader.result);
      };
    }
  };

  return (
    user?.user_id === currUser.sub && (
      <div>
        <span className={classes.optionBtn}>
          <IconButton className={classes.iconBtn} onClick={handleEditBtnClick}>
            <EditIcon />
          </IconButton>
        </span>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Avatar
              src={previewSource}
              variant="circle"
              className={classes.avatar}
            />
            <div className={classes.inputContainer}>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className={classes.profilePicInput}>
                <span>Change profile picture: </span>
                <Input
                  type="file"
                  disableUnderline
                  placeholder="Choose an image"
                  onChange={handleFileInputChange}
                />
              </div>
            </div>
          </DialogContent>
          {loading ? (
            <DialogActions>
              <CircularProgress size={30} color="inherit" />
            </DialogActions>
          ) : (
            <DialogActions>
              <Button onClick={handleClose} className={classes.cancelBtn}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Update</Button>
            </DialogActions>
          )}
        </Dialog>
      </div>
    )
  );
}
export default EditProfileBtn;
