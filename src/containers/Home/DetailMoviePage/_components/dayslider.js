import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.css";

export default class DaySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(), //date
      selectedItem: 0, //ngày hiện tại
    };
  }

  renderDay = (date, i) => {
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return (
      <div>
        <button className="day-item">
          <div>{date.getDate() + "/" + (date.getMonth() + 1)}</div>
          <div>{dayNames[date.getDay()]}</div>
        </button>
      </div>
    );
  };
  renderCalendar = () => {
    const { currentDate } = this.state;
    const date = [];
    for (let i = 0; i < 14; i++) {
      let newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + i
      );
      date.push(newDate);
    }
    return date?.map((item, index) => {
      return this.renderDay(item, index);
    });
  };
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 3,
      arrows: true,
    };
    return (
      <div className="day-slider my-3">
        <Slider {...settings}>{this.renderCalendar()}</Slider>
      </div>
    );
  }
}
