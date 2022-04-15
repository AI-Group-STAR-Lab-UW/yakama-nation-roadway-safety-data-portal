import React, { Component } from 'react';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import SafetyNet from '../SafetyNet';
import Home from '../Home';
import '../../assets/styles/form.css';
import '../../assets/styles/modal.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home" component={Home} />
            </Switch>
          </BrowserRouter>
          <BrowserRouter>
            <Route path="/applications" component={SafetyNet} />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

Main.propTypes = {};

Main.defaultProps = {};

export default connect(mapStateToProps, null)(Main);
