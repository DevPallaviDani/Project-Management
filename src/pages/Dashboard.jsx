import React, { useState } from "react";
import useWorkspace from "../hooks/useWorkspace.jsx";
// import useTask from "../hooks/useTask.jsx";
import StatsGrid from "../components/stats/StatsGrid.jsx";
import Button from "../components/UI/Button.jsx";
import SectionWrapper from "../components/common/SectionWrapper.jsx";
import ItemCard from "../components/common/ItemCard.jsx";
import SidePanel from "../features/dashboard/SidePanel.jsx";
import { loggedInUser } from "../constants/global.js";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
} from "../utils/helper.js";
import { users } from "../data/Users.js";
import { TAGS, TASK_PRIORITIES } from "../constants/global.js";

function Dashboard() {
  const {
    stats,
    tasks,
    openTaskModal,
    openProjectModal,
    handleResetStorage,
    projects,
  } = useWorkspace();
  // const { openTaskModal, tasks } = useTask();

  const [filteredTask, setFilteredTask] = useState([]);
  const [hasTask, setHastask] = useState(false);

  const handleDateFilter = (selectedDate) => {
    const filtered = tasks?.filter(
      (task) => isSameDay(task.dueDate, selectedDate) && task.status !== "done",
    );
    if (filtered.length > 0) {
      setFilteredTask(filtered);
      setHastask(true);
    } else {
      setFilteredTask(
        tasks.filter(
          (t) => t.assigneeId === loggedInUser.userId && t.status !== "done",
        ),
      );
      setHastask(false);
    }
  };
  const getAssignee = (userId) => {
    return users.find((user) => user.id === userId);
  };
  const getTaskPriorities = (priority) => {
    return TASK_PRIORITIES.find((p) => p.label === priority);
  };
  const getProjectByTask = (task) => {
    return projects?.find((p) => p.id === task.projectId);
  };
  const assignedTasks = tasks.filter(
    (t) => t.assigneeId === loggedInUser.userId && t.status !== "done",
  );
  const totalAssignedTasks = assignedTasks.filter(
    (task) => task.status !== "done",
  ).length;

  const handleAddClick = (selectedstatus, modalFor) => {
    if (modalFor === "Task") {
      openTaskModal(selectedstatus);
    }
    if (modalFor === "Project") {
      openProjectModal(selectedstatus);
    } else {
      return;
    }
  };

  return (
    <div
      className="flex max-auto w-full md:px-2 rounded-3xl  
    muted-bg text-text-primary overflow-x-hidden "
    >
      <div className="grid grid-cols-1 md:grid-cols-[80%_20%] gap-4 mt-20 md:mt-2">
        <div>
          {/* STATS */}
          <StatsGrid />
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {/* TASKS */}
            <div>
              <SectionWrapper
                title="Assigned Tasks"
                count={totalAssignedTasks}
                onAdd={() => handleAddClick("todo", "Task")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredTask.length === 0 && (
                    <div className="border border-dashed border-gray-300 flex justify-center">
                      <Button
                        className="text-lg "
                        onClick={() => handleAddClick("todo", "Task")}
                      >
                        No task yet - create one
                      </Button>
                    </div>
                  )}
                  {( filteredTask || assignedTasks)
                    //  assignedTasks
                    .slice(0, 4)
                    .map((task) => {   
                      const project = getProjectByTask(task);
                      const assignee = getAssignee(task.assigneeId);
                      const tag = TAGS.find((t) => t.id === task?.tagId);
                      const priority = getTaskPriorities(
                        TASK_PRIORITIES,
                        task.priority,
                      );
                      return (
                        <ItemCard
                          key={task.id}
                          id={task.id}
                          title={task.text}
                          subtitle={project?.title || "No Project"}
                          description={task.taskDescription}
                          dueDate={
                            task.duDate ? "03-04-2026" : `${task.dueDate}`
                          }
                          taskStatus={task.status}
                          priority={priority}
                          assignee={assignee}
                          tag={tag}
                        />
                      );
                    })}
                </div>
              </SectionWrapper>
            </div>
            {/* PROJECTS */}
            <div>
              <SectionWrapper
                title="Projects"
                count={projects.length}
                onAdd={() => handleAddClick("started", "Project")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(projects || [])
                    .filter((p) => p.projectStatus !== "completed")
                    .slice(0, 8)
                    .map((project) => {
                      const projectTasks = tasks.filter(
                        (task) => task.projectId === project.id,
                      );

                      return (
                        <ItemCard
                          key={project.id}
                          title={project.title}
                          subtitle={project.description}
                          description={
                            projectTasks.length
                              ? `${projectTasks.length} tasks`
                              : "NO TASK"
                          }
                          dueDate={project.dueDate}
                          projectStatus={project.projectStatus}
                        />
                      );
                    })}
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>

        <div className="order-2">
          <SidePanel tasks={assignedTasks} onDateSelect={handleDateFilter} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
