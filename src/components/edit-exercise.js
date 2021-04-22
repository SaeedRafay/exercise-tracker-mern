import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setSubmit(false);
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const userInput = useRef();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        setSubmit(true);
      });
  };

  return (
    <div>
      {submit && <Redirect to="/" />}
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
