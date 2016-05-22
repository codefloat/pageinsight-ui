import React, {PropTypes} from 'react';
import $ from 'jquery'
import _ from 'lodash'
import Swal from 'sweetalert'

import config from '../app.config'

import 'sweetalert/dist/sweetalert.css'

export default class Sailing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      mode: 'listing'
    }
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    $.ajax({
      method: 'GET',
      url: config.api.main.host +'/'+this.props.model,
      success: ((response)=>{
        this.setState({models: response})
      }),
      error: ((reason)=>{
        console.error("GAGAL MEMUAT "+this.props.model.toUpperCase(), reason);
      })
    })
  }

  save(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: config.api.main.host + '/' + this.props.model,
      data: {
        name: this.refs.name.value
      },
      success: ((response)=>{
        this.setState({mode: 'listing'}, ()=>{
          this.loadData();
        })
      }),
      error: ((reason)=>{
        Swal({
          title: 'Kesalahan',
          text: 'Gagal membuat project baru',
          type: 'error'
        })
      })
    })
  }

  confirmDelete(id){
    Swal({
      title: 'Are you sure?',
      text: 'You\'re gonna delete '+this.props.model + ' with id of '+id+'?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'red',
      closeOnConfirm: false,
    }, ()=>{
      $.ajax({
        method: 'DELETE',
        url: config.api.main.host + '/'+this.props.model + '/' + id,
        success: ((response)=>{
          Swal({
            title: 'Deleted!',
            text: 'Successfully delete',
            type: 'success',
            confirmButtonColor: 'red'
          }, ()=>{
            this.loadData()
          })
        }),
        error: ((reason)=>{
          Swal({
            title: 'Failed!',
            text: 'Attempt to delete has failed',
            type: 'error',
            confirmButtonColor: 'red'
          }, ()=>{
            this.loadData()
          })
        })
      })
    })
  }

  formView(){
    return <div>
      <form className="form">
        <input type="text" ref="name" className="form-control" placeholder="Title of the project" />
        <br/>
        <button className="btn btn-small btn-primary" onClick={this.save.bind(this)}>save </button>
      </form>
    </div>
  }

  listView(){
    let { models }  = this.state
    return <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
      {models.map((item, index)=>{
        return <tr key={index}>
          <td>{item.name}</td>
          <td>
            <button onClick={this.confirmDelete.bind(this, item.id)} className="btn btn-xs btn-danger">delete</button>
          </td>
        </tr>
      })}
      </tbody>
    </table>
  }

  render() {
    let { mode } = this.state
    return (<div>
      <button style={mode == 'adding' ? {display: 'none'} : {}} onClick={()=>{this.setState({mode: 'adding'})}} className="btn btn-xs btn-primary">Add new </button>
      <br/><br/>
      {mode == 'listing' ? this.listView() : this.formView()}
    </div>);
  }
}

Sailing.propTypes = {
  model: React.PropTypes.string.isRequired
};
