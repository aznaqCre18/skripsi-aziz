import PresensiSiswa from "./component";
import * as actions from './action';
import * as actionsSiswa from './../DataSiswa/action';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const { dataPertemuan, dataAbsensi } = state.PertemuanJadwalRed;
    const { dataSiswa } = state.SiswaRed;
    return {
        dataPertemuan,
        dataSiswa,
        dataAbsensi
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsSiswa: bindActionCreators(actionsSiswa, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(PresensiSiswa);
export default Connected;