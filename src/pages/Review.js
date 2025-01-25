import React, { useContext } from 'react';
import { Card, Progress } from 'antd';
import TaskCard from './components/TaskCard';
import { TaskContext } from '../pages/context/TaskContext';
import { List } from 'echarts';
import { FavoritesContext } from '../pages/context/FavoritesContext';

const Review = () => {
    const { taskList } = useContext(TaskContext);
    const { favorites } = useContext(FavoritesContext);

        // 调试输出
        console.log("Task List:", taskList);
        console.log("Favorites:", favorites);

    const completedCount = taskList.filter(task => task.completed).length;
    const totalCount = taskList.length;
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            {/* 进度条部分 */}
            <Card
                title="Task Completion Progress"
                bordered={true}
                style={{ marginBottom: 20, width: 700, textAlign: 'center', border: '2px solid #dfc9a1' }}
            >
                <Progress
                    percent={completionPercentage}
                    status={completionPercentage === 100 ? "success" : "active"}
                    strokeColor="#52c41a"
                    style={{ marginBottom: 20 }}
                />
                <p>{completedCount} of {totalCount} tasks completed</p>
            </Card>

            {/* TaskCard */}
            <TaskCard />
        </div>
        <div style={{ padding: "20px" }}>
        <h1>Stars</h1>
        {favorites.length === 0 ? (
          <p>You have no star artifacts</p>
        ) : (
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={favorites}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.名称}
                  cover={<img alt={item.名称} src={item.图片url} />}
                >
                  <p><strong>年代:</strong> {item.年代}</p>
                  <p><strong>规格:</strong> {item.规格}</p>
                  <p><strong>简介:</strong> {item.简介}</p>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
      </>
    );
};

export default Review;