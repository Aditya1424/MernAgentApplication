function TaskList({ tasks }) {
  return (
    <div className="card">

      <h3>
        Distributed Tasks
      </h3>

      <table>
        <thead>
          <tr>
            <th>
              First Name
            </th>

            <th>
              Phone
            </th>

            <th>
              Notes
            </th>

            <th>
              Assigned Agent
            </th>
          </tr>
        </thead>

        <tbody>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr
                key={task._id}
              >
                <td>
                  {
                    task.firstName
                  }
                </td>

                <td>
                  {
                    task.phone
                  }
                </td>

                <td>
                  {
                    task.notes
                  }
                </td>

                <td>
                  {
                    task.agentId
                      ?.name
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign:
                    "center",
                }}
              >
                No Tasks Found
              </td>
            </tr>
          )}

        </tbody>
      </table>

    </div>
  );
}

export default TaskList;