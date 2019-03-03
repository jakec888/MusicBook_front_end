import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <h1>MusicBook... Facebook's 2nd cousin!</h1>
    )
  }
}
// class Form extends Component {
//   contructor(props) {
//      super(props)
//      this.state = {
//
//      }
//   }
// }


class App extends Component {
  fetchSongs = () => {
    fetch('http://localhost:3000/songs')
      .then(data => data.json())
      .then(music => {
        console.log(music)
      })
      .catch(err => console.log(err))
  }


   render() {
     this.fetchSongs()
      return (
         <div>
            <Header />
         </div>
      )
   }
}
export default App;
