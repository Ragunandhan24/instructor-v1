import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    courseData: [],
    loaded: false
  };
  componentDidMount() {
    let getCourseData = new Promise((resolve, reject) => {
      let courseData = JSON.parse(localStorage.getItem("courseData"));
      if (courseData && courseData.length > 0) {
        resolve(courseData);
      } else {
        reject("no data");
      }
    });

    getCourseData
      .then(response => {
        console.log("response", response);
        this.setState({
          courseData: response,
          loaded: true
        });
      })
      .catch(e => console.log(e));
  }

  handleDelete = index => {
    let data = [...this.state.courseData];
    data.splice(index, 1);
    console.log(data);
    this.setState({
      courseData: data
    });
    localStorage.setItem("courseData", JSON.stringify(data));
  };

  handleEdit = index => {
    let data = [...this.state.courseData];
    let value = data[index];
    this.props.history.push({
      pathname: "/add",
      state: {
        index,
        courseData: this.state.courseData,
        value: value
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Home</h1>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Name</th>
                <th scope="col">Duration (in hours)</th>
                <th scope="col">Max Attendees</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courseData.length > 0 ? (
                this.state.courseData.map((data, index) => {
                  console.log("index inside map", index);
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.courseName}</td>
                      <td>{data.duration}</td>
                      <td>{data.maxAttendees}</td>
                      <td>
                        <button
                          onClick={() => this.handleEdit(index)}
                          type="button"
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.handleDelete(index)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td align="center" colSpan="5">
                    No Data Saved
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link to="/add">Add</Link>
      </div>
    );
  }
}

export default Home;
