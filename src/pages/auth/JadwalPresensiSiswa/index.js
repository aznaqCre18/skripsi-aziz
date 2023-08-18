import JadwalPresensiSiswa from "./component";
import * as actionsJadwal from './../JadwalMengajar/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataJadwalMapel, dataJadwalSiswa, dataAbsensiSiswa } = state.JadwalMapelRed;

  return {
    dataJadwalMapel,
    dataJadwalSiswa,
    dataAbsensiSiswa,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionsJadwal: bindActionCreators(actionsJadwal, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(JadwalPresensiSiswa);
export default Connected;