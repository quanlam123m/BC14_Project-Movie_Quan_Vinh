import React, { Component } from "react";
import Carousel from "./_components/carousel";
import Schedule from "./_components/schedule";
import "./style.css";
import { connect } from "react-redux";
import { actFetchDetailMovie } from "./modules/actions";
import Loader from "./../../../components/Loader";

class DetailMoviePage extends Component {
  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const { id } = this.props.match.params;
    await this.props.fetchDataPhim(id);
  };

  render() {
    const { loading, dataTongHop, dataCumRap } = this.props;
    if (loading) return <Loader />;

    return (
      <div>
        <Carousel dataPhim={dataTongHop} />
        <Schedule dataTongHop={dataTongHop} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.detailMovieReducer.loading,
    error: state.detailMovieReducer.error,
    dataTongHop: state.detailMovieReducer.dataTongHop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataPhim: (id) => {
      dispatch(actFetchDetailMovie(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMoviePage);
