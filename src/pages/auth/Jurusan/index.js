import Jurusan from "./component";
import * as actions from './action';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
    const { dataJurusan } = state.JurusanRed
    return {
        dataJurusan
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(Jurusan)
export default Connected;