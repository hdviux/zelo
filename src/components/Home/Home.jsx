import React, {  useLayoutEffect, useState } from "react";
import UserAPI from "../api/UserAPI";
import Cookies from "../config/cookie";
import styles from "./Home.module.css";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  FileCopyOutlined,
  LockOutlined,
  OutputOutlined,
  PersonOutlined,
  Print,
  Public,
  Save,
  Share,
} from "@mui/icons-material";
import ProfileModal from "./modal/ProfileModal";
import ChangePasswordModal from "./modal/ChangePasswordModal";
import DataTable from "./DataTable";
const Home = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAlertProfile, setOpenAlertProfile] = useState(false);
  const [avatar,setAvatar] = useState("");
  const handleGetProfile = async () => {
    const result = await UserAPI.profile(JSON.parse(Cookies.get("token")));
    setAvatar(result.data.avatar);
  };
  useLayoutEffect(() => {
    handleGetProfile();
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const actions = [
    { icon: <FileCopyOutlined />, name: "Copy" },
    { icon: <Save />, name: "Save" },
    { icon: <Print />, name: "Print" },
    { icon: <Share />, name: "Share" },
  ];
  const openModalProfile = () => {
    setOpenProfile(true);
    setAnchorEl(null);
  };
  const closeModalProfile = () => setOpenProfile(false);
  const openModalChangePassword = () => {
    setOpenChangePassword(true);
    setAnchorEl(null);
  };
  const closeModalChangePassword = () => setOpenChangePassword(false);
  const handleSignOut = () => {
    Cookies.delete("token");
    Cookies.delete("refreshToken");
    window.location.reload(false);
  };

  const handleCloseUpdate = () => {
    setOpenProfile(false);
    setOpenAlertProfile(true);
    setTimeout(() => {
      setOpenAlertProfile(false);
    }, 2000);

  };

  const handleCloseUpdatePassword = () => {
    setOpenChangePassword(false);
    setOpenAlertProfile(true);
    setTimeout(() => {
      setOpenAlertProfile(false);
    }, 2000);

  };

  const handleCloseUpdateAvatar = () => {
    setOpenAlertProfile(true);
    handleGetProfile();
    setTimeout(() => {
      setOpenAlertProfile(false);
    }, 2000);

  };

  const handleCloseAlert = () => setOpenAlertProfile(false);
  return (
    <div className={styles.con}>
      <Snackbar
        open={openAlertProfile}
        sx={{marginTop:"65px"}}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>

      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 12 }}
          >
            <Public sx={{ fontSize: "40px" }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            KMESS
          </Typography>
          <div className={styles.choi}>
            <IconButton
              size="small"
              sx={{ mr: 12 }}
              onClick={handleMenu}
              color="inherit"
            >
              {avatar===""?<Box sx={{ width: 56, height: 56 }} />:<Avatar
                alt=""
                src={avatar}
                sx={{ width: 56, height: 56 }}
              />}
              
            </IconButton>

            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={openModalProfile}>
                <PersonOutlined
                  sx={{
                    mb: "3px",
                    mr: 1,
                    fontSize: "30px",
                    color: "#00000099",
                  }}
                />
                Quản lý tài khoản
              </MenuItem>
              <Divider />
              <MenuItem onClick={openModalChangePassword}>
                <LockOutlined
                  sx={{
                    mb: "3px",
                    mr: 1,
                    fontSize: "30px",
                    color: "#00000099",
                  }}
                />
                Đổi mật khẩu
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <OutputOutlined
                  sx={{
                    mb: "3px",
                    mr: 1,
                    fontSize: "30px",
                    color: "#00000099",
                  }}
                />
                Đăng xuất
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <ProfileModal open={openProfile} onClose={closeModalProfile} onClose2={handleCloseUpdate} onClose3={handleCloseUpdateAvatar}/>
      <ChangePasswordModal open={openChangePassword} onClose={closeModalChangePassword} onClose2={handleCloseUpdatePassword}/>
      <div className={styles.datatable}>
        <DataTable/>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 50, right: 50 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
};
export default Home;
