import JadwalPresensi from "./component";
import * as actions from './action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
    const { dataMengajar } = state.JadwalPresensiRed;
    return {
        dataMengajar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(JadwalPresensi);
export default Connected;