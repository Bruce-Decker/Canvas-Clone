import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import { listFiles } from '../actions/fileAction'

class ListCourseFile extends Component {
    constructor() {
        super();
        this.state = {
           items: [],
           show: false
         
        }

       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }

        if (nextProps.file) {
            this.setState({ show: true });
        }

       console.log(this.props.file)
    
    }


    componentDidMount() {
       
       
        this.props.listFiles(this.props.match.params.CourseId, this.props.match.params.faculty_email)

       
    }

//    async componentDidMount() {
       
//         const response = await axios.get('/file/listFiles/' + this.props.match.params.CourseId + '/' + this.props.auth.user.email)
//         this.setState({
//             items: response.data,
           
//         })
//         console.log(response.data)
      
       
//     }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">

              { this.state.show ? <div>
                {  this.props.file.files.map(item =>  
                <div class="card">
                <div class="card-body">
                    <Link to = {`/viewEachCourseFile/${this.props.match.params.CourseId}/${this.props.match.params.faculty_email}/${item.item_name}`}> <h3> {item.item_name}</h3></Link> 
                    
                    </div>
                    </div>

                )}
                </div> : null}
              </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    file: state.file
})


export default connect(mapStateToProps, {listFiles})(ListCourseFile) 