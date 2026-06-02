const distributeTasks = (
  records,
  agents
) => {
  let distributedTasks = [];

  let agentIndex = 0;

  records.forEach((record) => {
    distributedTasks.push({
      firstName:
        record.FirstName ||
        record.firstname,

      phone:
        record.Phone ||
        record.phone,

      notes:
        record.Notes ||
        record.notes,

      agentId:
        agents[agentIndex]._id
    });

    agentIndex =
      (agentIndex + 1) %
      agents.length;
  });

  return distributedTasks;
};

module.exports =
  distributeTasks;