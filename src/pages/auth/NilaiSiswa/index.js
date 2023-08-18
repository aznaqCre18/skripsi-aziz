import NilaiSiswa from "./component";
import * as actionsSiswa from './../DataSiswa/action';
import * as actionsKelas from './../Kelas/action';
import * as actionsPelajaran from './../MataPelajaran/action';
import * as actionsNilai from './../PageFormPenilaian/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataSiswa } = state.SiswaRed;
  const { dataKelas } = state.KelasRed;
  const { dataMapel } = state.MapelRed;
  const { dataNilai, dataNilaiAdmin, dataNilaiSiswa } = state.FormPenilaianRed;

  return {
    dataSiswa,
    dataKelas,
    dataMapel,
    dataNilai,
    dataNilaiAdmin,
    dataNilaiSiswa
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionsSiswa: bindActionCreators(actionsSiswa, dispatch),
    actionsKelas: bindActionCreators(actionsKelas, dispatch),
    actionsPelajaran: bindActionCreators(actionsPelajaran, dispatch),
    actionsNilai: bindActionCreators(actionsNilai, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(NilaiSiswa);
export default Connected;