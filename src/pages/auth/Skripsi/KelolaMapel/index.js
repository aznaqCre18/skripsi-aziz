import KelolaMapel from './component'; 
import * as actions from './action';
import * as actionsHonor from './../KelolaHonor/action';
import * as actionsGuru from './../KelolaGuru/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    const { dataMapel } = state.MapelSkripsiRed;
    const { dataHonor } = state.HonorRed;
    const { dataGuru } = state.GuruSkripsiRed;
    return {
        dataMapel,
        dataHonor,
        dataGuru,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsHonor: bindActionCreators(actionsHonor, dispatch),
        actionsGuru: bindActionCreators(actionsGuru, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(KelolaMapel);
export default Connected;