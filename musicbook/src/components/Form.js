import React, { Component } from "react";

export default class Form extends Component {
   render() {
      return (
         <div className="form">
            <form onSubmit={this.handleSubmit}>
               <input
                  type="text"
                  value={this.state.item}
                  onChange={this.handleChange}
                  placeholder="Create New Item"
               />
               <button type="submit" className="submit-button">
                  <i className="fas fa-plus" />
               </button>
            </form>
         </div>
      );
   }
}
