import React, { useState } from "react";
import styles from "./Modal.module.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import UserAPI from "../../api/UserAPI";
import Cookies from "../../config/cookie";
const ChangePasswordModal = (props) => {
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
  const [dataModal, setDataModal] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const handleChangePassword = async () => {
    console.log(dataModal);
    if (dataModal.newPassword === dataModal.rePassword) {
      const data = {
        oldPassword: dataModal.oldPassword,
        newPassword: dataModal.newPassword,
      };
      const result = await UserAPI.changepassword(
        data,
        JSON.parse(Cookies.get("token"))
      );
      if (result && result.status === 200) {
        document.getElementById("closemodalupdatepassword").click();
      }
    } else {
      console.log(2);
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
        <Typography
          sx={{
            mt: 2,
            display: "flex",
            flex: 1,
            justifyContent: "center",
            fontSize: 30,
            borderBlockEnd: "1px solid rgb(184, 175, 175)",
            paddingBottom: 2,
            mb: 4,
          }}
        >
          Đổi mật khẩu
        </Typography>
        <div className={styles.formmodal}>
          <TextField
            type="password"
            label="Nhập mật khẩu cũ"
            size="small"
            className={styles.inputmodal}
            onChange={(e) =>
              setDataModal({
                ...dataModal,
                oldPassword: e.target.value,
              })
            }
          />
          <TextField
            type="password"
            label="Nhập mật khẩu mới"
            size="small"
            className={styles.inputmodal}
            onChange={(e) =>
              setDataModal({
                ...dataModal,
                rePassword: e.target.value,
              })
            }
          />
          <TextField
            type="password"
            label="Nhập lại mật khẩu mới"
            size="small"
            className={styles.inputmodal}
            onChange={(e) =>
              setDataModal({
                ...dataModal,
                newPassword: e.target.value,
              })
            }
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
              onClick={handleChangePassword}
            >
              Cập nhật
            </Button>
            <button
              hidden
              id="closemodalupdatepassword"
              onClick={props.onClose2}
            ></button>
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
