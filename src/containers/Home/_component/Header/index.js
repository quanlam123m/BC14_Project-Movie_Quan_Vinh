import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actLogout } from "../../LoginPage/modules/actions";

class HeaderComponent extends Component {
  renderBtn = () => {
    if (localStorage.getItem("User")) {
      return (
        <>
          <button
            className="btn btn-outline-danger ml-2  textBtn logoutBtn"
            onClick={() => {
              this.props.logOut(this.props.history);
            }}
          >
            Đăng xuất
          </button>
          <button
            className="imgBtn btn btn-outline-danger logoutBtn"
            onClick={() => {
              this.props.logOut(this.props.history);
            }}
          >
            <FontAwesomeIcon className="icon-signUp" icon={faSignOutAlt} />
          </button>
        </>
      );
    }
    return (
      <>
        <Link to="/signup" className="btn btn-outline-danger textBtn">
          Đăng ký
        </Link>
        <Link to="/auth" className="btn btn-outline-danger ml-2  textBtn">
          Đăng nhập
        </Link>

        <Link to="/login" className="imgBtn btn btn-outline-danger">
          <FontAwesomeIcon className="icon-signIn" icon={faSignInAlt} />
        </Link>
        <Link to="/signup" className="imgBtn btn btn-outline-danger">
          <FontAwesomeIcon className="icon-signUp" icon={faUserPlus} />
        </Link>
      </>
    );
  };
  render() {
    return (
      <header>
        <div
          className="header-top"
          style={{ backgroundColor: `rgb(51, 53, 69)`, height: "80px" }}
        >
          <div className="container" style={{ height: "100%" }}>
            <div
              className="row d-flex justify-content-between"
              style={{ height: "100%" }}
            >
              <div className="d-flex align-items-center myLogo">
                <Link to="/">
                  <img
                    src="/asset/img/logo1.png"
                    alt="logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Link>
                <input
                  className="ml-3 timKiem p-1"
                  type="search"
                  placeholder="Tên rạp, tên phim"
                  style={{}}
                />
                <button className="btn btn-outline-danger" id="search">
                  <FontAwesomeIcon className="icon" icon={faSearch} />
                </button>
              </div>
              <div className="d-flex align-items-center">
                {this.renderBtn()}
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-bottom"
          style={{ backgroundColor: `rgb(31, 37, 51)` }}
        >
          <div className="container">
            <div className="row d-flex justify-content-center  align-items-baseline">
              <nav className="navbar navbar-expand-lg navbar-light">
                <button
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faBars}
                    style={{ color: `rgb(248, 68, 100)` }}
                  />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo01"
                >
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active mx-2">
                      <NavLink
                        id="menu"
                        exact
                        activeClassName="active"
                        className="nav-link"
                        to="/"
                      >
                        Trang chủ
                      </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink
                        id="menu"
                        activeClassName="active"
                        className="nav-link"
                        to="/all-movie"
                      >
                        Danh sách phim
                      </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink
                        id="menu"
                        activeClassName="active"
                        className="nav-link"
                        to="/list-cine"
                      >
                        Danh sách rạp
                      </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                      <NavLink
                        id="menu"
                        activeClassName="active"
                        className="nav-link"
                        to="/mypage"
                      >
                        Tài khoản
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (history) => {
      dispatch(actLogout(history));
    },
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(HeaderComponent);
export default withRouter(ConnectedComponent);
