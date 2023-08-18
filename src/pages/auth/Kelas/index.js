import Kelas from "./component";
import * as actions from './action';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// action from another component
import * as actionsJurusan from './../Jurusan/action';
import * as actionsGuru from './../DataGuru/action';

const mapStateToProps = (state) => {
    const { dataKelas } = state.KelasRed;
    const { dataJurusan } = state.JurusanRed;
    const { dataGuru } = state.GuruRed;

    return {
        dataKelas,
        dataJurusan,
        dataGuru,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        actionsJurusan: bindActionCreators(actionsJurusan, dispatch),
        actionsGuru: bindActionCreators(actionsGuru, dispatch),
    }
}


const Connected = connect(mapStateToProps, mapDispatchToProps)(Kelas);
export default Connected;