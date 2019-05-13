import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import { Query, Mutation } from 'react-apollo'

import { GET_PROFILE} from '../queries/index'

class ShowProfile extends Component {
    constructor() {
        super();

       
    }

  

    render() {

        const email = this.props.auth.user.email

        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
                 <div className = "lobster">
                 <Query query = { GET_PROFILE } variables = {{email}}>
                 {({ data, loading, error }) => {
                        if (loading) return <div> Loading </div>
                        if (error) return <div> error </div>
                        if (error) {
                            console.log(error)
                        }
                        console.log(data)
                         
                        return (
                            <div>
                                <h3 className = "BreeSerif"> Name <i className="fas fa-user"></i> : {data.getProfile.name}  </h3>
                                <h3 className = "BreeSerif">  Email <i className="fas fa-envelope-square"></i> : {data.getProfile.email}  </h3>
                                <h3 className = "BreeSerif">  Phone Number <i className ="fas fa-phone"></i> : {data.getProfile.phone_number} </h3>
                                <h3 className = "BreeSerif">  Gender: {data.getProfile.gender} </h3>
                                <h3 className = "BreeSerif">    Company <i className="far fa-building"></i> : {data.getProfile.company} </h3>
                                <h3 className = "BreeSerif"> City <i className="fas fa-city"></i> : {data.getProfile.city} </h3>
                                <h3 className = "BreeSerif"> Hometown: {data.getProfile.hometown} </h3>
                                <h3 className = "BreeSerif"> School <i className="fas fa-university"></i> : {data.getProfile.school} </h3>
                                <h3 className = "BreeSerif"> Languages <i className="fas fa-language"></i> : {data.getProfile.languages} </h3>
                                <h3 className = "BreeSerif"> About Me: {data.getProfile.about_me} </h3>
                           </div>
                        )
                    }}
          </Query>
             
                 </div>
                 <div className = "extra_space">

                 </div>
             </div>
            </div>

        )
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(ShowProfile) 