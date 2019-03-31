import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

export default class MoveableCourse extends Component {
    constructor(props) {
      super()
    }
    render() {
        return (
          


            <Draggable draggableId = {this.props.data._id} index = {this.props.data.CourseId}>
                 {provided => (
                     <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef = {provided.innerRef}
                     >
                        {this.props.data.CourseId}

                     </div>
                 )}
            </Draggable>
        )
    }
}