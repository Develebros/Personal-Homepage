import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class GradesTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      student: { name: "student" },
      courses: [{ name: "course" }],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5001/canvas/self")
      .then((response) => this.setStudent(response.data));

    axios
      .get("http://localhost:5001/canvas/activecourses")
      .then((response) => this.setCourses(response.data));
  }

  setStudent = (newStudent) => {
    this.setState({ student: newStudent });
  };

  setCourses = (newCourses) => {
    this.setState({ courses: newCourses });
  };

  getCanvasUser = async () => {
    return await axios.get(`http://localhost:5001/canvas/self`);
  };

  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {this.state.student.name.substring(
              0,
              this.state.student.name.indexOf(" ")
            ) + "'s Grades"}
            {!this.props.canEdit && <img className="small-icon" src={require("../../styling/img/Canvas_Bug_Color_RGB.png")} />}
          </Card.Title>
          <ListGroup>
            {this.state.courses.map((course) => {
              //If we haven't recieved any data from Canvas yet, we want to skip

              if (course.name !== "course") {
                var grade;
                if (
                  typeof course.enrollments[0].computed_current_score ===
                  "object"
                )
                  grade = <p>-</p>;
                else
                  grade = (
                    <p>{course.enrollments[0].computed_current_score}%</p>
                  );

                return (
                  <ListGroup.Item key={course.uuid}>
                    <div className="d-flex justify-content-between">
                      <p>{course.name}</p>
                      {grade}
                    </div>
                  </ListGroup.Item>
                );
              } else {
                return <></>;
              }
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default GradesTile;
