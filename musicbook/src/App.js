import React, { Component } from "react";
import Music from "./components/Music";

import "./App.css";

const data = [
   {
      song_name: "Sad Song 1",
      artist: "Jake's Band",
      videoId: "Mp8kFqycfFM",
      contributor: "Chris C",
      likes: 8,
      dislikes: 2
   },
   {
      song_name: "Sad Song 2",
      artist: "Jake's Band",
      videoId: "T2X1Xd9jl_o",
      contributor: "Chris C",
      likes: 24,
      dislikes: 3
   },
   {
      song_name: "Sad Song 3",
      artist: "Jake's Band",
      videoId: "SuGuqHeEmnk",
      contributor: "Chris C",
      likes: 25,
      dislikes: 50
   }
];

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: []
      };
   }

   componentDidMount() {
      this.setState({
         data: data
      });
   }

   render() {
      return (
         <div className="main">
            <h1>Music Book</h1>
            <p>
               Just like <strong>FaceBook</strong> but without all the{" "}
               <strong>depression</strong>
            </p>
            {this.state.data.map((music, index) => {
               return (
                  <Music
                     key={index}
                     song_name={music.song_name}
                     artist={music.artist}
                     videoId={music.videoId}
                     contributor={music.contributor}
                     likes={music.likes}
                     dislikes={music.dislikes}
                  />
               );
            })}
         </div>
      );
   }
}

export default App;
