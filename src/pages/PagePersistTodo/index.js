import PagePersist from "./component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";

function mapStateToProps(state) {
  const { todo } = state.TodoListRed;

  return {
    todo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(PagePersist);
export default Connected;