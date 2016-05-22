import React, {PropTypes} from 'react';

import { login } from '../redux/actions/auth'
import { connect } from 'react-redux'




class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div style={!this.props.user.hasOwnProperty('name') ? {} : {display: 'none'}}>
      <button onClick={()=>{this.props.dispatch(login())}} className="btn btn-block btn-primary">LOGIN</button>
    </div>);
  }
}

Login.propTypes = {
};

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
