import React from "react";
import "../css/form.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      duration: "",
      maxAttendees: "",
      currentIndex: ""
    };
  }
  componentDidMount() {
    let defaultState = new Promise((resolve, reject) => {
      if (this.props.location.state) {
        resolve({
          courseName: this.props.location.state.value.courseName,
          duration: this.props.location.state.value.duration,
          maxAttendees: this.props.location.state.value.maxAttendees,
          currentIndex: this.props.location.state.index
        });
      } else {
        reject({
          courseName: "",
          duration: "",
          maxAttendees: "",
          currentIndex: ""
        });
      }
    });

    defaultState
      .then(response => {
        console.log("response from didmount", response);
        let { courseName, duration, maxAttendees, currentIndex } = response;
        this.setState({
          courseName,
          duration,
          maxAttendees,
          currentIndex
        });
      })
      .catch(e => {
        console.log("error response", e);
        this.setState({ e });
      });
  }

  handleChange = e => {
    const re = /^[1-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleName = e => {
    const re = /^[a-zA-Z\-\s]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleAdd = e => {
    e.preventDefault();
    let localData = this.getLocalStorage();
    let data = {
      courseName: this.state.courseName,
      duration: this.state.duration,
      maxAttendees: this.state.maxAttendees
    };

    if (data.courseName.length >= 5) {
      if (this.state.currentIndex >= 0 && this.state.currentIndex !== "") {
        let newArray = [...localData];
        newArray.splice(this.state.currentIndex, 1, data);
        this.setLocalStorage(newArray);
        swal("Nice", "The course has been Saved", "success");
        this.props.history.push("/");
      } else {
        if (localData) {
          let existingArray = [...localData];
          existingArray.push(data);
          this.setLocalStorage(existingArray);
        } else {
          let newArray = [];
          newArray.push(data);
          this.setLocalStorage(newArray);
        }
        this.setState({
          courseName: "",
          duration: "",
          maxAttendees: ""
        });
        swal("Nice", "The course has been Saved", "success");
      }
    } else {
      swal(
        "Course Name Error",
        "Course Name should be atleast 6 Characters",
        "error"
      );
    }
  };

  setLocalStorage = data => {
    localStorage.setItem("courseData", JSON.stringify(data));
  };
  getLocalStorage = () => {
    console.log("getlocal", JSON.parse(localStorage.getItem("courseData")));
    return JSON.parse(localStorage.getItem("courseData"));
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12">
            <form onSubmit={this.handleAdd} className="form-container">
              <h4>Add Course</h4>
              <hr></hr>
              <div className="form-group">
                <label htmlFor="coursename">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="coursename"
                  aria-describedby="emailHelp"
                  onChange={this.handleName}
                  name="courseName"
                  value={this.state.courseName}
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (in Hours)</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  onChange={this.handleChange}
                  name="duration"
                  value={this.state.duration}
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxattendees">Max Attendees (number)</label>
                <input
                  type="text"
                  className="form-control"
                  id="maxattendees"
                  onChange={this.handleChange}
                  name="maxAttendees"
                  value={this.state.maxAttendees}
                  required={true}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
              <Link to="/" className="btn btn-primary">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCourse;
