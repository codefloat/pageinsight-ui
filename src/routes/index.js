import React, {Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import CalculatorLayout from '../layouts/Calculator'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'
import ProjectView from '../views/ProjectView'


export default (
    <Route path="/" component={CalculatorLayout}>
        <IndexRoute component={HomeView} />
        <Route path="/about" component={AboutView} />
        <Route path="/projects" components={ProjectView}/>
    </Route>
)
