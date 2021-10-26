import React, { Component } from "react";
import "./style.css";
import { actFetchSignUp, actSignUpReset } from "./modules/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        taiKhoanSignUp: "",
        emailSignUp: "",
        matKhauSignUp: "",
        phoneSignUp: "",
        hoTenSignUp: "",
        maNhom: "GP02",
      },
      //lưu thông báo lỗi
      errorsInput: {
        taiKhoanSignUp: "",
        emailSignUp: "",
        matKhauSignUp: "",
        phoneSignUp: "",
        hoTenSignUp: "",
        maNhom: "",
      },
      taiKhoanSignUpValid: false,
      emailSignUpValid: false,
      matKhauSignUpValid: false,
      phoneSignUpValid: false,
      hoTenSignUpValid: false,
      //form chua hop le
      formSignUpValid: false,
    };
  }

  componentWillUnmount() {
    this.props.reset();
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
    let {
      taiKhoanSignUpValid,
      emailSignUpValid,
      matKhauSignUpValid,
      phoneSignUpValid,
      hoTenSignUpValid,
    } = this.state;
    switch (name) {
      case "taiKhoanSignUp":
        taiKhoanSignUpValid = mess === "" ? true : false;
        if (value && value.length > 30 && value.length <= 4) {
          mess = "Tài khoản không hợp lệ";
          taiKhoanSignUpValid = false;
        }
        break;

      case "emailSignUp":
        emailSignUpValid = mess === "" ? true : false;
        if (
          value &&
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          mess = "Email không hợp lệ";
          emailSignUpValid = false;
        }
        break;
      case "matKhauSignUp":
        matKhauSignUpValid = mess === "" ? true : false;
        if (value && value.length > 30 && value.length <= 7) {
          mess = "Mật khẩu không hợp lệ";
          matKhauSignUpValid = false;
        }
        break;
      case "phoneSignUp":
        phoneSignUpValid = mess === "" ? true : false;
        if (value && !value.match(/^(?=.{9,11}$)[0-9]+$/)) {
          mess = "Số điện thoại không hợp lệ";
          phoneSignUpValid = false;
        }
        break;
      case "hoTenSignUp":
        hoTenSignUpValid = mess === "" ? true : false;
        if (value && value.length < 2) {
          mess = "Họ tên không hợp lệ";
          hoTenSignUpValid = false;
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        errorsInput: { ...this.state.errorsInput, [name]: mess },
        taiKhoanSignUpValid,
        emailSignUpValid,
        matKhauSignUpValid,
        phoneSignUpValid,
        hoTenSignUpValid,
      },
      () => {
        this.handleFormSignUpValid();
      }
    );
  };

  handleFormSignUpValid = () => {
    let {
      taiKhoanSignUpValid,
      emailSignUpValid,
      matKhauSignUpValid,
      phoneSignUpValid,
      hoTenSignUpValid,
    } = this.state;

    this.setState({
      formSignUpValid:
        taiKhoanSignUpValid &&
        emailSignUpValid &&
        matKhauSignUpValid &&
        phoneSignUpValid &&
        hoTenSignUpValid,
    });
  };

  handleSubmitSignUp = (e) => {
    e.preventDefault();
    const user = {
      taiKhoan: this.state.values.taiKhoanSignUp,
      matKhau: this.state.values.matKhauSignUp,
      email: this.state.values.emailSignUp,
      soDt: this.state.values.phoneSignUp,
      maNhom: this.state.values.maNhom,
      hoTen: this.state.values.hoTenSignUp,
    };
    this.props.signUp(user, this.props.history);
  };

  renderNoti = () => {
    const { errorSignUp } = this.props;
    return (
      errorSignUp && (
        <div className="auth-result">
          {errorSignUp?.response?.data?.content}
        </div>
      )
    );
  };

  currentView = () => {
    const { errorsInput } = this.state;
    return (
      <form onSubmit={this.handleSubmitSignUp}>
        <h2>Đăng ký</h2>

        <fieldset>
          <legend>Tạo tài khoản</legend>
          {this.renderNoti()}
          <ul>
            <li>
              <label for="username">Tài khoản:</label>
              <input
                type="text"
                id="username"
                name="taiKhoanSignUp"
                value={this.state.values.taiKhoanSignUp}
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.taiKhoanSignUp ? (
                <div className="show-error">{errorsInput.taiKhoanSignUp}</div>
              ) : (
                ""
              )}
            </li>
            <li>
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                name="emailSignUp"
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.emailSignUp ? (
                <div className="show-error">{errorsInput.emailSignUp}</div>
              ) : (
                ""
              )}
            </li>
            <li>
              <label for="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                name="matKhauSignUp"
                value={this.state.values.matKhauSignUp}
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.matKhauSignUp ? (
                <div className="show-error">{errorsInput.matKhauSignUp}</div>
              ) : (
                ""
              )}
            </li>
            <li>
              <label for="phone">Số điện thoại:</label>
              <input
                id="phone"
                name="phoneSignUp"
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.phoneSignUp ? (
                <div className="show-error">{errorsInput.phoneSignUp}</div>
              ) : (
                ""
              )}
            </li>
            <li>
              <label for="fullname">Họ tên:</label>
              <input
                id="fullname"
                name="hoTenSignUp"
                onChange={this.handleOnChange}
                onBlur={this.handleErrors}
              />
              {errorsInput.hoTenSignUp ? (
                <div className="show-error">{errorsInput.hoTenSignUp}</div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </fieldset>
        <button
          className="signUpBtn login-form-btn"
          type="submit"
          disabled={!this.state.formSignUpValid}
        >
          Đăng ký
        </button>
        <Link to="/login" className="login-form-btn">
          Bạn đã có tài khoản?
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
    loading: state.signUpReducer.loading,
    dataSignUp: state.signUpReducer.dataSignUp,
    errorSignUp: state.signUpReducer.errorSignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, history) => {
      dispatch(actFetchSignUp(user, history));
    },
    reset: () => {
      dispatch(actSignUpReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

// sao em k thấy hiển thị gì hết á
// dang chay binh thuong ma ko biet sao em vo cai no trang boc de chi khoi dong lai
