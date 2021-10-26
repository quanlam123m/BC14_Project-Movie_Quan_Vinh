import React from "react";
import MultipleRows from "../_component/Slick-react/MultipleRowsSlick";
import { Link } from "react-router-dom";

export default function ListMoviePage(props) {
  return (
    <div className="list__Film">
      <section className="text-gray-600 body-font">
        <div
          className="container py-24 mx-auto"
          style={{ textAlign: "center" }}
        >
          <MultipleRows />
          <Link
          to="/all-movie"
            className="btn btn-danger my-4"
            style={{ width: "100px", height: "35px" }}
          >
            View all
          </Link>
        </div>
      </section>
    </div>
  );
}
