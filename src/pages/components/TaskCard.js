import React, { useContext } from 'react';
import { Card, Table, Checkbox, Divider } from 'antd';
import { TaskContext } from '../context/TaskContext';

const TaskCard = () => {
    const { taskList, setTaskList } = useContext(TaskContext);

    const toggleCompletion = (key) => {
        setTaskList(prev =>
            prev.map(item =>
                item.key === key ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const columns = [
        {
            title: "Task",
            dataIndex: "task",
            key: "task",
        },
        {
            title: "Completed",
            dataIndex: "completed",
            key: "completed",
            render: (text, record) => (
                <Checkbox
                    checked={record.completed}
                    onChange={() => toggleCompletion(record.key)}
                />
            ),
        },
    ];

    return (
        <div style={{display:'flex',justifyContent:'center',}}>
        <Card
            title="Learning Plan"
            bordered={true}
            style={{ marginTop: 20, width: 700, border: '2px solid #dfc9a1' }}
        >
            <Table
                columns={columns}
                dataSource={taskList}
                pagination={false}
            />
        </Card>
        </div>
    );
};

export default TaskCard;