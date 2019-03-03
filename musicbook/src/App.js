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
         id: "",
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
      // data should be replace with a list of objects!
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
         this.handleEditData();
         this.clearForm();
      } else {
         this.addData();
         this.clearForm();
      }
   };

   clearForm = () => {
      this.setState({
         editting: false,
         id: "",
         song_name: "",
         artist: "",
         videoId: "",
         contributor: ""
      });
   };

   addData = () => {
      // API HERE (POST)

      // Be SURE to change ID with the ID Postgres Creates!!!!!!
      const newData = {
         // CHANGE HERE!!
         id: Math.floor(Math.random() * Math.floor(10000)),
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

   editData = event => {
      let selectedObject = this.state.data.find(function(object) {
         return object.id === Number(event.target.id);
      });

      this.setState({
         editting: true,
         id: selectedObject.id,
         song_name: selectedObject.song_name,
         artist: selectedObject.artist,
         videoId: selectedObject.videoId,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes,
         dislikes: selectedObject.dislikes
      });
   };

   handleEditData = () => {
      // API HERE (PUT)

      const updateMusic = {
         id: this.state.id,
         song_name: this.state.song_name,
         artist: this.state.artist,
         videoId: this.state.videoId,
         contributor: this.state.contributor,
         likes: this.state.likes,
         dislikes: this.state.dislikes
      };

      const update = this.state.data.map(function(item) {
         if (item.id === updateMusic.id) {
            return updateMusic;
         } else {
            return item;
         }
      });

      this.setState({
         data: update
      });
   };

   deleteData = event => {
      // API HERE (DELETE)
      this.setState({
         data: this.state.data.filter(item => item.id !== Number(event.target.id))
      });
   };

   likeData = event => {
      // API HERE (PUT)

      let selectedObject = this.state.data.find(function(object) {
         return object.id === Number(event.target.id);
      });

      const likedMusic = {
         id: selectedObject.id,
         song_name: selectedObject.song_name,
         artist: selectedObject.artist,
         videoId: selectedObject.videoId,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes + 1,
         dislikes: selectedObject.dislikes
      };

      const update = this.state.data.map(function(item) {
         if (item.id === likedMusic.id) {
            return likedMusic;
         } else {
            return item;
         }
      });

      this.setState({
         data: update
      });
   };

   dislikeData = event => {
      // API HERE (PUT)

      let selectedObject = this.state.data.find(function(object) {
         return object.id === Number(event.target.id);
      });

      const dislikeMusic = {
         id: selectedObject.id,
         song_name: selectedObject.song_name,
         artist: selectedObject.artist,
         videoId: selectedObject.videoId,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes,
         dislikes: selectedObject.dislikes + 1
      };

      const update = this.state.data.map(function(item) {
         if (item.id === dislikeMusic.id) {
            return dislikeMusic;
         } else {
            return item;
         }
      });

      this.setState({
         data: update
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
               <div className="form">
                  <h3>Edit Music</h3>
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
                        Update Song
                     </button>
                  </form>
               </div>
            ) : (
               <div className="form">
                  <h3>Submit Music</h3>
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
                     <button id={music.id} onClick={this.likeData}>
                        Like
                     </button>
                     <button id={music.id} onClick={this.dislikeData}>
                        Dislike
                     </button>
                  </div>
               );
            })}
         </div>
      );
   }
}

export default App;
