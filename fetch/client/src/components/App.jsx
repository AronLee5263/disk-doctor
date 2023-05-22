import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./App.module.css";

import Create from "./Create";
import MainHeader from "./Mainheader";

const SERVER_URL = "http://localhost:5000/api/todo";
// 브랜치 테스트

function App() {
  const [todoList, setTodoList] = useState([]);

  const axiosData = async () => {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
  };

  useEffect(() => {
    axiosData();
  }, []);

  const onSubmitPostHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVER_URL, { text, done });
    axiosData();
  };

  return (
    <>
      <MainHeader />

      <div className={classes.main_contents}>
        <div className={classes.content_container}>
          {todoList?.map((todo) => {
            return (
              <div className={classes.content} key={todo.id}>
                <p>{"number : " + todo.id}</p>
                <p>{"text : " + todo.text}</p>
                <p>{"checked ? : " + (todo.done ? "Yes" : "No")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
