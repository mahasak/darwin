import React, { Component } from 'react';
import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route,
} from 'found';

import './App.css';
import Main from './Main';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/v1/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async (e:any)=> {
    e.preventDefault();
    const response = await fetch('/api/v1/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    const BrowserRouter = createBrowserRouter({
      routeConfig: makeRouteConfig(
        <Route path="/" Component={Main}>
          <Route path="/about">
            <Main />
          </Route>
          <Route path="/users">
            <Main />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Route>,
      ),
    
      renderError: ({ error }) => (
        <div>{error.status === 404 ? 'Not found' : 'Error'}</div>
      ),
    });
    return (<BrowserRouter/>
    );
  }
}

export default App;
