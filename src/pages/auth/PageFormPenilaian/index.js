import FormPenilaian from "./component";
import * as actions from './action';
import * as actionsSiswa from './../DataSiswa/action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
    const { dataNilai } = state.FormPenilaianRed;
    const { dataSiswa } = state.SiswaRed;
    return {
        dataSiswa,
        dataNilai,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionsSiswa: bindActionCreators(actionsSiswa, dispatch),
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(FormPenilaian);
export default Connected;