import Login from './component';
import * as actions from './action';
import * as actionsTahunAjaran from './../auth/TahunAjaran/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { dataTahunAjaran } = state.TahunAjaranRed;

  return {
    dataTahunAjaran,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    actionsTahunAjaran: bindActionCreators(actionsTahunAjaran, dispatch)
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Connected;