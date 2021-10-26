import { concat } from "lodash";
import React, { Component } from "react";
import "./style.css";
import { actFetchLogin, actLoginReset } from "./modules/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./../../../components/Loader";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        taiKhoan: "",
        matKhau: "",
      },
      //lưu thông báo lỗi
      errorsInput: {
        taiKhoan: "",
        matKhau: "",
      },
      taiKhoanValid: false,
      matKhauValid: false,
      //form chua hop le
      formLoginValid: false,
    };
  }
  
  componentWillUnmount() {
    this.props.actLoginReset();
  }

  // Form Sign Up
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleErrors = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? "Vui lòng nhập thông tin" : "";
    let { taiKhoanValid, matKhauValid } = this.state;
    switch (name) {
      case "taiKhoan":
        taiKhoanValid = mess === "" ? true : false;
        if (value && value.length > 30 && value.length <= 4) {
          mess = "Tài khoản không hợp lệ";
          taiKhoanValid = false;
        }
        break;

      case "matKhau":
        matKhauValid = mess === "" ? true : false;
        if (value && value.length > 30 && value.length <= 7) {
          mess = "Mật khẩu không hợp lệ";
          matKhauValid = false;
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        errorsInput: { ...this.state.errorsInput, [name]: mess },
        taiKhoanValid,
        matKhauValid,
      },
      () => {
        this.handleFormLoginValid();
      }
    );
  };

  handleFormLoginValid = () => {
    let { taiKhoanValid, matKhauValid } = this.state;

    this.setState({
      formLoginValid: taiKhoanValid && matKhauValid,
    });
  };

  handleSubmitLogin = (e) => {
    e.preventDefault();
    this.props.login(
      {
        taiKhoan: this.state.values.taiKhoan,
        matKhau: this.state.values.matKhau,
      },
      this.props.history
    );
  };

  renderNoti = () => {
    const { errorLogin } = this.props;
    return (
      errorLogin && (
        <div className="auth-result">{errorLogin?.response?.data?.content}</div>
      )
    );
  };

  currentView = () => {
    const { errorsInput } = this.state;
    return (
      <form onSubmit={this.handleSubmitLogin} action="/mypage">
        <h2>Chào mừng bạn trở lại!</h2>
        <fieldset>
          <legend>Đăng nhập</legend>
          {this.renderNoti()}
          <ul>
            <li>
              <label for="username">Tài khoản:</label>
              <input
                type="text"
                id="username"
                name="taiKhoan"
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.taiKhoan ? (
                <span className="show-error">{errorsInput.taiKhoan}</span>
              ) : (
                ""
              )}
            </li>
            <li>
              <label for="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                name="matKhau"
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.matKhau ? (
                <div className="show-error">{errorsInput.matKhau}</div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </fieldset>
        <button
          className="login-form-btn"
          type="submit"
          disabled={!this.state.formLoginValid}
        >
          Đăng nhập
        </button>
        <Link to="/signup" className="login-form-btn">
          Tạo tài khoản
        </Link>
      </form>
    );
  };

  render() {
    if (this.props.loading) return <Loader />;
    return <section id="entry-page">{this.currentView()}</section>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.logInReducer.loading,
    errorLogin: state.logInReducer.errorLogin,
    dataLogin: state.logInReducer.dataLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, history) => {
      dispatch(actFetchLogin(user, history));
    },
    actLoginReset: () => {
      dispatch(actLoginReset());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
