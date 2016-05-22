import React, {PropTypes} from 'react';
import Select, { Async } from 'react-select'
import $ from 'jquery'

import 'react-select/dist/react-select.css'


import config from '../app.config'

export default class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: {}
    }
  }

  loadProjects(keywords, callback){
    $.ajax({
      method: 'GET',
      url: config.api.main.host + '/projects',
      success: ((res)=>{
        callback(null, {
          options: res.map((item)=>{
            return {label: item.name, value: item.id}
          })
        })
      })
    })
  }

  onProjectSelection(selected){
    this.setState({selectedProject: selected})
    this.props.onProjectSelection(selected)
  }

  render() {
    return (<div>
          <Async
            loadOptions={this.loadProjects.bind(this)}
            onChange={this.onProjectSelection.bind(this)}
            value={this.state.selectedProject}
          />
      </div>);
  }
}

ProjectSelector.propTypes = {
};
