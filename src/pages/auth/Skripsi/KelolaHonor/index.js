import KelolaHonor from './component'; 
import * as actions from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    const { dataHonor } = state.HonorRed;
    return {
        dataHonor,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(KelolaHonor);
export default Connected;