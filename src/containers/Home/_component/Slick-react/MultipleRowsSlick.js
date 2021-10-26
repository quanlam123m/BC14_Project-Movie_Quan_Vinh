import React from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowsSlick.module.css";
import Movie from "./../../ListMoviePage/movies";
import Loader from "./../../../../components/Loader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListMovie } from "./../../ListMoviePage/modules/actions";

import { Tabs } from "antd";
import { VideoCameraAddOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

const settings = {
  className: "cover  ",
  centerMode: false,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  rows: 1,
  slidesPerRow: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  margin: 0,
  autoplay: true,
  autoplaySpeed: 5000,
  draggable: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function MultipleRows() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listMovieReducer.data);
  const loading = useSelector((state) => state.listMovieReducer.loading);

  useEffect(() => {
    dispatch(actFetchListMovie());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderMovieNow() {
    if (loading) return <Loader />;
    return data?.map((movie, index) => {
      if (movie.dangChieu === true) {
        return (
          <div className={`${styleSlick["width-item"]}`} key={index}>
            <Movie movie={movie} />
          </div>
        );
      }
    });
  }
  function renderMovieComing() {
    return data?.map((movie, index) => {
      if (movie.sapChieu === true) {
        return (
          <div className={`${styleSlick["width-item"]}`} key={index}>
            <Movie movie={movie} />
          </div>
        );
      }
    });
  }

  return (
    <div>
      <div id="list__Film">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <VideoCameraAddOutlined />
                Phim đang chiêu
              </span>
            }
            key="1"
          >
            <div>
              {" "}
              <Slider {...settings}>{renderMovieNow()}</Slider>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <VideoCameraOutlined />
                Phim sắp chiếu
              </span>
            }
            key="2"
          >
            <Slider {...settings}>{renderMovieComing()}</Slider>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
