import TahunAjaran from "./component";
import * as actions from './action';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  const { dataTahunAjaran } = state.TahunAjaranRed;
  return {
    dataTahunAjaran
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  } 
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(TahunAjaran);
export default Connected;