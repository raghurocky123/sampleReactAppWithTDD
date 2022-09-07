import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAllUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
          console.log(response);
          setUsers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchAllUsers();
  }, []);

  const handleOnInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnSubmitForm = (event) => {
    event.preventDefault();
    fetchUserByName(inputValue);
  };

  const fetchUserByName = async (name) => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users?name=${name}`)
      .then(function (response) {
        console.log(response);
        setSearchCriteria(name);
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Users Finder</h1>
      <form onSubmit={handleOnSubmitForm}>
        <input
          type="text"
          name="name"
          placeholder="Enter an name to find user..."
          value={inputValue}
          onChange={handleOnInputChange}
        />
        <button type="submit">Find</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {searchCriteria && <p>Showing results for {searchCriteria}:</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
