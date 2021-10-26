import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

class Tab extends Component {
  renderLichChieu = (lichChieu) => {
    return lichChieu?.map((item) => {
      return (
        <Link
          className="suat-chieu mr-4 mb-3"
          to={`/booking/${item?.maLichChieu}`}
        >
          <div>{new Date(item?.ngayChieuGioChieu).toLocaleDateString()}</div>
          <div>{new Date(item?.ngayChieuGioChieu).toLocaleTimeString()}</div>
        </Link>
      );
    });
  };

  findIndex = (maRap, dsRap) => {
    return dsRap.findIndex((item) => {
      return item.maRap === maRap;
    });
  };
  renderRap = (cumRap) => {
    let danhSachRap = [];
    let result = -1;
    cumRap?.lichChieuPhim.map((lichChieu) => {
      result = this.findIndex(lichChieu.maRap, danhSachRap);
      if (result === -1) {
        danhSachRap.push({ maRap: lichChieu.maRap, tenRap: lichChieu.tenRap });
      }
    });
    return danhSachRap?.map((rap) => {
      return (
        <div className="d-flex  justify-content-start rap-phim">
          <div className="ten-rap d-flex">
            <FontAwesomeIcon className="pink rating-icon" icon={faHeart} />
            <div className="ten-rap-text ml-2">Tên Rạp: {rap.tenRap}</div>
          </div>
          <div className="lich-chieu d-flex flex-wrap">
            {this.renderLichChieu(cumRap?.lichChieuPhim)}
          </div>
          <hr />
        </div>
      );
    });
  };
  renderCumRap = (heThongRap) => {
    return heThongRap?.cumRapChieu.map((cumRap, index) => {
      return (
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <div
                data-toggle="collapse"
                data-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
                style={{ cursor: "pointer" }}
                className="collapsed"
              >
                <div className="tab-body d-flex justify-content-between">
                  <div>{cumRap.tenCumRap}</div>
                  <div>{cumRap.diaChi}</div>
                </div>
              </div>
            </div>
            <div
              id={`collapse${index}`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body tab-body">{this.renderRap(cumRap)}</div>
            </div>
          </div>
        </div>
      );
    });
  };
  renderHTRap = (dataTongHop) => {
    return dataTongHop?.heThongRapChieu.map((heThongRap, index) => {
      if (index === 0)
        return (
          <div
            className="tab-pane fade show active"
            id={`pills-${heThongRap.maHeThongRap}`}
            role="tabpanel"
            aria-labelledby={`pills-${heThongRap.maHeThongRap}-tab`}
          >
            {this.renderCumRap(heThongRap)}
          </div>
        );
      return (
        <div
          className="tab-pane fade"
          id={`pills-${heThongRap.maHeThongRap}`}
          role="tabpanel"
          aria-labelledby={`pills-${heThongRap.maHeThongRap}-tab`}
        >
          {this.renderCumRap(heThongRap)}
        </div>
      );
    });
  };

  renderTabTitle = (data) => {
    return data?.heThongRapChieu.map((rap, index) => {
      if (index === 0) {
        return (
          <li className="nav-item " key={rap?.maHeThongRap}>
            <a
              className="nav-link active"
              id={`pills-${rap?.maHeThongRap}-tab`}
              data-toggle="pill"
              href={`#pills-${rap?.maHeThongRap}`}
              role="tab"
              aria-controls={`pills-${rap?.maHeThongRap}`}
              aria-selected="true"
            >
              <img
                className="rap-logo-tab"
                src={rap?.logo}
                alt={rap?.tenHeThongRap}
              />
            </a>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={rap?.maHeThongRap}>
            <a
              className="nav-link"
              id={rap?.maHeThongRap}
              data-toggle="pill"
              href={`#pills-${rap?.maHeThongRap}`}
              role="tab"
              aria-controls={`pills-${rap?.maHeThongRap}`}
              aria-selected="true"
            >
              <img
                className="rap-logo-tab"
                src={rap?.logo}
                alt={rap?.tenHeThongRap}
              />
            </a>
          </li>
        );
      }
    });
  };

  render() {
    const { dataTongHop } = this.props;
    return (
      <div id="tab">
        {/* Tab header: Hệ thống rạp */}
        <ul
          className="nav nav-pills mb-3 tab-header"
          id="pills-tab"
          role="tablist"
        >
          {this.renderTabTitle(dataTongHop)}
        </ul>
        {/* Tab content: Danh sách cụm rạp và lịch chiếu */}
        <div className="tab-content mb-5" id="pills-tabContent">
          {/* 1 hệ thống rạp */}
          {this.renderHTRap(dataTongHop)}
        </div>
      </div>
    );
  }
}

export default Tab;
