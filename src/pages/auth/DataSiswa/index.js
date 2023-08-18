import DataSiswa from "./component";
import * as actions from './action';
import * as actionsJurusan from './../Jurusan/action';
import * as actionsKelas from './../Kelas/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataSiswa } = state.SiswaRed;
  const { dataJurusan } = state.JurusanRed;
  const { dataKelas } = state.KelasRed;
  return {
    dataSiswa,
    dataKelas,
    dataJurusan,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    actionsJurusan: bindActionCreators(actionsJurusan, dispatch),
    actionsKelas: bindActionCreators(actionsKelas, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(DataSiswa);
export default Connected;