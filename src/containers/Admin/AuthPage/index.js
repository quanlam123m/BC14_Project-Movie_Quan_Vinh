import React, { useState } from "react";
import "./css/main.css";
import "./css/util.css";
import { actAuthApi } from "./modules/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../../../components/Loader";

function AuthPage(props) {
  const [state, setState] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    return <Loader />;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(actAuthApi(state, props.history));
  };
  if (loading) return <Loader />;

  const renderNoti = () => {
    return (
      error && (
        <div className="alert alert-danger">
          {error?.response.data?.content}
        </div>
      )
    );
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          {renderNoti()}
          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title p-b-43">Login</span>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="taiKhoan"
                onChange={handleOnChange}
                placeholder="Username"
              />
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="matKhau"
                onChange={handleOnChange}
                placeholder="Password"
              />
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>
          </form>
          <div
            className="login100-more"
            style={{ backgroundImage: 'url("./asset/img/bg-01.jpg")' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
