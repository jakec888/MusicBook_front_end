import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const data = [
   {
      song_name: "Sad Song 1",
      artist: "Jake's Band",
      video_url: "https://www.youtube.com/watch?v=66C4YIiwRbM",
      contributor: "Chris C",
      likes: 8,
      dislikes: 2
   },
   {
      song_name: "Sad Song 2",
      artist: "Jake's Band",
      video_url: "https://www.youtube.com/watch?v=66C4YIiwRbM",
      contributor: "Chris C",
      likes: 24,
      dislikes: 3
   },
   {
      song_name: "Sad Song 3",
      artist: "Jake's Band",
      video_url: "https://www.youtube.com/watch?v=66C4YIiwRbM",
      contributor: "Chris C",
      likes: 25,
      dislikes: 50
   }
];

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: data
      };
   }

   showData = () => {
      console.log(this.state.data);
   };

   render() {
      return (
         <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <p>
                  Edit <code>src/App.js</code> and save to reload.
               </p>
               <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Learn React
               </a>
               <button onClick={this.showData}>Click Me</button>
            </header>
         </div>
      );
   }
}

export default App;
