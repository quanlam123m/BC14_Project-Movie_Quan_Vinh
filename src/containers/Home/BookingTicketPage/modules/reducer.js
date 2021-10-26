import * as ActionType from "./constants";

const initState = {
  dsGheDangDat: [],
  loading: false,
  errror: null,
  danhSachGhe: null,
  thongTinPhim: null,
  dataGhe: [],
};

const bookingTicketReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.SELECT_GHE: {
      let dsGheDangDat = [...state.dsGheDangDat];
      let index = dsGheDangDat.findIndex(
        (item) => item.ghe.maGhe === action.payload.ghe.maGhe
      );
      if (index != -1) {
        // ghế đang được chọn
        dsGheDangDat.splice(index, 1);
      } else {
        // ghế chưa chọn

        dsGheDangDat.push(action.payload);
      }
      state.dsGheDangDat = dsGheDangDat;
      return { ...state };
    }

    case ActionType.DELETE_GHE: {
      let dsGheDangDat = [...state.dsGheDangDat];
      let index = dsGheDangDat.findIndex((item) => item.ghe.maGhe === action.payload);
      if (index != -1) {
        // ghế đang được chọn
        dsGheDangDat.splice(index, 1);
      }
      state.dsGheDangDat = dsGheDangDat;
      return { ...state };
    }

    case ActionType.CLEAR_GHE_DANG_CHON: {
      state.dsGheDangDat = [];
      return { ...state };
    }
    case ActionType.PHONGVE_INFO_REQUEST: {
      state.loading = true;
      state.danhSachGhe = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.PHONGVE_INFO_SUCCESS: {
      state.loading = false;
      state.danhSachGhe = action.payload.danhSachGhe;
      state.thongTinPhim = action.payload.thongTinPhim;
      state.error = null;
      return { ...state };
    }

    case ActionType.PHONGVE_INFO_FAILED: {
      state.loading = false;
      state.danhSachGhe = null;
      state.error = action.payload;
      return { ...state };
    }

    case ActionType.SET_DATA_GHE: {
      state.dataGhe = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default bookingTicketReducer;
