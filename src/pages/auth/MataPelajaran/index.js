import MataPelajaran from "./component";
import * as actions from './action';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
    const { dataMapel } = state.MapelRed
    return {
        dataMapel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(MataPelajaran)
export default Connected;