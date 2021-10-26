import { Carousel } from "antd";
import React, { useSelector, useDispatch } from "react-redux";
import Loader from "./../../../../components/Loader";
import { actAddCarousel } from "./modules/actions";
import { useEffect } from "react";
import "./style.css";

const contentStyle = {
  height: "470px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: `rgb(51, 53, 69)`,
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.addCarouselReducer.loading);
  const data = useSelector((state) => state.addCarouselReducer.data);

  useEffect(() => {
    dispatch(actAddCarousel());
  }, []);

  const renderCarousel = () => {
    return data?.map((item) => {
      return (
        <div key={item.maBanner} className="myCarousel">
          <div className="myBanner"
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          ></div>
        </div>
      );
    });
  };

  if (loading) return <Loader />;

  return (
    <Carousel autoplay autoplaySpeed={10000}>
      {renderCarousel()}
    </Carousel>
  );
}
