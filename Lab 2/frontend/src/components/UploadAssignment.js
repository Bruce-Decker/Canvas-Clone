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
class UploadAssignment extends Component {
   
  
    constructor() {
        super();
        this.state = {
            file_path: null,
            isVisible: false,
            file: null,
            due_date: '',
            upload_time: ''
           
        }
         
    }

    handleFile = event => {
      console.log('uploaded')
      let file = event.target.files[0]
      
      this.setState({file: file})
  }


    onSubmit = (e) => {
      e.preventDefault()
     
        let file = this.state.file
        let formdata = new FormData()
        formdata.append('assignment_name', this.props.match.params.assignmentName)
        formdata.append('email', this.props.auth.user.email)
        formdata.append('now', Date.now())
        formdata.append('filename', file)
        console.log(formdata)
        for (var [key, value] of formdata.entries()) { 
          console.log(key, value);
        }
      axios.post(`/fileUpload/upload/${this.props.match.params.CourseId}`, formdata)
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

     

    
    async componentDidMount() {
      console.log(this.props.match.params.CourseId)
      console.log(this.props.match.params.assignmentName)
      console.log(this.props.auth.user.email)
       
       try {
         response = await axios.get('/fileUpload/upload/' + this.props.match.params.CourseId + "/" + this.props.match.params.assignmentName + "/" + this.props.auth.user.email)
        
         var response2 = await axios.get('/assignment/viewAssignment/' + this.props.match.params.CourseId + "/" + this.props.match.params.assignmentName)
         //console.log("File path " + response.data[0].file_path)
         console.log("file path " + response.data[0].file_path)
        
       
            this.setState({
                file_path: response.data[0].file_path,
                isVisible: true,
                upload_time: response.data[0].time,
                due_date: response2.data[0].time
            })
       
        } catch {
            this.setState({
               isVisible: false,
               
               
            })
          }
            console.log("sdfdsf")
             
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

        <h1> Upload your assignment for {this.props.match.params.assignmentName}</h1>
        <h1>Deadline {this.state.due_date}</h1>
        <div className = "space">
     
        </div>
        <div className = "space">
     
     </div>
        { this.props.auth.isFaculty ? null : <Link to = {`/ViewSubmissions/${this.props.match.params.CourseId}/${this.props.match.params.assignmentName}`}> <h1> View All Uploads </h1> </Link> }
        <div className = "space">
     
     </div>
     <div className = "space">
  
  </div>
        <form onSubmit = {this.onSubmit} className="ui form">
              <input type="file" id="file-with-current" name = "filename" className="input-default-js" onChange = {this.handleFile}/>
                <label className="label-for-default-js rounded-right mb-3" htmlFor="file-with-current">
            
                </label>

                <button className="ui primary button">
                    Upload
              </button>
        </form>
      </div>
      
      <div>
      {/* {this.state.isVisible ? <Link to ={`../../../${this.props.match.params.email}${this.props.match.params.CourseId}${this.props.match.params.assignmentName}.pdf`} target="_blank">Download</Link> : null }
        {this.state.isVisible ? <ShowPDF url = {`../../../${this.props.auth.user.email}${this.props.match.params.CourseId}${this.props.match.params.assignmentName}.pdf`} /> : null} */}

     <div className = "space">
     
     </div>
        {this.state.isVisible ? <Link to ={`../../../pdf_uploads/${response.data[0].uuid}.pdf`} target="_blank"><button className="ui primary button">Download this PDF </button></Link> : null }
        {this.state.isVisible ? <ShowPDF url = {`../../../pdf_uploads/${response.data[0].uuid}.pdf`} /> : null} 
        
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


export default connect(mapStateToProps)(UploadAssignment)