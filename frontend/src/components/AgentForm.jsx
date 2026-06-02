import { useState } from "react";
import API from "../api/axios";

function AgentForm({ fetchAgents }) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/agents",
        formData
      );

      alert(
        "Agent Added Successfully"
      );

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

      fetchAgents();

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Error"
      );
    }
  };

  return (
    <div className="card">
      <h3>Add Agent</h3>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={
            handleChange
          }
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={
            handleChange
          }
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          required
        />

        <button type="submit">
          Add Agent
        </button>
      </form>
    </div>
  );
}

export default AgentForm;