import React from 'react'

class AnnouncementInput extends React.Component {
    constructor(props) {
        super(props)

    }

    onClick = (e) => {

    }

    render() {
        return (
            <div className="ui form">
            <form id="messageForm">
            <div className="field">
            <label> Title </label>
              <textarea rows="2" name = "title" ref = "title" onChange = {this.props.onChange}></textarea>
             
            </div>
            <div className="field">
            <label>Message</label>
              <textarea name = "comment" ref = "comment" onChange = {this.props.onChange}></textarea>
            </div>
           
            <button className="ui primary button" onClick = {this.props.onClick}>
                  Send
            </button>
            </form>
          </div>
        )
    }
}

export default AnnouncementInput
