import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import AgentForm from "../components/AgentForm";
import AgentList from "../components/AgentList";
import FileUpload from "../components/FileUpload";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [agents, setAgents] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const fetchAgents =
    async () => {
      try {
        const res =
          await API.get(
            "/agents"
          );

        setAgents(
          res.data
        );

      } catch (error) {
        console.log(
          error
        );
      }
    };

  const fetchTasks =
    async () => {
      try {
        const res =
          await API.get(
            "/upload/tasks"
          );

        setTasks(
          res.data
        );

      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    fetchAgents();
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="stats">

          <div className="card">
            <h3>
              Total Agents
            </h3>

            <h2>
              {
                agents.length
              }
            </h2>
          </div>

          <div className="card">
            <h3>
              Total Tasks
            </h3>

            <h2>
              {
                tasks.length
              }
            </h2>
          </div>

        </div>

        <AgentForm
          fetchAgents={
            fetchAgents
          }
        />

        <AgentList
          agents={agents}
          fetchAgents={
            fetchAgents
          }
        />

        <FileUpload
          fetchTasks={
            fetchTasks
          }
        />

        <TaskList
          tasks={tasks}
        />

      </div>
    </>
  );
}

export default Dashboard;