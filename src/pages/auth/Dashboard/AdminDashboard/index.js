import AdminDashboard from './component';
import * as actionsGuru from './../../Skripsi/KelolaGuru/action';
import * as actionsHonor from './../../Skripsi/KelolaHonor/action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  const { dataGuru } = state.GuruSkripsiRed;
  const { dataHonor } = state.HonorRed;
  return {
    dataGuru,
    dataHonor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionsGuru: bindActionCreators(actionsGuru, dispatch),
    actionsHonor: bindActionCreators(actionsHonor, dispatch),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
export default Connected;