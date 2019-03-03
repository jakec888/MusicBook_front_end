import React, { Component } from "react";
import YouTube from "react-youtube";

import "./App.css";

const data = [
   {
      id: 1,
      song_name: "Sad Song 1",
      artist: "Jake's Band",
      videoId: "Mp8kFqycfFM",
      contributor: "Chris C",
      likes: 8,
      dislikes: 2
   },
   {
      id: 2,
      song_name: "Sad Song 2",
      artist: "Jake's Band",
      videoId: "T2X1Xd9jl_o",
      contributor: "Chris C",
      likes: 24,
      dislikes: 3
   },
   {
      id: 3,
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

   deleteData = event => {
      // API HERE (DELETE)
      console.log("Deletings");
      this.setState({
         data: this.state.data.filter(item => item.id !== Number(event.target.id))
      });
   };

   _onReady = event => {
      event.target.pauseVideo();
   };

   render() {
      const opts = {
         width: "560",
         height: "315",
         playerVars: {
            autoplay: 0,
            rel: 0
         }
      };

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
            {this.state.data.map(music => {
               return (
                  <div className="music-container" key={music.id}>
                     <p>{music.id}</p>
                     <p>Song Name: {music.song_name}</p>
                     <p>Artist: {music.artist}</p>
                     <YouTube
                        videoId={music.videoId}
                        onReady={this._onReady}
                        opts={opts}
                     />
                     <p>Contributor: {music.contributor}</p>
                     <p>Likes: {music.likes}</p>
                     <p>Dislikes: {music.dislikes}</p>
                     <button id={music.id} onClick={this.editData}>
                        Edit
                     </button>
                     <button id={music.id} onClick={this.deleteData}>
                        Delete
                     </button>
                  </div>
               );
            })}
         </div>
      );
   }
}

export default App;
