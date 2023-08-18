import KelolaGuru from './component'; 
import * as actions from './action';
import * as actionsJabatan from './../KelolaJabatan/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    const { dataGuru } = state.GuruSkripsiRed;
    const { dataJabatan } = state.JabatanRed;
    return {
        dataGuru,
        dataJabatan
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsJabatan: bindActionCreators(actionsJabatan, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(KelolaGuru);
export default Connected;