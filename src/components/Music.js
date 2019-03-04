import React, { Component } from "react";
import YouTube from "react-youtube";

export default class Music extends Component {
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
         <div className="music-container">
            <p>{this.props.index}</p>
            <p>Song Name: {this.props.song_name}</p>
            <p>Artist: {this.props.artist}</p>
            <YouTube videoId={this.props.videoId} onReady={this._onReady} opts={opts} />
            <p>Contributor: {this.props.contributor}</p>
            <p>Likes: {this.props.likes}  <button>Love</button></p>
            <p>Dislikes: {this.props.dislikes}  <button onClick={this.props.updateCount}>Hate</button></p>
            <button onClick={this.props.editData}>Edit</button>
            <button onClick={this.props.deleteData}>Delete</button>
         </div>
      );
   }
}
