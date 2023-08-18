import WaktuMengajar from "./component";
import * as actions from './action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataWaktuMengajar } = state.WaktuMengajarRed;

  return {
    dataWaktuMengajar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(WaktuMengajar);
export default Connected;