import React from "react";
import DaySlider from "./dayslider";
import Tab from "./tab";
import InfoMovie from "./infomovie";

export default function Schedule(props) {
  const {  dataTongHop } = props;
  return (
    <div className="container schedule">
      {/* info movie */}
      <div
        style={{
          padding: "20px",
        }}
      >
        <div className="info-movie">
          <div className="content py-4 px-5">
            <InfoMovie dataPhim={dataTongHop} />
          </div>
        </div>
      </div>
      {/* Mô tả */}
      <div className="my-5">
        <h4>Mô tả</h4>
        <div>
          <span>{dataTongHop?.moTa}</span>
        </div>
      </div>
      {/* Lịch chiếu */}
      <div>
        <h4>Lịch chiếu</h4>
        <DaySlider />
        <Tab dataTongHop={dataTongHop} />
      </div>
    </div>
  );
}
