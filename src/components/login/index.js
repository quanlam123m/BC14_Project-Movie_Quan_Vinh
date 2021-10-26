import React, { Component } from "react";
// import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "signUp",
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
    });
  };

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>Đăng ký</h2>
            <fieldset>
              <legend>Tạo tài khoản</legend>
              <ul>
                <li>
                  <label for="username">Tài khoản:</label>
                  <input type="text" id="username" required />
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
                <li>
                  <label for="password">Mật khẩu:</label>
                  <input type="password" id="password" required />
                </li>
              </ul>
            </fieldset>
            <button>Đăng ký</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Bạn đã có tài khoản?
            </button>
          </form>
        );
        break;
      case "logIn":
        return (
          <form>
            <h2>Chào mừng bạn trở lại!</h2>
            <fieldset>
              <legend>Đăng nhập</legend>
              <ul>
                <li>
                  <label for="username">Tài khoản:</label>
                  <input type="text" id="username" required />
                </li>
                <li>
                  <label for="password">Mật khẩu:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => this.changeView("PWReset")} href="#">
                    Quên mật khẩu?
                  </a>
                </li>
              </ul>
            </fieldset>
            <button>Đăng nhập</button>
            <button type="button" onClick={() => this.changeView("signUp")}>
              Tạo tài khoản
            </button>
          </form>
        );
        break;
      case "PWReset":
        return (
          <form>
            <h2>Thiết đặt lại mật khẩu</h2>
            <fieldset>
              <legend>Thiết đặt lại mật khẩu</legend>
              <ul>
                <li>
                  <em>Mail thiết đặt lại mật khẩu sẽ được gửi vào hòm thư của bạn.</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Gửi liên kết thiết đặt mật khẩu</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Trở lại trang đăng nhập
            </button>
          </form>
        );
      default:
        break;
    }
  };

  render() {
    return <section id="entry-page">{this.currentView()}</section>;
  }
}
