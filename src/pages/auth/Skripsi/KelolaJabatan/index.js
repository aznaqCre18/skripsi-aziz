import KelolaJabatan from './component'; 
import * as actions from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    const { dataJabatan } = state.JabatanRed;
    return {
        dataJabatan,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(KelolaJabatan);
export default Connected;