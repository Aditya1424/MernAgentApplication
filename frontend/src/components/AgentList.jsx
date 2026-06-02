import API from "../api/axios";

function AgentList({
  agents,
  fetchAgents,
}) {
  const deleteAgent =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Agent?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await API.delete(
          `/agents/${id}`
        );

        fetchAgents();

      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="card">
      <h3>
        Agents List
      </h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {agents.map(
            (agent) => (
              <tr
                key={
                  agent._id
                }
              >
                <td>
                  {
                    agent.name
                  }
                </td>

                <td>
                  {
                    agent.email
                  }
                </td>

                <td>
                  {
                    agent.mobile
                  }
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAgent(
                        agent._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}

        </tbody>
      </table>
    </div>
  );
}

export default AgentList;