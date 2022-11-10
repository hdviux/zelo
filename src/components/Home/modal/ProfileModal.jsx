import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Modal.module.css";
import UserAPI from "../../api/UserAPI";
import Cookies from "../../config/cookie";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const ProfileModal = (props) => {
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState({
    employid: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    department: "",
  });
  const handleGetProfile = async () => {
    const result = await UserAPI.profile(JSON.parse(Cookies.get("token")));
    setAvatar(result.data.avatar);
    setUserData({
      ...userData,
      employid: result.data.employid,
      name: result.data.name,
      gender: result.data.gender,
      dateOfBirth:
        result.data.dateOfBirth.year +
        "-" +
        (result.data.dateOfBirth.month < 10
          ? "0" + result.data.dateOfBirth.month
          : result.data.dateOfBirth.month) +
        "-" +
        (result.data.dateOfBirth.day < 10
          ? "0" + result.data.dateOfBirth.day
          : result.data.dateOfBirth.day),
      department: result.data.department,
    });
  };
  useEffect(() => {
    handleGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = {
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: "15px",
    },
    button: {
      width: "150px",
    },
  };

  const handleUpdateProfile = async () => {
    const getDateOfBirth = new Date(userData.dateOfBirth);
    const data = {
      name: userData.name,
      dateOfBirth: {
        day: getDateOfBirth.getDate(),
        month: getDateOfBirth.getMonth() + 1,
        year: getDateOfBirth.getFullYear(),
      },
      gender: userData.gender !== true ? 0 : 1,
    };
    const result = await UserAPI.updateprofile(
      data,
      JSON.parse(Cookies.get("token"))
    );
    if (result && result.status === 200) {
      document.getElementById("closemodalupdate").click();
    }
  };
  const clickChoice = async () => {
    document.getElementById("selectfile").click();
  };
  const fileSelected = async (e) => {
    setChangeAvatar(true);
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("file", fileSelected);
    const result = await UserAPI.updateavatar(
      fd,
      JSON.parse(Cookies.get("token"))
    );
    if (result && result.status === 200) {
      handleGetProfile();
      document.getElementById("closemodalupdateavatar").click();
      setChangeAvatar(false);
    } else {
      setChangeAvatar(false);
    }
  };
  return (
    <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <Box sx={style.box}>
        <div className={styles.conavatar}>
          <div className={styles.avatar}>
            <IconButton onClick={clickChoice}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <div
                    style={{
                      background: "gray",
                      padding: "4px",
                      borderRadius: "180px",
                      border: "2px solid gray",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <CameraAltIcon sx={{ fontSize: 30 }} />
                  </div>
                }
              >
                {changeAvatar === false ? (
                  <Avatar
                    alt=""
                    src={avatar}
                    sx={{ width: 150, height: 150, border: "1px solid gray" }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      border: "1px solid gray",
                      background: "white",
                    }}
                  >
                    <CircularProgress />
                  </Avatar>
                )}
              </Badge>
            </IconButton>
            <input
              hidden
              type="file"
              id="selectfile"
              onChange={fileSelected}
              multiple
            />
          </div>
        </div>
        <div className={styles.formmodal}>
          <TextField
            label="Mã nhân viên"
            size="small"
            defaultValue={userData.employid}
            className={styles.inputmodal}
            disabled
          />
          <TextField
            label="Họ và tên"
            size="small"
            defaultValue={userData.name}
            className={styles.inputmodal}
            onChange={(e) =>
              setUserData({
                ...userData,
                name: e.target.value,
              })
            }
          />
          <FormControl size="small" className={styles.inputmodal}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={userData.gender}
              label="Giới tính"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  gender: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Nam</MenuItem>
              <MenuItem value={false}>Nữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ngày sinh"
            type="date"
            size="small"
            defaultValue={userData.dateOfBirth}
            className={styles.inputmodal}
            onChange={(e) =>
              setUserData({
                ...userData,
                dateOfBirth: e.target.value,
              })
            }
          />
          <TextField
            label="Phòng ban"
            size="small"
            className={styles.inputmodal}
            defaultValue={userData.department}
            disabled
          />
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: "flex",
              width: "60%",
              justifyContent: "space-around",
            }}
          >
            <Button
              sx={style.button}
              onClick={props.onClose}
              variant="outlined"
            >
              Hủy
            </Button>
            <Button
              sx={style.button}
              variant="contained"
              onClick={handleUpdateProfile}
            >
              Cập nhật
            </Button>
            <button
              hidden
              id="closemodalupdate"
              onClick={props.onClose2}
            ></button>
            <button
              hidden
              id="closemodalupdateavatar"
              onClick={props.onClose3}
            ></button>
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};
export default ProfileModal;
