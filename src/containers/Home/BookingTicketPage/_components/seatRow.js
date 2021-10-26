import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSeatAction } from "../modules/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class SeatRow extends Component {
  renderSeat = () => {
    const { seatRow, rowIndex } = this.props;
    return seatRow.danhSachGhe.map((seat, index) => {
      if (rowIndex === 0) {
        // render dòng hiển thị thứ tự ghế
        return (
          <div className="rowNumber" key={index}>
            {seat.soGhe}
          </div>
        );
      } else {
        // render hàng ghế
        let cssSeat = "ghe";
        let disable = false;
        if (seat.daDat === true) {
          // nếu là ghế đã bị người khác đặt
          cssSeat = "gheDuocChon";
          disable = true;
        }

        // Xét trạng thái ghế
        let indexGheDangDat = this.props.dsGheDangDat.findIndex(
          (item) => seat.maGhe === item.ghe.maGhe
        );
        if (indexGheDangDat != -1) {
          //nếu là ghế đang chọn
          cssSeat = "gheDangChon";
        }
        return (
          <button
            className={`${cssSeat} my-1`}
            key={index}
            disabled={disable}
            onClick={() => {
              this.props.selectSeat(this.props.seatRow.hang, index + 1, seat);
            }}
          >
            <FontAwesomeIcon className="white user-icon" icon={faUser} />
          </button>
        );
      }
    });
  };
  render() {
    return (
      <div className="seatRow d-flex align-items-center">
        <div
          className="rowLetter"
          style={{
            width: "10%",
            textAlign: "center",
          }}
        >
          {this.props.seatRow.hang}
        </div>
        <div className="d-flex justify-content-around mr-3 seatRow-content">
          {this.renderSeat()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dsGheDangDat: state.bookingTicketReducer.dsGheDangDat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSeat: (hang, cot, ghe) => {
      dispatch(selectSeatAction(hang, cot, ghe));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatRow);
