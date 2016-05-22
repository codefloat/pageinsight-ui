import React, {PropTypes} from 'react';
import _ from 'lodash'


import { Link } from 'react-router'
import { connect } from 'react-redux'


class MainNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div className="container" style={{paddingTop: '20px'}}>
        <Link to="/">
          <button className="btn btn-primary btn-xs"> Home </button>
        </Link>

        <Link to="projects" style={{marginLeft: '5px'}}>
          <button className="btn btn-primary btn-xs"> Projects </button>
        </Link>

        <button className="btn btn-xs btn-info" style={!this.props.user.hasOwnProperty('name') ? {display:'none'} : {display: 'block', float: 'right'}}>
          {this.props.user.name}
        </button>
      </div>
      <hr/>
      </div>);
  }
}

MainNav.propTypes = {
};
function mapStateToProps(state){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(MainNav)
