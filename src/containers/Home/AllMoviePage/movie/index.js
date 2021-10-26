import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="card my-3 ml-5" style={{ width: "18rem", height:"28rem", border:"1px solid #cccccc"}}>
        <img
        style={{ height: "75%", objectFit: "cover", objectPosition: "left top" }}
          src={movie.hinhAnh}
          className="card-img-top"
          alt={movie.tenPhim}
        />
        <div className="card-body ">
          <h5 className="card-title movieTitle" style={{color:`rgb(31, 37, 51)`}}>{movie.tenPhim}</h5>
          <Link className="btn btn-danger" to={`/detail-movie/${movie.maPhim}`}>
            Chi tiết
          </Link>
        </div>
      </div>
    );
  }
}
