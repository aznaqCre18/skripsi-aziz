import AbsenSiswaAdmin from "./component";
import * as actionsSiswa from './../DataSiswa/action';
import * as actionsKelas from './../Kelas/action';
import * as actionsPelajaran from './../MataPelajaran/action';
import * as actionsNilai from './../PageFormPenilaian/action';
import * as actionsAbsen from './../PresensiSiswa/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataSiswa } = state.SiswaRed;
  const { dataKelas } = state.KelasRed;
  const { dataMapel } = state.MapelRed;
  const { dataAbsensiAll, dataPertemuanIdMapel } = state.PertemuanJadwalRed;
  const { dataNilai, dataNilaiAdmin } = state.FormPenilaianRed;

  return {
    dataSiswa,
    dataKelas,
    dataMapel,
    dataNilai,
    dataNilaiAdmin,
    dataAbsensiAll,
    dataPertemuanIdMapel,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionsSiswa: bindActionCreators(actionsSiswa, dispatch),
    actionsKelas: bindActionCreators(actionsKelas, dispatch),
    actionsPelajaran: bindActionCreators(actionsPelajaran, dispatch),
    actionsNilai: bindActionCreators(actionsNilai, dispatch),
    actionsAbsen: bindActionCreators(actionsAbsen, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(AbsenSiswaAdmin);
export default Connected;