import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { AntDesignOutlined, FontSizeOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import { Navigate, useNavigate } from "react-router-dom";

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
  }));

function TaskGenerator() {
    const { styles } = useStyle();
    const [loading,setLoading]=useState(false)
    const [taskGenerated, setTaskGenerated] = useState(false);//生成的状态
    const [generatedTask, setGeneratedTask] = useState(sessionStorage.getItem("generatedTask") || "");//生成的内容  从sessionStorage中获取是否有任务
    let navigate =useNavigate()

    useEffect(() => {
        // 检查 sessionStorage 中是否已有任务清单
        if (generatedTask) {
            setTaskGenerated(true);  // 设置任务生成状态
        }
    }, []);

    const generateTasks = async (promptText) => {
        try {
            const response = await axios.post("http://localhost:5001/api/generate-tasks", { promptText });
            const taskText = response.data.choices[0]?.message?.content || "任务生成失败";  // 确保获取正确字段
            const filteredTasks = taskText.match(/^\d+\.\s.*$/gm)?.slice(0, 4).join("\n") || "任务生成失败";
            return filteredTasks;
        } catch (error) {
            console.error("任务生成失败", error);
            return "任务生成失败";
        }
    };
    
    const handleGenerateTask = async () => {
        setLoading(true); // 设置加载状态
        const promptText = 
            "随机挑选以下问题的其中4个输出 每一次都要尽量多的不一样问题" +
            "(1. Appreciation of 10 cultural relics through the introduction of cultural relics. " +
            "2. Use AI tools to assist appreciation of 10 cultural relics. " +
            "3. Explore the dynastic relationship between cultural relics. " +
            "4. Explore the species relationship between cultural relics. " +
            "5. Explore the relationship between cultural relics in different museums. " +
            "6. Explore whether there is a social attribute relationship between cultural relics. " +
            "7. Try to use intelligent tools to find 3 related cultural relics in a category and appreciate them. " +
            "8. Explore the similarities and connections between the pottery of Nanjing Museum and Suzhou Museum. " +
            "9. Explore the similarities and connections between the pottery of Nanjing Museum and Suzhou Museum)";
        
        const generatedTask = await generateTasks(promptText);
    
        // 格式化任务内容：移除 **，将序号与内容合并
        const formattedTask = formatTasks(generatedTask);
    
        setGeneratedTask(formattedTask); // 更新状态为格式化后的任务
        setTaskGenerated(true); // 设置任务生成完成
        sessionStorage.setItem("generatedTask", formattedTask); // 保存到 sessionStorage
        setLoading(false); // 结束加载状态
    };
    
    const handleRegenerateTask = async () => {
        setLoading(true); // 设置加载状态
        const promptText = 
            "随机挑选以下问题的其中4个输出 每一次都要尽量多的不一样问题" +
            "(1. Appreciation of 10 cultural relics through the introduction of cultural relics. " +
            "2. Use AI tools to assist appreciation of 10 cultural relics. " +
            "3. Explore the dynastic relationship between cultural relics. " +
            "4. Explore the species relationship between cultural relics. " +
            "5. Explore the relationship between cultural relics in different museums. " +
            "6. Explore whether there is a social attribute relationship between cultural relics. " +
            "7. Try to use intelligent tools to find 3 related cultural relics in a category and appreciate them. " +
            "8. Explore the similarities and connections between the pottery of Nanjing Museum and Suzhou Museum. " +
            "9. Explore the similarities and connections between the pottery of Nanjing Museum and Suzhou Museum)";
        
        const generatedTask = await generateTasks(promptText);
    
        // 格式化任务内容：移除 **，将序号与内容合并
        const formattedTask = formatTasks(generatedTask);
    
        setGeneratedTask(formattedTask); // 更新状态为格式化后的任务
        setTaskGenerated(true); // 设置任务生成完成
        sessionStorage.setItem("generatedTask", formattedTask); // 保存到 sessionStorage
        setLoading(false); // 结束加载状态
    };
    
    // 格式化任务内容函数
    const formatTasks = (tasks) => {
        return tasks
            .split(/[\n.]/) // 按换行或句号分割任务
            .filter(line => line.trim()) // 过滤空行
            .reduce((result, line, index, array) => {
                if (/^\d+$/.test(line.trim())) {
                    // 如果是序号，拼接序号和下一行内容
                    result.push(line.trim() + ". " + (array[index + 1]?.replace(/\*\*/g, "").trim() || ""));
                }
                return result;
            }, [])
            .join("\n"); // 合并为单一字符串，用换行符分隔任务
    };



    return (
        <div className="hp-image">
            <h3 className="welcome-description">
                Let AI generate today's learning plans
            </h3>

            {/* AI生成任务按钮 */}
            <ConfigProvider button={{ className: 'linearGradientButton' }}>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: '200px' }}>
                    <Space style={{ marginLeft: "auto" }}>
                        {/* 如果任务尚未生成，显示生成按钮 */}
                        {!taskGenerated && (
                            <Button 
                                className="generate-button" 
                                type="primary" 
                                size="large" 
                                onClick={handleGenerateTask} 
                                loading={loading} 
                                icon={<AntDesignOutlined />}
                            >
                                Generate
                            </Button>
                        )}

                        {/* 如果任务已经生成，显示再生成按钮 */}
                        {taskGenerated && (
                            <Button 
                                className="regenerate-button" 
                                type="primary"
                                danger 
                                size="large" 
                                loading={loading} 
                                onClick={handleRegenerateTask}
                                icon={<AntDesignOutlined />}
                            >
                                Try again
                            </Button>
                        )}
                    </Space>
                </div>
            </ConfigProvider>

            {/* 任务清单卡片 */}
            {generatedTask && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <Card
                        title="Learning Plan"
                        bordered={true}
                        style={{
                            marginTop: 20,
                            width: 700,
                            background: '#dfc9a1',
                        }}
                    >
                        {generatedTask
                            .split(/[\n.]/) // 按换行或句号分割任务
                            .filter(line => line.trim()) // 过滤空行
                            .reduce((result, line, index, array) => {
                                // 判断当前行是否是序号
                                if (/^\d+$/.test(line.trim())) {
                                    // 如果是序号，拼接序号与内容
                                    result.push(line.trim() + ". " + (array[index + 1]?.replace(/\*\*/g, "").trim() || ""));
                                }
                                return result;
                            }, [])
                            .map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                    </Card>
                </div>
            )}

            {generatedTask && (
                <div >
                <p  style={{marginTop:60, textAlign:"center",fontSize:20}} >Are you ready to explore ancient and mysterious artifacts with the above missions? Let's get start</p>
                <div style={{display:'flex',justifyContent:'center',marginTop:60}} >
                    <a className= "ready" href="/appreciation" 
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/appreciation');
                    }}>
                    <span><img title="【Get Ready】"
                     alt="【Get Ready】" 
                     src="https://img.dpm.org.cn/Uploads/Picture/2016/12/29/s5864b1138e3cd.png"
                     style={{width: '120px', height: '120px'}}></img></span>
                    <p>Get Ready!!!</p>
                    </a>
                </div>
                </div>)
            }
            
            {/* <div className="recommend">
            <div className="houses-container"> */}
                {/* {showHouses} */}
            {/* </div> */}
        </div>
        
        
    );
}

export default TaskGenerator;
