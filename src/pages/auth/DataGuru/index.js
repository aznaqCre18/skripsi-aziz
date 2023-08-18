import DataGuru from "./component";
import * as actions from './action';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        dataGuru: state.GuruRed,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(DataGuru);
export default Connected;