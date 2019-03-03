import React, { Component } from "react";
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
            <button onClick={this.showData} className="myButton">
               Click Me
            </button>
         </div>
      );
   }
}

export default App;
