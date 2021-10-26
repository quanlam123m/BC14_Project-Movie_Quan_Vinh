import React, { Component } from "react";
import HomeCarousel from "../_component/Carousel";
import ListMoviePage from "../ListMoviePage";
import { connect } from "react-redux";
import { actFetchHeThongRap, actFetchCumRap } from "./modules/actions";
import Loader from "./../../../components/Loader";
import Tab from "./_components/tab";
import { ConfigProvider } from "antd";
import "./style.css";

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchHeThongRap();
  }

  render() {
    const { loading, dataHTRap } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="ani">
        <HomeCarousel />
        <ListMoviePage />
        <Tab dataHTRap={dataHTRap}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.thongTinRapReducer.loadingHTRap,
    error: state.thongTinRapReducer.errorHTRap,
    dataHTRap: state.thongTinRapReducer.dataHTRap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHeThongRap: () => {
      dispatch(actFetchHeThongRap());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
