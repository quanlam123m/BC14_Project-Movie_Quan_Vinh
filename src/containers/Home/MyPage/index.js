import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../../components/Loader";
import "./style.css";
import History from "./_components/history";
import UserInfo from "./_components/userInfo";
import { actFetchUserInfo } from "./modules/actions";

class MyPage extends Component {
  componentDidMount() {
    this.props.fetchUserInfo();
  }

  renderHistory = () => {
    const { dataHistory } = this.props;
    return dataHistory?.thongTinDatVe?.map((item) => {
      return <History key={item.maVe} thongTinDatVe={item} />;
    });
  };

  render() {
    if (localStorage.getItem("User")) {
      if (this.props.loadingHistory) return <Loader />;
      return (
        <div
          className="container-fluid mypage"
          style={{
            backgroundImage: "url(/asset/img/mypage-bg.png)",
            backgroundColor: "transparent",
          }}
        >
          <div>
            <div className="my-5">
              <div className="vertical-tab" role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation">
                    <div
                      className="tabBtn active"
                      href="#Section1"
                      aria-controls="home"
                      role="tab"
                      data-toggle="tab"
                    >
                      Thông tin tài khoản
                    </div>
                  </li>
                  <li role="presentation">
                    <div
                      className="tabBtn"
                      href="#Section2"
                      aria-controls="profile"
                      role="tab"
                      data-toggle="tab"
                    >
                      Lịch sử đặt vé
                    </div>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content tabs">
                  <div
                    role="tabpanel"
                    className="tab-pane fade in active show"
                    id="Section1"
                  >
                    <h5>Thông tin tài khoản</h5>
                    <UserInfo userInfo={this.props.dataHistory} />
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="Section2">
                    <h5>Lịch sử đặt vé</h5>
                    {this.renderHistory()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //redirect ve /auth
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = (state) => {
  return {
    loadingHistory: state.userHistoryReducer.loadingHistory,
    errorHistory: state.userHistoryReducer.errorHistory,
    dataHistory: state.userHistoryReducer.dataHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => {
      dispatch(actFetchUserInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
