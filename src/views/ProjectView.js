import React, {PropTypes} from 'react';

import $ from 'jquery'
import Sailing from '../components/Sailing.react.js'
import MainNav from '../components/MainNav.react'

export default class ProjectView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
        <MainNav/>
        <div className="container">
          <Sailing model="projects"/>
        </div>
      </div>);
  }
}

ProjectView.propTypes = {
};
