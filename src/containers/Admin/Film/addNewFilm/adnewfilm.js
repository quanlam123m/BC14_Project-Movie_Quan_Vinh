import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useFormik } from "formik";
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from "antd";
import { actAddMovie } from "./modules/actions";
import Loader from "./../../../../components/Loader/";

export default function AdNewFilm(props) {
  const error = useSelector((state) => state.addMovieReducer.error);
  const data = useSelector((state) => state.addMovieReducer.data);
  const loading = useSelector((state) => state.addMovieReducer.loading);
  const dispatch = useDispatch();
  const [imgstate, setimgState] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: "GP02",
    },
    onSubmit: (values) => {
      console.log("value", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(actAddMovie(formData));
    },
  });

  const handlechangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangReview = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleOnchangeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setimgState(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };
  if (loading) return <Loader />;
  const renderNotice = () => {
    if (!error && data) {
      return (
        <div className="alert alert-success">
          B???n ???? th??m phim m???i th??nh c??ng
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

  if (loading) return <Loader />;

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3>Th??m phim m???i</h3>
        {renderNotice()}
        <Form.Item label="K??ch th?????c" name="size">
          <Radio.Group>
            <Radio.Button value="small">Nh???</Radio.Button>
            <Radio.Button value="default">V???a</Radio.Button>
            <Radio.Button value="large">L???n</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="T??n phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="M?? t???">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ng??y kh???i chi???u">
          <DatePicker format="DD/MM/YYYY" onChange={handlechangeDatePicker} />
        </Form.Item>
        <Form.Item label="??ang chi???u" valuePropName="checked">
          <Switch onChange={handleChangSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="S???p chi???u" valuePropName="checked">
          <Switch onChange={handleChangSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangSwitch("hot")} />
        </Form.Item>
        <Form.Item label="????nh gi?? (sao)">
          <InputNumber
            min={1}
            max={10}
            onChange={handleChangReview("danhGia")}
          />
        </Form.Item>
        <Form.Item label="H??nh ???nh">
          <input
            type="file"
            onChange={handleOnchangeFile}
            accept=" image/png, image/jpeg, image/jpg, image/gif "
          />
          <br />
          <img src={imgstate} style={{ width: 150, height: 150 }} alt="..." />
        </Form.Item>

        <Form.Item>
          <button
            className=" bg-indigo-800 p-2 rounded text-white ml-48  "
            type="submit"
          >
            Th??m phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
