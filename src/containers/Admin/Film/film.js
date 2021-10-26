import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SearchOutlined } from "@ant-design/icons";
import {
  actFetchListMovie,
  actFetchListMovie2,
} from "../../Home/ListMoviePage/modules/actions";
import { NavLink } from "react-router-dom";
import { actFetchDeleteMovie } from "./EditFilm/deleteFilm/actions";
export default function Film(props) {
  const { Search } = Input;
  const onSearch = (value) => {
    if (value.trim() !== "") {
      return dispatch(actFetchListMovie2(value));
    } else {
      return dispatch(actFetchListMovie(value));
    }
  };

  const data = useSelector((state) => state.listMovieReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchListMovie(props.history));
  }, []);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",

      sorter: (a, b) => a.maPhim - b.maPhim,
      // sortDrections: ["descen"],
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",

      render: (index, item) => {
        return (
          <Fragment>
            <img
              className="ml-2"
              src={item.hinhAnh}
              style={{ width: 50, height: 50 }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50 `;
              }}
            />
          </Fragment>
        );
      },
      sortDrections: ["descend", "ascend"],

      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",

      render: (text, item) => {
        return (
          <Fragment>
            {item.moTa.length > 100
              ? item.moTa.substr(0, 100) + "..."
              : item.moTa}
          </Fragment>
        );
      },
      sortDrections: ["descen"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, item) => {
        return (
          <Fragment>
            <NavLink
              key="1"
              className=" p-2 "
              to={`/dashboard/editfilm/${item.maPhim}`}
            >
              <EditIcon color="secondary" />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key="2"
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc chắn muốn xoá phim" + item.tenPhim
                  )
                ) {
                  dispatch(actFetchDeleteMovie(item.maPhim));
                }
              }}
            >
              <DeleteIcon color="error" />
            </span>
          </Fragment>
        );
      },

      width: "10%",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div className="container text text-4xl  ">
      <h3>Quản lý phim</h3>
      <Button
        type="primary"
        className="mb-2 rounded  "
        onClick={() => {
          props.history.push("/dashboard/addnewfilm");
        }}
      >
        Thêm phim
      </Button>
      <Search
        onSearch={onSearch}
        className="mb-3"
        placeholder="Nhập thông tin tên phim"
        enterButton={<SearchOutlined />}
        size="large"
      />

      <Table
        rowKey={"maPhim"}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
