import React, { Component } from "react";
import "./style.css";
import SeatRow from "./_components/seatRow";
import ListSelectedSeat from "./_components/listSelectedSeat";
import { connect } from "react-redux";
import {
  actFetchPhongVeInfo,
  actSetDataGhe,
  clearGheDangChon,
} from "./modules/actions";
import { Link } from "react-router-dom";
import Loader from "./../../../components/Loader";

class BookingTicketPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchDanhSachGhe(id);
  }

  componentWillUnmount() {
    this.props.clearDataUser();
  }

  editDataGhe = (danhSachGhe) => {
    let rowLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let dataGhe = [
      {
        hang: "",
        danhSachGhe: [
          { soGhe: "1" },
          { soGhe: "2" },
          { soGhe: "3" },
          { soGhe: "4" },
          { soGhe: "5" },
          { soGhe: "6" },
          { soGhe: "7" },
          { soGhe: "8" },
          { soGhe: "9" },
          { soGhe: "10" },
          { soGhe: "11" },
          { soGhe: "12" },
          { soGhe: "13" },
          { soGhe: "14" },
          { soGhe: "15" },
          { soGhe: "16" },
        ],
      },
    ];
    let hangGhe = [];
    let countCot = 0;
    let countHang = 0;
    danhSachGhe?.map((ghe) => {
      hangGhe.push(ghe);
      countCot++;
      if (countCot === 16) {
        dataGhe.push({
          hang: rowLetter[countHang],
          danhSachGhe: hangGhe,
        });
        countHang++;
        countCot = 0;
        hangGhe = [];
      }
    });
    return dataGhe;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.danhSachGhe !== this.props.danhSachGhe) {
      this.props.setDataGhe(this.editDataGhe(this.props.danhSachGhe));
    }
  }

  renderSeatRow = () => {
    return this.props.dataGhe.map((seatRow, index) => {
      return <SeatRow seatRow={seatRow} key={index} rowIndex={index} />;
    });
  };

  render() {
    if (this.props.loading) return <Loader />;
    let isDisplay = false;
    if (this.props.dsGheDangDat.length !== 0) isDisplay = true;
    return (
      <>
        <div
          className="container-fluid"
          style={{ paddingLeft: "0", paddingRight: "0" }}
        >
          <div
            className="bookingMovie "
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(43, 43, 44, 0.637), rgba(20, 9, 1, 0.719)), url("/asset/img/bg-2.jpg")`,
            }}
          >
            <div className="bookingMovie__container">
              <div className="row d-flex flex-wrap">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="seatmap">
                    <div className="sub-title mt-3 mb-2">Sơ đồ ghế</div>
                    <div className="screen mb-3">Màn hình</div>
                    {this.renderSeatRow()}
                  </div>
                </div>
                <div className="order-info col-lg-5 col-md-12 col-sm-12">
                  <div className="seatinfo">
                    <div className="sub-title mt-3 mb-2">Thông tin đặt chỗ</div>
                    <ListSelectedSeat />
                    <Link
                      to="/payment"
                      className="btn btn-danger"
                      style={{
                        position: "relative",
                        width: "100px",
                        left: "50%",
                        marginLeft: "-50px",
                        display: isDisplay ? "block" : "none",
                      }}
                    >
                      Mua vé
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.bookingTicketReducer.loading,
    error: state.bookingTicketReducer.error,
    danhSachGhe: state.bookingTicketReducer.danhSachGhe,
    dataGhe: state.bookingTicketReducer.dataGhe,
    dsGheDangDat: state.bookingTicketReducer.dsGheDangDat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDanhSachGhe: (id) => {
      dispatch(actFetchPhongVeInfo(id));
    },
    setDataGhe: (data) => {
      dispatch(actSetDataGhe(data));
    },
    clearDataUser: () => {
      dispatch(clearGheDangChon());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicketPage);
