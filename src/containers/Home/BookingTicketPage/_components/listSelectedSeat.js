import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteSeatAction } from "../modules/actions";

class ListSelectedSeat extends Component {
  render() {
    return (
      <React.Fragment>
        {/*  */}
        <div>
          <p className="ml-3">
            <span style={{ fontWeight: "bold" }}>Tên phim : </span>
            <span>{this.props.thongTinPhim?.tenPhim}</span>
          </p>
          <p className="ml-3">
            <span style={{ fontWeight: "bold" }}>Ngày chiếu : </span>
            <span>{this.props.thongTinPhim?.ngayChieu}</span>
          </p>
          <p className="ml-3">
            <span style={{ fontWeight: "bold" }}>Giờ chiếu : </span>
            <span>{this.props.thongTinPhim?.gioChieu}</span>
          </p>
        </div>
        {/*  */}
        <div className="d-flex flex-row align-items-center">
          <span className="gheDuocChon ml-3 mr-2 my-1"></span>
          <span style={{ fontSize: "13px" }}>Ghế đã đặt</span>
        </div>
        <div className="d-flex flex-row align-items-center">
          <span className="gheDangChon ml-3 mr-2 my-1"></span>
          <span style={{ fontSize: "13px" }}>Ghế đang chọn</span>
        </div>
        <div className="d-flex flex-row align-items-center">
          <span className="ghe ml-3 mr-2 my-2"></span>
          <span style={{ fontSize: "13px" }}>Ghế chưa đặt</span>
        </div>

        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table id="main-table" className="table table-dark table-sm">
            <thead>
              <tr>
                <th className="col-4">Số ghế</th>
                <th className="col-4">Giá</th>
                <th className="col-4">Loại ghế</th>
                <th className="col-4">Hủy</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dsGheDangDat.map((item) => {
                return (
                  <tr>
                    <td className="col-4">
                      {item.hang}
                      {item.cot}
                    </td>
                    <td className="col-4">{item.ghe.giaVe}</td>
                    <td className="col-4">
                      {item.ghe.loaiGhe === "Thuong" ? "Thường" : "VIP"}
                    </td>
                    <td className="col-4">
                      <button
                        className="btnDelete"
                        onClick={() => {
                          this.props.deleteSeat(item.ghe.maGhe);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="text-warning">
                <td>Tổng tiền</td>
                <td>
                  {this.props.dsGheDangDat.reduce((tongTien, item, index) => {
                    return (tongTien += item.ghe.giaVe);
                  }, 0)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dsGheDangDat: state.bookingTicketReducer.dsGheDangDat,
    thongTinPhim: state.bookingTicketReducer.thongTinPhim,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSeat: (maGhe) => {
      dispatch(deleteSeatAction(maGhe));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectedSeat);
