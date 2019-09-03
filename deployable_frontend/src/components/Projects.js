import React,{Component} from 'react'
import { Modal, Button } from 'react-bootstrap';
import '../stylesheets/Projects.css'

export default class Projects extends Component{
    state = {
        projects: null,
        modalShow: false
    }

    renderProjects = () => {
        return this.state.projects.map(project => 
            <div className = "project" key = {project.project_name} data-key = {project.project_name}>
                <img src = {project.image_link} alt ="" className = "project-image"/>
                <p className = "project-name">{project.project_name}</p>
            </div> 
            )
    }

    handleClose = () => this.setState({modalShow: false});
    handleShow = () => {
        this.Example();
        this.setState({modalShow: true})
    };

    Example() {
      
        return (
          <>
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>
                  Close
                </Button>
                <Button onClick={this.handleClose}>
                  Create Project
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      

    componentDidMount(){
        this.setState({projects: this.props.projects})
    }
    render(){
        return(
            
            <div className="projects-main-container">
                {this.Example()}
                <p className = "project-container-heading">Projects</p>
                <div className ="add-new-project-btn" onClick={this.handleShow}>&#x2b;</div>

                <div className="projects-container" >
                    {
                        this.state.projects !== null ? this.renderProjects(): null
                    }
                </div>

                
            </div>
        )
    }
}