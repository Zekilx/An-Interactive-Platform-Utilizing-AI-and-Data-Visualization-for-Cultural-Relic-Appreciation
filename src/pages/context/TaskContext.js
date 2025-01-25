import React, { createContext, useState } from 'react';

// 创建 Context
export const TaskContext = createContext();

// 提供 Provider 组件
export const TaskProvider = ({ children }) => {
    const storedTask = sessionStorage.getItem("generatedTask");
    const initialTasks = storedTask
        ? storedTask
              .split(/\n/)
              .map((line, index) => {
                  const trimmedLine = line.trim();
                  if (trimmedLine) {
                      return {
                          key: index,
                          task: `${index + 1}. ${trimmedLine}`,
                          completed: false,
                      };
                  }
                  return null;
              })
              .filter(item => item)
        : [];

    const [taskList, setTaskList] = useState(initialTasks);

    return (
        <TaskContext.Provider value={{ taskList, setTaskList }}>
            {children}
        </TaskContext.Provider>
    );
};