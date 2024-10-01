import moment from "moment";

export const formatTime = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
  
    // if the task was created today
    if (created.isSame(now, "day")) {
      return "Today";
    }
  
    // if the task was created yesterday
    if (created.isSame(now.subtract(1, "days"), "day")) {
      return "Yesterday";
    }
  
    // check if created with the last 7 days
    if (created.isAfter(moment().subtract(6, "days"))) {
      return created.fromNow();
    }
  
    // if item was created within the last 4 weeks (up to 1 month ago)
    if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
      return created.fromNow();
    }
  
    return created.format("DD/MM/YYYY");
  };


export const filteredTasks = (tasks,priority)=>{
    

    const filteredTasks = () => {
        switch (priority) {
          case "low":
            return tasks.filter((task) => task.priority === "low");
          case "medium":
            return tasks.filter((task) => task.priority === "medium");
          case "high":
            return tasks.filter((task) => task.priority === "high");

          default:
            return tasks;
        }
      };
    
      return filteredTasks();
}