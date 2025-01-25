import React from 'react';
import TaskCard from './components/TaskCard';
import ChatBot from './components/ChatBot';
import MultipleViews from './components/MultipleViews';

const Appreciation = () => {
    return (
      <>
      {/* // 任务列表拦 */}
        <div className="ap-image" >
            <h2 className='title' style={{paddingLeft:100}}>Your plan
            </h2>
            <TaskCard /> {/* 导入并使用 TaskCard */}

        {/* //mutiple views拦 */}
       
            <h2 className='title' style={{paddingLeft:100, marginTop:30}}>Artifacts
            </h2>
            <MultipleViews/>
        
        
            <ChatBot />
            </div>
        </>
        

    );
};

export default Appreciation;
