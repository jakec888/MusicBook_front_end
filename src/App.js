import React, { Component } from "react";
import YouTube from "react-youtube";
import "./App.css";

const getVideoId = require("get-video-id");

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         editting: false,
         id: "",
         song_name: "",
         artist: "",
         videoid: "",
         contributor: "",
         likes: 0,
         dislikes: 0
      };
      this.handleEditData = this.handleEditData.bind(this);
      this.deleteSong = this.deleteSong.bind(this);
      this.likeData = this.likeData.bind(this);
      this.dislikeData = this.dislikeData.bind(this);
   }

   fetchSongs = () => {
      fetch("https://music-book-api.herokuapp.com/songs")
         .then(response => response.json())
         .then(music => {
            this.setState({
               data: music.sort((a, b) =>
                  a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
               )
            });
         })
         .catch(err => console.log(err));
   };

   componentDidMount() {
      this.fetchSongs();
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
         videoid: "",
         contributor: ""
      });
   };

   addData = () => {
      const newData = {
         song_name: this.state.song_name,
         artist: this.state.artist,
         videoid: getVideoId(this.state.videoid).id,
         contributor: this.state.contributor,
         likes: 0,
         dislikes: 0
      };
      fetch("https://music-book-api.herokuapp.com/songs", {
         body: JSON.stringify(newData),
         method: "POST",
         headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
         }
      })
         .then(createdSong => {
            createdSong.json();
         })
         .then(data => {
            this.fetchSongs();
         })
         .catch(err => console.log(err));
   };

   editData = event => {
      window.scrollTo(0, 0);
      let selectedObject = this.state.data.find(function(object) {
         return object.id === Number(event.target.id);
      });
      this.setState({
         editting: true,
         id: selectedObject.id,
         song_name: selectedObject.song_name,
         artist: selectedObject.artist,
         videoid: selectedObject.videoid,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes,
         dislikes: selectedObject.dislikes
      });
   };

   handleEditData = () => {
      const updateMusic = {
         id: this.state.id,
         song_name: this.state.song_name,
         artist: this.state.artist,
         videoid: getVideoId(this.state.videoid).id,
         contributor: this.state.contributor,
         likes: this.state.likes,
         dislikes: this.state.dislikes
      };
      fetch(`https://music-book-api.herokuapp.com/songs/${this.state.id}`, {
         body: JSON.stringify(updateMusic),
         method: "PUT",
         headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
         }
      })
         .then(updatedSong => {
            updatedSong.json();
         })
         .then(data => {
            this.fetchSongs();
         })
         .catch(err => console.log(err));

      const update = this.state.data.map(function(item) {
         if (item.id === updateMusic.id) {
            return updateMusic;
         } else {
            return item;
         }
      });
      this.setState({
         data: update.sort((a, b) =>
            a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
         )
      });
   };

   deleteSong = event => {
      fetch(`https://music-book-api.herokuapp.com/songs/${event.target.id}`, {
         method: "DELETE"
      })
         .then(data => {
            window.scrollTo(0, 0);
            this.fetchSongs();
         })
         .catch(err => console.log(err));
   };

   likeData = event => {
      let selectedObject = this.state.data.find(function(object) {
         return object.id === Number(event.target.id);
      });

      const likedMusic = {
         id: selectedObject.id,
         song_name: selectedObject.song_name,
         artist: selectedObject.artist,
         videoid: selectedObject.videoid,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes + 1,
         dislikes: selectedObject.dislikes
      };
      fetch(`https://music-book-api.herokuapp.com/songs/${event.target.id}`, {
         method: "PUT",
         body: JSON.stringify(likedMusic),
         headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
         }
      });

      const update = this.state.data.map(function(item) {
         if (item.id === likedMusic.id) {
            return likedMusic;
         } else {
            return item;
         }
      });

      this.setState({
         data: update.sort((a, b) =>
            a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
         )
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
         videoid: selectedObject.videoid,
         contributor: selectedObject.contributor,
         likes: selectedObject.likes,
         dislikes: selectedObject.dislikes + 1
      };

      fetch(`https://music-book-api.herokuapp.com/songs/${event.target.id}`, {
         method: "PUT",
         body: JSON.stringify(dislikeMusic),
         headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
         }
      });

      const update = this.state.data.map(function(item) {
         if (item.id === dislikeMusic.id) {
            return dislikeMusic;
         } else {
            return item;
         }
      });

      this.setState({
         data: update.sort((a, b) =>
            a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
         )
      });
   };

   _onReady = event => {
      event.target.pauseVideo();
   };

   render() {
      const opts = {
         playerVars: {
            autoplay: 0,
            rel: 0
         }
      };

      return (
         <div className="main">
            <h1>Music Book</h1>
            <p>
               Just like <strong>FaceBook </strong>
               but without all the <strong>Depression</strong>
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
                        id="videoid"
                        value={this.state.videoid}
                        onChange={this.handleChange}
                        placeholder="Youtube URL"
                     />
                     <input
                        type="text"
                        id="contributor"
                        value={this.state.contributor}
                        onChange={this.handleChange}
                        placeholder="Contributor"
                     />
                     <button type="submit" className="submit-button">
                        <h5>Update Song</h5>
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
                        id="videoid"
                        value={this.state.videoid}
                        onChange={this.handleChange}
                        placeholder="Youtube URL"
                     />
                     <input
                        type="text"
                        id="contributor"
                        value={this.state.contributor}
                        onChange={this.handleChange}
                        placeholder="Contributor"
                     />
                     <button type="submit" className="submit-button">
                        <h5>Add Song</h5>
                     </button>
                  </form>
               </div>
            )}
            {this.state.data.map(music => {
               return (
                  <div className="music-container" key={music.id} id={music.id}>
                     <h2>{music.song_name}</h2>
                     <h3>{music.artist}</h3>
                     {/*  */}

                     <div className="rate">
                        <div className="like">
                           <p>Likes</p>
                           <h3>{music.likes}</h3>
                           <button
                              id={music.id}
                              onClick={this.likeData}
                              className="likebtn"
                           >
                              Like
                           </button>
                        </div>
                        <div className="music-vid">
                           <YouTube
                              className="yt"
                              videoId={music.videoid}
                              onReady={this._onReady}
                              opts={opts}
                           />
                           <h5>Contributor: {music.contributor}</h5>
                        </div>
                        <div className="dislike">
                           <p>Dislikes</p>
                           <h3>{music.dislikes}</h3>
                           <button
                              id={music.id}
                              onClick={this.dislikeData}
                              className="dislikebtn"
                           >
                              Dislike
                           </button>
                        </div>
                     </div>

                     <div className="small-rate">
                        <div className="music-vid">
                           <YouTube
                              className="yt"
                              videoId={music.videoid}
                              onReady={this._onReady}
                              opts={opts}
                           />
                           <h5>Contributor: {music.contributor}</h5>
                        </div>
                        <div className="like-dislike">
                           <div className="like">
                              <p>Likes</p>
                              <h3>{music.likes}</h3>
                              <button
                                 id={music.id}
                                 onClick={this.likeData}
                                 className="likebtn"
                              >
                                 Like
                              </button>
                           </div>
                           <div className="dislike">
                              <p>Dislikes</p>
                              <h3>{music.dislikes}</h3>
                              <button
                                 id={music.id}
                                 onClick={this.dislikeData}
                                 className="dislikebtn"
                              >
                                 Dislike
                              </button>
                           </div>
                        </div>
                     </div>

                     {/*  */}
                     <div className="delup">
                        <button id={music.id} onClick={this.editData}>
                           Edit
                        </button>
                        <button id={music.id} onClick={this.deleteSong}>
                           Delete
                        </button>
                     </div>
                     <hr />
                  </div>
               );
            })}
         </div>
      );
   }
}

export default App;
