import React, { Component } from "react";

export default class History extends Component {
  renderTicketInfo = (danhSachGhe) => {
    return danhSachGhe?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.tenHeThongRap}</td>
          <td>{item.tenCumRap}</td>
          <td>{item.tenRap}</td>
          <td>{item.tenGhe}</td>
        </tr>
      );
    });
  };

  render() {
    const { thongTinDatVe } = this.props;
    return (
      <div className="card my-2">
        <div className="card-horizontal d-flex flex-wrap">
          <div className="img-square-wrapper">
            <img
              style={{
                objectFit: "cover",
                objectPosition: "left top",
              }}
              className="movie-poster"
              src={thongTinDatVe?.hinhAnh}
              alt={thongTinDatVe?.tenPhim}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{thongTinDatVe?.tenPhim}</h5>
            <p className="card-text">
              <span>Thời lượng: {thongTinDatVe?.thoiLuongPhim} phút</span>
              <span className="ml-3">Giá vé: {thongTinDatVe?.giaVe} vnd</span>
            </p>
            <p className="card-text">
              <span>
                Ngày đặt:{" "}
                {new Date(thongTinDatVe?.ngayDat).toLocaleDateString()}
              </span>
              <span className="ml-3">
                Giờ đặt: {new Date(thongTinDatVe?.ngayDat).toLocaleTimeString()}
              </span>
            </p>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <table
                className="table table-sm"
                style={{ border: "1px solid #cccccc" }}
              >
                <thead>
                  <tr>
                    <th>Hệ thống rạp</th>
                    <th>Cụm rạp</th>
                    <th>Rạp</th>
                    <th>Số ghế</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTicketInfo(thongTinDatVe?.danhSachGhe)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
