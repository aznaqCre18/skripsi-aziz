import KelolaUser from './component'; 
import * as actions from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    const { dataUsers, dataUserEdit } = state.UsersRed;
    return {
        dataUsers,
        dataUserEdit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(KelolaUser);
export default Connected;