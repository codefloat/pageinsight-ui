import React, {Component} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import $ from 'jquery'

import MainNav from '../components/MainNav.react'
import Login from '../components/Login.react'
import ProjectSelector from '../components/ProjectSelector.react'
import config from '../app.config'

import Swal from 'sweetalert'

class HomeView extends Component{
    constructor(props){
        super(props)

        this.state ={
          show_new_pages_form: false,
          pages: []
        }
    }

    componentDidMount(){

    }

    onProjectSelection(selected){
      this.loadProject(selected.value)
      this.setState({selectedProject: selected})
    }

    loadProject(id){
      $.ajax({
        method: 'GET',
        url: config.api.main.host + '/projects/'+id+'/pages/',
        success: ((response)=>{
          this.setState({pages: response})
        }),
        error: ((reason)=>{
          console.error('ERROR MEMUAT PAGES', reason);
        })
      })
    }

    saveNewPage(){
      let page_username = this.refs.new_pages.value;
      FB.api(page_username,{
        fields: 'name, id, fan_count, username'
      }, (page)=>{
          page.page_id = page.id
          delete page.id;
        $.ajax({
          method: 'POST',
          url: config.api.main.host + '/pages/',
          data: _.merge(page, {project: this.state.selectedProject.value}),
          success: ((response)=>{
            this.loadProject(this.state.selectedProject.value)
            this.refs.new_pages.value =''
          }),
          error: ((reason)=>{
            Swal({
              title: 'Error',
              text: 'Cannot add new page',
              type: 'error'
            })
          })
        })
      })
    }

    confirmDeletePage(page){
      Swal({
        title: 'Are you sure?',
        text: 'You\'re gonna delete page ' + page.name,
        showCancelButton: true,
        confirmButtonColor: 'red',
        closeOnConfirm:false,
      }, ()=>{
        $.ajax({
          method: 'DELETE',
          url: config.api.main.host + '/pages/' + page.id,
          success: ((response)=>{
            Swal({
              title: 'Success',
              text: 'Page has been successfully deleted',
              type: 'success'
            }, ()=>{
              this.loadProject(this.state.selectedProject.value)
            })
          }),
          error: ((reason)=>{
            Swal({
              title: 'Error',
              text: 'Failed at attempt to delete page '+page.name,
              type: 'error'
            }, ()=>{
              this.loadProject(this.state.selectedProject.value)
            })
          })
        })
      })
    }

    render(){
        return <div>
            <MainNav/>
            <div className="container">
                <Login/>
                <div id="logged-in" className="col-md-8 col-md-push-2" style={this.props.user.hasOwnProperty('name') ? {display: 'block'} : {display: 'none'}}>
                  <ProjectSelector onProjectSelection={this.onProjectSelection.bind(this)}/>
                  <br/>
                  <button onClick={()=>{this.setState({show_new_pages_form: !this.state.show_new_pages_form})}} className="btn btn-xs btn-primary">
                    {this.state.show_new_pages_form ? 'hide form' : 'add new pages'}
                  </button>
                  <br/>
                  <br/>

                  <div style={this.state.show_new_pages_form ? {} : {display: 'none'}}>
                  <textarea className="form-control" ref="new_pages" placeholder="insert new pages here">

                  </textarea>
                  <br/>
                  <button onClick={this.saveNewPage.bind(this)} className="btn btn-block btn-sm btn-primary">Save</button>
                  </div>
                </div>
            </div>

            <div className="container" style={this.props.user.hasOwnProperty('user') ? {display: 'none'} : {}}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th> No </th>
                  <th> Page Name</th>
                  <th> Fans</th>
                  <th> Status</th>
                  <th> Photos </th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
              {this.state.pages.map((page, index)=>{
                return <tr key={index}>
                  <td> {index + 1}</td>
                  <td>{page.name}</td>
                  <td>{page.fan_count}</td>
                  <td>
                  <button style={{marginLeft: '5px'}} className="btn btn-xs btn-default">not started</button>
                  <button style={{marginLeft: '5px'}} className="btn btn-xs btn-warning">on progress</button>
                  <button style={{marginLeft: '5px'}} className="btn btn-xs btn-success">finshed</button>
                  </td>
                  <td>
                    {page.photos_collected_count} collected
                  </td>
                  <td>
                  <button className="btn btn-xs btn-success">result</button>
                  <button onClick={this.confirmDeletePage.bind(this, page)} style={{marginLeft: '5px'}} className="btn btn-xs btn-danger">delete</button>

                  </td>
                </tr>
              })}
              </tbody>
              </table>
            </div>
        </div>
    }
}

HomeView.propTypes = {

}

HomeView.defaultProps = {
    currentUser : {}
}

HomeView.state = {

}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HomeView)
