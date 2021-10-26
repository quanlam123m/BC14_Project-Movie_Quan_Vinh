import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { actFetchAddUser } from "./modules/actions";
import Loader from "./../../../../components/Loader/";

export default function AddUser() {
  const data = useSelector((state) => state.addUserReducer.data);
  const loading = useSelector((state) => state.addUserReducer.loading);
  const error = useSelector((state) => state.addUserReducer.error);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP02",
    maLoaiNguoiDung: "",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(actFetchAddUser(state));
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelect = (value) => {
    setState({
      ...state,
      maLoaiNguoiDung: value,
    });
  };
  if (loading) return <Loader />;

  const renderNotice = () => {
    if (!error && data) {
      return (
        <div className="alert alert-success">
          Bạn đã thêm tài khoản thành công
        </div>
      );
    }
    return (
      error && (
        <div className="alert alert-danger">
          {error?.response?.data?.content}
        </div>
      )
    );
  };

  return (
    <>
      <Form
        onSubmitCapture={handleAddUser}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Thêm người dùng</h3>
        {renderNotice()}
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input name="matKhau" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input name="hoTen" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input name="soDt" onChange={handleOnchange} />
        </Form.Item>
        <Form.Item label="Mã người dùng">
          <Select placeholder="Chọn loại người dùng" onChange={handleSelect}>
            <Select.Option value="QuanTri">Quản trị</Select.Option>
            <Select.Option value="KhachHang">Khách hàng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded  "
            type="submit"
          >
            Thêm người dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
