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
            autoplay: 0
         }
      };

      return (
         <div className="music-container">
            <p>Song Name: {this.props.song_name}</p>
            <p>Artist: {this.props.artist}</p>
            <YouTube videoId={this.props.videoId} opts={opts} onReady={this._onReady} />
            <p>Contributor: {this.props.contributor}</p>
            <p>Likes: {this.props.likes}</p>
            <p>Dislikes: {this.props.dislikes}</p>
         </div>
      );
   }
}
