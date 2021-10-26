import React, { Component } from "react";
import { actFetchUpdateUserInfo, actUpdateInfoReset } from "../modules/actions";
import { connect } from "react-redux";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      values: {
        taiKhoan: userInfo?.taiKhoan,
        email: userInfo?.email,
        matKhau: userInfo?.matKhau,
        phone: userInfo?.soDT === null ? "" : userInfo?.soDT,
        hoTen: userInfo?.hoTen,
        maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
        maNhom: "GP02",
      },
      //lưu thông báo lỗi
      errorsInput: {
        email: "",
        matKhau: "",
        phone: "",
        hoTen: "",
      },
      emailValid: false,
      matKhauValid: false,
      phoneValid: false,
      hoTenValid: false,
      //form chua hop le
      formValid: false,
    };
  }
  componentWillUnmount() {
    this.props.reset();
  }
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  checkMatKhau = () => {
    const { matKhau } = this.state.values;
    let mess = matKhau.trim() === "" ? "Vui lòng nhập thông tin" : "";
    let matKhauValid = mess === "" ? true : false;
    if (matKhau && matKhau.length > 30 && matKhau.length <= 7) {
      mess = "Mật khẩu không hợp lệ";
      matKhauValid = false;
    }

    this.setState({
      errorsInput: { ...this.state.errorsInput, matKhau: mess },
      matKhauValid,
    });
  };

  checkEmail = () => {
    const { email } = this.state.values;
    let mess = email.trim() === "" ? "Vui lòng nhập thông tin" : "";
    let emailValid = mess === "" ? true : false;
    if (
      email &&
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      mess = "Email không hợp lệ";
      emailValid = false;
    }

    this.setState({
      errorsInput: { ...this.state.errorsInput, email: mess },
      emailValid,
    });
  };

  checkPhone = () => {
    const { phone } = this.state.values;
    let mess = phone.trim() === "" ? "Vui lòng nhập thông tin" : "";
    let phoneValid = mess === "" ? true : false;
    if (phone && !phone.match(/^(?=.{9,11}$)[0-9]+$/)) {
      mess = "Số điện thoại không hợp lệ";
      phoneValid = false;
    }

    this.setState({
      errorsInput: { ...this.state.errorsInput, phone: mess },
      phoneValid,
    });
  };

  checkHoTen = () => {
    const { hoTen } = this.state.values;
    let mess = hoTen.trim() === "" ? "Vui lòng nhập thông tin" : "";
    let hoTenValid = mess === "" ? true : false;
    if (hoTen && hoTen.length < 2) {
      mess = "Họ tên không hợp lệ";
      hoTenValid = false;
    }

    this.setState({
      errorsInput: { ...this.state.errorsInput, hoTen: mess },
      hoTenValid,
    });
  };

  handleErrors = async () => {
    await this.checkMatKhau();
    await this.checkEmail();
    await this.checkPhone();
    await this.checkHoTen();
    await this.handleFormValid();
  };

  handleFormValid = () => {
    let { emailValid, matKhauValid, phoneValid, hoTenValid } = this.state;

    this.setState({
      formValid: emailValid && matKhauValid && phoneValid && hoTenValid,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.checkMatKhau();
    await this.checkEmail();
    await this.checkPhone();
    await this.checkHoTen();
    await this.handleFormValid();
    if (this.state.formValid) {
      const user = {
        taiKhoan: this.state.values.taiKhoan,
        matKhau: this.state.values.matKhau,
        email: this.state.values.email,
        soDt: this.state.values.phone,
        maNhom: this.state.values.maNhom,
        hoTen: this.state.values.hoTen,
        maLoaiNguoiDung: this.state.values.maLoaiNguoiDung,
      };
      this.props.updateUserInfo(user);
    }
  };

  renderNoti = () => {
    const { errorUpdateInfo, updateSuccessMess } = this.props;
    return (
      <div className="update-result">
        {errorUpdateInfo === null
          ? updateSuccessMess
          : errorUpdateInfo?.response?.data?.content}
      </div>
    );
  };

  render() {
    const { userInfo } = this.props;
    const { errorsInput } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderNoti()}
        <div className="form-group row">
          <label htmlFor="taiKhoan" className="col-sm-2 col-form-label">
            Tài khoản
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control  inputFormMyPage"
              id="taiKhoan"
              disabled
              value={`${userInfo?.taiKhoan}`}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Mật khẩu
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control  inputFormMyPage"
              id="inputPassword"
              name="matKhau"
              placeholder="Mật khẩu"
              value={this.state.values.matKhau}
              onChange={this.handleOnChange}
            />
            {errorsInput.matKhau ? (
              <div className="show-error">{errorsInput.matKhau}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputHoTen" className="col-sm-2 col-form-label">
            Họ tên
          </label>
          <div className="col-sm-10 inputFormMyPage">
            <input
              type="text"
              className="form-control inputFormMyPage"
              id="inputHoTen"
              name="hoTen"
              placeholder="Họ tên"
              value={this.state.values.hoTen}
              onChange={this.handleOnChange}
            />
            {errorsInput.hoTen ? (
              <div className="show-error">{errorsInput.hoTen}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10 inputFormMyPage">
            <input
              type="email"
              className="form-control inputFormMyPage"
              id="inputEmail"
              placeholder="info@example.com"
              name="email"
              value={this.state.values.email}
              onChange={this.handleOnChange}
            />
            {errorsInput.email ? (
              <div className="show-error">{errorsInput.email}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputSDT" className="col-sm-2 col-form-label">
            Số điện thoại
          </label>
          <div className="col-sm-10 inputFormMyPage">
            <input
              type="text"
              className="form-control inputFormMyPage"
              id="inputSDT"
              name="phone"
              placeholder="090xxxxxxxx"
              value={this.state.values.phone}
              onChange={this.handleOnChange}
            />
            {errorsInput.phone ? (
              <div className="show-error">{errorsInput.phone}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-danger">
          Cập nhật
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingUpdateInfo: state.userHistoryReducer.loadingUpdateInfo,
    errorUpdateInfo: state.userHistoryReducer.errorUpdateInfo,
    dataUpdateInfo: state.userHistoryReducer.dataUpdateInfo,
    updateSuccessMess: state.userHistoryReducer.updateSuccessMess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (user) => {
      dispatch(actFetchUpdateUserInfo(user));
    },
    reset: () => {
      dispatch(actUpdateInfoReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
