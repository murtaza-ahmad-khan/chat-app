import React, { useEffect, useState } from "react";
import { createContact, getContacts } from "../api/contacts";

export default function Contacts({ history }) {
  const [username, setUsername] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const { data } = await getContacts(`?userId=${user.id}`);
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContacts();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Retrieve  user from local storage
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
      }

      const res = await createContact({ username, user });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactClick = (contact) => {
    history.push({
      pathname: "/chat",
      search: "id=" + contact.id,
    });
  };

  return (
    <div>
      <h4>Contacts</h4>
      {contacts.map((contact) => (
        <div
          className="bg-light rounded-4 p-3 mb-2"
          key={contact.username}
          onClick={() => handleContactClick(contact)}
        >
          {contact.name}
        </div>
      ))}
      <h4 className="mt-4 mb-4 mt-4">Add Contact</h4>
      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
}
