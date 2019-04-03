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




var response
class ViewEachCourseFile extends Component {


    constructor() {
        super();
        this.state = {
            file_path: null,
            isVisible: false,
            file: null,
            test: "1",
            points: ''
           
        

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
  
       
  
  
  
      
      async componentDidMount() {
         
          try {
           response = await axios.get('/file/getFile/' + this.props.match.params.CourseId + "/" +  this.props.match.params.item_name + "/" + this.props.auth.user.email)
           console.log("File path " + response.data[0].file_path)
          
         
              this.setState({
                  file_path: 'test',
                  isVisible: true,
                  test: "2"
              })
         
          } catch {
              this.setState({
                 isVisible: false,
                 
                  test: "3"
              })
          }
          // console.log(this.props.match.params.CourseId)
          // console.log(this.props.match.params.assignmentName)
          // console.log(this.props.auth.user.email)
          // console.log(response.data)
        
  
          
         
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
          <h1> {this.props.match.params.item_name}</h1>
  
         
        </div>
        
        <div>
        {/* <Link to ={`../../../file_uploads/${this.props.match.params.CourseId}${(this.props.match.params.item_name).replace(/\s/g, '')}.pdf`} target="_blank">Download</Link> */}
          {this.state.isVisible ?<div> <Link to ={`../../../file_uploads/${response.data[0].uuid}.pdf`} target="_blank">Download</Link> <ShowPDF url = {`../../../file_uploads/${response.data[0].uuid}.pdf`} /> </div>: null}
          
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
  
  
  export default connect(mapStateToProps)(ViewEachCourseFile)