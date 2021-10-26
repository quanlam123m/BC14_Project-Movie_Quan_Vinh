import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import {
  faEnvelope,
  faHome,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

export default function Footer() {
  return (
    <footer
      className="text-center text-lg-start"
      style={{
        backgroundColor: `rgb(51, 53, 69)`,
        color: `rgb(204, 204, 204)`,
      }}
    >
      <div className="container">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi:</span>
          </div>
          <div>
            <NavLink to="/" className="me-4 text-reset">
              <FontAwesomeIcon
                className="icon mx-2"
                icon={faFacebook}
                style={{ fontSize: "40px" }}
              />
            </NavLink>
            <NavLink to="/" className="me-4 text-reset">
              <FontAwesomeIcon
                className="icon mx-2"
                icon={faTwitter}
                style={{ fontSize: "40px" }}
              />
            </NavLink>
            <NavLink to="/" className="me-4 text-reset">
              <FontAwesomeIcon
                className="icon mx-2"
                icon={faInstagram}
                style={{ fontSize: "40px" }}
              />
            </NavLink>
          </div>
        </section>

        <section className="footer-bottom">
          <div className="container text-left text-md-start mt-5">
            <div className="row mt-3 text-center">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 ">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#cccccc" }}
                >
                  <i className="fas fa-gem me-3" />
                  Về công ty
                </h6>
                <p>
                  <NavLink to="/" className="text-reset">
                    Giới Thiệu
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Tiện Ích Online
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Thẻ Quà Tặng
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Tuyển Dụng
                  </NavLink>
                </p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#cccccc" }}
                >
                  Điều khoản sử dụng
                </h6>
                <p>
                  <NavLink to="/" className="text-reset">
                    Điều Khoản Chung
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Điều Khoản Giao Dịch
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Chính Sách Thanh Toán
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Chính Sách Bảo Mật
                  </NavLink>
                </p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#cccccc" }}
                >
                  Đối tác
                </h6>
                <p>
                  <NavLink to="/" className="text-reset">
                    CGV
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    BHD Star
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Galaxycine
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/" className="text-reset">
                    Cinestar
                  </NavLink>
                </p>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#cccccc" }}
                >
                  Liên hệ
                </h6>
                <p>
                  <FontAwesomeIcon className="icon mr-1" icon={faHome} />
                  10 Pasture, P5, Quận 3, HCM
                </p>
                <p>
                  <FontAwesomeIcon className="icon mr-1" icon={faEnvelope} />
                  info@example.com
                </p>
                <p>
                  <FontAwesomeIcon className="icon mr-1" icon={faPhone} />+ 01
                  234 567 88
                </p>
                <p>
                  <FontAwesomeIcon className="icon mr-1" icon={faPrint} />+ 01
                  234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}
