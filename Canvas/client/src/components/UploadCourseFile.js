import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import PDF from 'react-pdf-js';
import ShowPDF from './ShowPDF'


var response;
class UploadCourseFile extends Component {
   
  
    constructor() {
        super();
        this.state = {
            file_path: null,
            isVisible: false,
            file: null,
            test: "1",
            item_name: ''
           
        

        }
         
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFile = event => {
      console.log('uploaded')
      let file = event.target.files[0]
      
      this.setState({file: file})
  }


    onSubmit = (e) => {
     
      console.log("sdfsdfsfd")
        let file = this.state.file
        let formdata = new FormData()
        formdata.append('item_name', this.state.item_name)
        formdata.append('email', this.props.auth.user.email)
        formdata.append('filename', file)
        console.log(formdata)
        for (var [key, value] of formdata.entries()) { 
          console.log(key, value);
        }
      axios.post(`/createFile/${this.props.match.params.CourseId}`, formdata)
        .then(res => window.location.reload())
        .catch(err => console.log("Error"))
       
    }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
      }
    
      handlePrevious = () => {
        this.setState({ page: this.state.page - 1 });
      }
    
      handleNext = () => {
        this.setState({ page: this.state.page + 1 });
      }
    

      renderPagination = (page, pages) => {
        let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        if (page === 1) {
          previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        }
        let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        if (page === pages) {
          nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        }
        return (
          <nav>
            <ul className="pager">
              {previousButton}
              {nextButton}
            </ul>
          </nav>
          );
      }



   

    render() {
        let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
      
        return (
            <div className = "pageDesign">
              <Banner />
               { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
               <div className = "registerCourseContainer">
               <div className="input-default-wrapper mt-3">
        <h1> Upload course file and lectures {this.props.match.params.assignmentName}</h1>

        <form onSubmit = {this.onSubmit} className="ui form">
              <input type="file" id="file-with-current" name = "filename" className="input-default-js" onChange = {this.handleFile}/>
                <label className="label-for-default-js rounded-right mb-3" htmlFor="file-with-current">
            
                </label>
                <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Item Name</label>
                            <input style={{width:"200px"}} type="assignment_name" className="form-control" name="item_name"  onChange = {this.onChange}/>
                            </div>
                <button className="ui primary button">
                    Upload
              </button>
        </form>
      </div>
      
      <div>
        {this.state.isVisible ? <ShowPDF url = {`../../../PDFs/${this.props.auth.user.email}${this.props.match.params.CourseId}${this.props.match.params.assignmentName}.pdf`} /> : null}
        
{/* 
{this.state.isVisible ? <Test url = {`../../PDFs/testX.pdf`} /> : <h1> 2 </h1>}
         */}
        {/* <PDF
          file="../../PDFs/testX.pdf"
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pagination} */}
      </div>
        {/* <h1> {this.state.file_path} </h1> */}

   
      <div className = "space">
     
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


export default connect(mapStateToProps)(UploadCourseFile)