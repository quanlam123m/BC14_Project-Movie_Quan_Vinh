import React, { Component } from "react";
import InfoMovie from "./infomovie";
import ReactPlayer from "react-player";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    const { dataPhim } = this.props;
    return (
      <div className="carousel">
        <div className="container">
          <div className="row  d-flex .flex-column carousel-wrapper">
            <div
              className="carousel-bg"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(43, 43, 44, 0.4), rgba(20, 9, 1, 0.4)), url(${dataPhim?.hinhAnh})`,
              }}
            ></div>
            <div className="img-wrapper ">
              <div className="detail-poster">
                <img
                  className="img-fluid"
                  src={dataPhim?.hinhAnh}
                  alt={dataPhim?.tenPhim}
                  style={{ objectPosition: "left top", height: "100%" }}
                />
                <a
                  type="button"
                  data-toggle="modal"
                  data-src={dataPhim?.trailer}
                  data-target="#myModal"
                  onClick={this.openModal}
                >
                  <img
                    className="playBtn"
                    s
                    src="/asset/img/play-video.png"
                    alt="play-video"
                  />
                </a>

                <div
                  className="modal fade"
                  id="myModal"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          style={{ position: "absolute", top: "0", right: "0" }}
                          onClick={() => this.setState({ isOpen: false })}
                        >
                          <span aria-hidden="true">×</span>
                        </button>

                        <div className="embed-responsive embed-responsive-16by9">
                          <ReactPlayer
                            url={dataPhim?.trailer}
                            playing={this.state.isOpen}
                            controls="true"
                            width="100%"
                            height="100%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-wrapper-overlay "></div>
            </div>
            <div className="info-movie">
              <div className="content my-4 ml-3">
                <InfoMovie dataPhim={dataPhim} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
