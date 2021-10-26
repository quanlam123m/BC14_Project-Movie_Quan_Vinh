import React, { Component } from "react";
import axios from "axios";
import Movie from "./movie";
import Loader from "../../../components/Loader";
import { actFetchAllMovie } from "./modules/action";
import { connect } from "react-redux";

class AllMoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dangChieu: [],
      sapChieu: [],
    };
  }
  componentDidMount() {
    this.props.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadData();
    }
  }
  renderSapChieu = () => {
    const { sapChieu } = this.state;
    if (sapChieu.length === 0) return <></>;
    return sapChieu?.map((movie) => {
      return <Movie key={movie.maPhim} movie={movie} />;
    });
  };

  renderDangChieu = () => {
    const { dangChieu } = this.state;
    if (dangChieu.length === 0) return <></>;
    return dangChieu?.map((movie) => {
      return <Movie key={movie.maPhim} movie={movie} />;
    });
  };

  loadData = () => {
    const { data, loading } = this.props;
    let dangChieuArr = [];
    let sapChieuArr = [];
    if (loading) return <Loader />;
    data?.map((movie) => {
      if (movie.dangChieu) {
        dangChieuArr.push(movie);
      } else {
        sapChieuArr.push(movie);
      }
    });
    this.setState({
      dangChieu: dangChieuArr,
      sapChieu: sapChieuArr,
    });
  };

  render() {
    return (
      <div className="container">
        <div id="accordion" className="my-4">
          <div className="card">
            <div
              className="card-header"
              id="headingOne"
              style={{ backgroundColor: `rgb(51, 53, 69)` }}
            >
              <div>
                <div
                  className="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  style={{ color: `rgb(248, 68, 100)` }}
                >
                  Phim đang chiếu
                </div>
              </div>
            </div>
            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                <div className="row d-flex flex-row flex-wrap">
                  {this.renderDangChieu()}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header"
              id="headingTwo"
              style={{ backgroundColor: `rgb(51, 53, 69)` }}
            >
              <div>
                <div
                  className="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ color: `rgb(248, 68, 100)` }}
                >
                  Phim sắp chiếu
                </div>
              </div>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div className="card-body">
                <div className="row d-flex justify-content-between">
                  {this.renderSapChieu()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.allMovieReducer.loading,
    data: state.allMovieReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(actFetchAllMovie());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMoviePage);
