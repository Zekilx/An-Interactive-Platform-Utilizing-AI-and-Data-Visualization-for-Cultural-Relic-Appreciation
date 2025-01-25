import { Button, Card } from 'antd';
import React from 'react';
import { GiMountains } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import mujingxiang from '../static/mujingxiang.jpg';


function Home() {
    const style = { fontSize: "4vw" }
    const { Meta } = Card;
    const navigate =useNavigate()
    
    return ( 
        <div >
            <div className="hp-image">
                <div className='home-pic'> </div>
                <h2 className="home-page">Welcome to Artifacts</h2>
                <p className="future"> Appreciate the charm of cultural relics</p>
                <h3 className="hp-mountains"> <GiMountains style={style}/> <GiMountains style={style}/> <GiMountains style={style}/> </h3>
                <div className="recommend">
                    <Card
                        hoverable
                        style={{
                        width: 400,
                        height:380,
                        }}
                        cover={<img alt="example" src={mujingxiang}/>}
                    >
                    <Meta title="木经箱" description="苏州博物馆 【宋】" />
                    </Card>
                    <Card
                        hoverable
                        style={{
                        width: 400,
                        height:380,
                        }}
                        cover={<img alt="example" src="https://www.njmuseum.com/files/nb/collection/water/2021/07/30/3%EF%BC%9A5229-A-01.jpg" />}
                    >
                        <Meta title="嘉庆铜胎珐琅画瓜蝶盘" description="南京博物馆 【清】" />
                    </Card>    
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>  <Button type="primary"  size='large' onClick={()=>navigate('/task')}>
                    Start
                    </Button>      
                </div>
              
            </div> 
            
        </div> 
    );
}

export default Home;