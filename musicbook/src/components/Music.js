import React, { Component } from "react";

export default class Music extends Component {
   render() {
      return (
         <div className="music-container">
            <p>Song Name: {this.props.song_name}</p>
            <p>Artist: {this.props.artist}</p>
            <p>Video URL: {this.props.video_url}</p>
            <p>Contributor: {this.props.contributor}</p>
            <p>Likes: {this.props.likes}</p>
            <p>Dislikes: {this.props.dislikes}</p>
         </div>
      );
   }
}
