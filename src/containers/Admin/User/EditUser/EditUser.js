import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
// import { actAddUser } from "./modules/actions";
import Loader from "./../../../../components/Loader/";
import { actFetchUpdateUser } from "./update/modules/actions";
import { values } from "lodash";
import { actFetchEditUser } from "./modules/actions";

export default function EditUser(props) {
  const data = useSelector((state) => state.addUserReducer.data);
  const loading = useSelector((state) => state.addUserReducer.loading);
  const error = useSelector((state) => state.addUserReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(actFetchEditUser(id));
  }, []);

  // const [state, setState] = useState({
  //   taiKhoan: "",
  //   matKhau: "",
  //   hoTen: "",
  //   email: "",
  //   soDt: "",
  //   maNhom: "GP02",
  //   maLoaiNguoiDung: "",
  // });

  // console.log("object", state);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: data?.taiKhoan,
      matKhau: data?.matKhau,
      hoTen: data?.hoTen,
      email: data?.email,
      soDt: data?.soDt,
      maNhom: "GP02",
      maLoaiNguoiDung: data?.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      console.log("value", values);
      let formData = new FormData();
      dispatch(actFetchUpdateUser(formData, props.history));
    },
  });
  return (
    <>
      <Form
        // onSubmitCapture={handleAddUser}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className=" text-center">Cập nhật người dùng</h3>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" value={formik.values.taiKhoan} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input name="matKhau" value={formik.values.matKhau} />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input name="hoTen" value={formik.values.hoTen} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" value={formik.values.email} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input name="soDt" value={formik.values.soDt} />
        </Form.Item>
        <Form.Item label="Mã người dùng">
          <Select placeholder="Chọn loại người dùng">
            <Select.Option value="QuanTri">Quản trị</Select.Option>
            <Select.Option value="KhachHang">Khách hàng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 text-white ml-48  rounded  "
            type="submit"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
