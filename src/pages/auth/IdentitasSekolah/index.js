import IdentitasSekolah from "./component";
import * as actions from './action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
    const { dataIdentitas } = state.IdentitasSekolahRed;
    return {
        dataIdentitas,
    }
}

const mapDispatchTpProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const Connected = connect(mapStateToProps, mapDispatchTpProps)(IdentitasSekolah);
export default Connected;