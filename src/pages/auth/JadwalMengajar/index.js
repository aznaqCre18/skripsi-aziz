import JadwalMengajar from "./component";
import * as actions from './action';
import * as actionsGuru from './../DataGuru/action';
import * as actionsMapel from './../MataPelajaran/action';
import * as actionsKelas from './../Kelas/action';
import * as actionsWaktuMengajar from './../WaktuMengajar/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
    const { dataGuru } = state.GuruRed;
    const { dataMapel } = state.MapelRed;
    const { dataKelas } = state.KelasRed;
    const { dataJadwalMapel } = state.JadwalMapelRed;
    const { dataWaktuMengajar } = state.WaktuMengajarRed;

    return {
        dataGuru,
        dataMapel,
        dataKelas,
        dataJadwalMapel,
        dataWaktuMengajar,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsGuru: bindActionCreators(actionsGuru, dispatch),
        actionsMapel: bindActionCreators(actionsMapel, dispatch),
        actionsKelas: bindActionCreators(actionsKelas, dispatch),
        actionsWaktuMengajar: bindActionCreators(actionsWaktuMengajar, dispatch),
    }
};


const Connected = connect(mapStateToProps, mapDispatchToProps)(JadwalMengajar);
export default Connected;