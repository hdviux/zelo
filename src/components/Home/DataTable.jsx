import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AdminAPI from "../api/AdminAPI";
import Cookies from "../config/cookie";
import { Avatar, IconButton, Switch } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const handleGetListUser = async () => {
    const result = await AdminAPI.getlistuser(JSON.parse(Cookies.get("token")));
    let array = [];
    console.log(result.data.data);
    for (let index = 0; index < result.data.data.length; index++) {
      array.push({
        avatar: result.data.data[index].avatar,
        id: result.data.data[index].employid,
        name: result.data.data[index].name,
        department: result.data.data[index].department,
        isDeleted: result.data.data[index].isDeleted,
      });
    }
    setRows(array);
  };
  useEffect(() => {
    handleGetListUser();
  }, []);
  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 160,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            {params.value === "" ? (
              <Avatar>OP</Avatar>
            ) : (
              <Avatar src={params.value} />
            )}
          </>
        );
      },
    },
    { field: "id", headerName: "Mã nhân viên", width: 250 },
    { field: "name", headerName: "Tên người dùng", width: 300 },
    { field: "department", headerName: "Phòng ban", width: 210 },
    {
      field: "isDeleted",
      headerName: "Trạng thái",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Switch defaultChecked={!params.value} />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      width: 140,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <IconButton>
              <RemoveRedEyeIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "80%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick 
        
      />
    </div>
  );
};

export default DataTable;
