import React from "react";


class SideBar_Custom extends React.Component {
 
 
  render() {
    return (
      <div className="sidebar">
      <a className="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    )
  }
}
 
export default SideBar_Custom;