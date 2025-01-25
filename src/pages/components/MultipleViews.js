import React, { useState } from 'react';
import { Card, Input, List, message } from 'antd';
import ArtifactDisplay from './MultipleViews/ArtifactDisplay';
import ChuTu from './MultipleViews/ChuTu';

const MultipleViews = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [artifactData, setArtifactData] = useState(null);
  const [relatedArtifacts, setRelatedArtifacts] = useState([]);
  const [recommendations, setRecommendations] = useState([]); // 推荐的相似文物
  const [source, setSource] = useState(''); // 来源信息

  // 查询主文物和推荐文物
  const fetchArtifactData = async (artifactName) => {
    console.log("Fetching data for artifact:", artifactName); // 添加调试信息
    setLoading(true);
    const artifactNameTrimmed = artifactName.trim();
  
    try {
      const response = await fetch(`http://localhost:5001/api/search?name=${encodeURIComponent(artifactNameTrimmed)}`);
      const data = await response.json();
  
      if (data.mainArtifact) {
        console.log("Data fetched successfully:", data); // 调试输出
        setArtifactData(data.mainArtifact);
        setRelatedArtifacts(data.relatedArtifacts);
        setSource(data.source); // 设置来源信息

      // 2. 查询相似文物推荐
      const recommendResponse = await fetch("http://localhost:5001/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artifactName: artifactNameTrimmed }),
      });
      const recommendData = await recommendResponse.json();

      if (recommendData.recommendations) {
        setRecommendations(recommendData.recommendations);
        message.success(`成功找到 ${recommendData.recommendations.length} 个相似文物`);
      } else {
        message.warning("未找到相似的文物");
        setRecommendations([]);
      }
    } else {
      message.warning("未找到该文物，请检查名称是否正确。");
      setArtifactData(null);
      setRelatedArtifacts([]);
      setSource('');
      setRecommendations([]);
    }
  } catch (error) {
    console.error("获取数据时出错:", error);
    message.error("获取数据时出错，请稍后再试。");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className='Multiple-input'>
        <Search
          style={{ width: 800, marginBottom: 50 }}
          placeholder="Input the artifact you want to learn"
          enterButton="Search"
          size="large"
          loading={loading}
          onSearch={fetchArtifactData}
        />
      </div>

      {artifactData && (
        <ArtifactDisplay
          artifactData={artifactData}
          relatedArtifacts={relatedArtifacts}
          source={source} // 传递 source 信息
          fetchArtifactData={fetchArtifactData} // 传递 fetchArtifactData 函数
          recommendations={recommendations}
        />
      )}
      {artifactData && (<ChuTu/>)}
      

     
  </>
  );
};

export default MultipleViews;
