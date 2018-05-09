import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import FriendsDisplay from './components/FriendsDisplay';
import NewFriend from './components/NewFriend';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends : []
    }
  }

  componentDidMount = () => {

    this.fetchData()
}
fetchData = () => {
    axios.get(`http://localhost:5000/api/friends/`)
    .then(res => {
        let frData = res.data;
        console.log('response.data of updateFriends, cdm: ', res.data)
        this.setState({ friends: frData })
    });
}
  render() {
    console.log('this is the state:', this.state.friends)
    return (
      <div className="App">
 
        <div>
          {/* {<NewFriend />} */}
          <NewFriend fetchData={() => this.fetchData()} />
          <h1>Friends </h1>
        {  this.state.friends.map((friend,i) => {return (<div key={friend + i} > < FriendsDisplay friend={friend} fetchData={() => this.fetchData()} /> {console.log('this is each friend: ' , friend)}</div> ) } ) }
        </div>
      </div>
    );
  }
}

export default App;
