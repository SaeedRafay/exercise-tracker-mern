import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${exercise._id}`}>edit</Link> |{" "}
        <a href="/#" onClick={() => deleteExercise(exercise._id)}>
          delete
        </a>
      </td>
    </tr>
  );
};

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));
    setExercises((exercises) =>
      exercises.filter((exercise) => exercise._id !== id)
    );
  };

  const exerciseList = () => {
    return exercises.map((exercise) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={deleteExercise}
          key={exercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
