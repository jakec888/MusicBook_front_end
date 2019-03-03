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
         data: [],
         editting: false,
         song_name: "",
         artist: "",
         videoId: "",
         contributor: "",
         likes: 0,
         dislikes: 0
      };
   }

   componentDidMount() {
      // API HERE (GET)
      this.setState({
         data: data
      });
   }

   handleChange = event => {
      this.setState({ [event.target.id]: event.target.value });
   };

   handleSubmit = event => {
      event.preventDefault();
      if (this.state.editting) {
         this.editData();
         this.clearForm();
      } else {
         this.addData();
         this.clearForm();
      }
   };

   clearForm = () => {
      this.setState({
         song_name: "",
         artist: "",
         videoId: "",
         contributor: ""
      });
   };

   addData = () => {
      // API HERE (POST)
      const newData = {
         song_name: this.state.song_name,
         artist: this.state.artist,
         videoId: this.state.videoId,
         contributor: this.state.contributor,
         likes: 0,
         dislikes: 0
      };
      const updateData = [newData, ...this.state.data];
      this.setState({
         data: updateData
      });
   };

   editData = () => {
      // API HERE (PUT)
      console.log("Editing");
      this.setState({
         editting: true
      });
   };

   deleteData = stuff => {
      // API HERE (PUT)
      console.log("Deletings");
      console.log(stuff);
   };

   render() {
      return (
         <div className="main">
            <h1>Music Book</h1>
            <p>
               Just like <strong>FaceBook</strong> but without all the{" "}
               <strong>depression</strong>
            </p>
            {this.state.editting ? (
               <p>Edditing</p>
            ) : (
               <div className="form">
                  <form onSubmit={this.handleSubmit}>
                     <input
                        type="text"
                        id="song_name"
                        value={this.state.song_name}
                        onChange={this.handleChange}
                        placeholder="Song Name"
                     />
                     <input
                        type="text"
                        id="artist"
                        value={this.state.artist}
                        onChange={this.handleChange}
                        placeholder="Artist"
                     />
                     <input
                        type="text"
                        id="videoId"
                        value={this.state.videoId}
                        onChange={this.handleChange}
                        placeholder="Video ID"
                     />
                     <input
                        type="text"
                        id="contributor"
                        value={this.state.contributor}
                        onChange={this.handleChange}
                        placeholder="Contributor"
                     />
                     <button type="submit" className="submit-button">
                        Add Song
                     </button>
                  </form>
               </div>
            )}
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
                     editData={this.editData}
                     deleteData={this.deleteData}
                  />
               );
            })}
         </div>
      );
   }
}

export default App;
