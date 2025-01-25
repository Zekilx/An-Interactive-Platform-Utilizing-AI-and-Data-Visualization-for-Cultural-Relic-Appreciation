import React, { useContext,useEffect, useRef } from "react";
import { Card, message, Modal,List} from "antd";
import { ForceGraph2D } from "react-force-graph";
import * as echarts from "echarts";
import { FavoritesContext } from "../../context/FavoritesContext";


const ArtifactDisplay = ({ artifactData, relatedArtifacts, fetchArtifactData,source ,recommendations,...props }) => {
  const { addToFavorites } = useContext(FavoritesContext);

  console.log(artifactData);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // 使用您的实际数据
    const data = [
      { value: 57, name: "宋" },
      { value: 2, name: "晚唐~五代" },
      { value: 2, name: "唐~五代" },
      { value: 2, name: "五代" },
      { value: 203, name: "清" },
      { value: 105, name: "明" },
      { value: 30, name: "明末清初" },
      { value: 12, name: "明 嘉靖" },
      { value: 9, name: "元" },
    ].map((item) => ({
      ...item,
      itemStyle: {
        opacity: item.name === artifactData.年代 ? 1 : 0.4, // 高亮当前文物的朝代
      },
    }));

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical", // 垂直排列
    left: "left", // 图例位于图表右侧
    
      },
      series: [
        {
          name: "朝代分布",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["60%", "40%"], // 向左移动饼图，确保不与图例重叠
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: (data) => (data.name === artifactData.年代 ? "#FFD700" : "transparent"), // 高亮当前朝代的边框颜色
            borderWidth: (data) => (data.name === artifactData.年代 ? 3 : 0), // 仅为当前朝代设置边框
            shadowBlur: (data) => (data.name === artifactData.年代 ? 10 : 0),
            shadowColor: (data) => (data.name === artifactData.年代 ? "rgba(0, 0, 0, 0.5)" : "transparent"),
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [artifactData]);

  const graphData = {
    nodes: [
      { id: artifactData.名称, group: "main", artifact: artifactData },
      ...relatedArtifacts.map((artifact) => ({ id: artifact.名称, group: "related", artifact })),
    ],
    links: relatedArtifacts.map((artifact) => ({ source: artifactData.名称, target: artifact.名称 })),
  };

  //处理点击节点
  const handleNodeClick = (node) => {
    if (node.group === "related") {
      Modal.confirm({
        title: `是否要查看 ${node.id}？`,
        onOk() {
          fetchArtifactData(node.id);
        },
        onCancel() {
          console.log("用户取消查看");
        },
      });
    } else {
      message.info("已是当前文物");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40p x", position: "relative", height: "600px" }}>
      {/* 图谱的Card容器 */}
      <Card
        title="同时期，还有这些文物"
        bordered={false}
        style={{
          width: 400,
          position: "absolute",
          top: "0px",
          left: "40px",
          zIndex: 1,
          // backgroundColor:"rgba(205,154,106,0.3)"
          border:'2px solid  #f1f1f1'
        }}
      >
        <ForceGraph2D
          graphData={graphData}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx) => {
            if (!isFinite(node.x) || !isFinite(node.y)) return;

            const gradient = ctx.createRadialGradient(node.x, node.y, 5, node.x, node.y, 20);
            gradient.addColorStop(0, node.group === "main" ? "#FF6347" : "#4682B4");
            gradient.addColorStop(1, node.group === "main" ? "#FFA07A" : "#87CEEB");
            ctx.fillStyle = gradient;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 8;

            ctx.font = "4px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#333";
            ctx.fillText(node.id, node.x, node.y + 15);
          }}
          linkWidth={1.5}
          linkColor={() => "rgba(100, 149, 237, 0.6)"}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          width={400}
          height={200}
          nodeLabel="id"
          backgroundColor="rgba(255, 255, 255, 0)"
        />
      </Card>

      {/* 中央文物信息展示 */}
      {artifactData && (
        <Card
          style={{
            width: 400,
            borderRadius: "20%",
            margin: "auto",
            padding: "40px",
            textAlign: "center",
            border: "2px solid #907400",
            backgroundColor: "rgba(144, 115, 80, 0.4)",
            position: "relative",
            zIndex: 10,
            marginBottom: "50px",
          }}
          cover={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={artifactData.图片url}
                alt={artifactData.名称}
                style={{
                  borderRadius: "50%",
                  maxWidth: "50%",
                  maxHeight:"60%"
                }}
              />
            </div>
          }
        >
          <h2>{artifactData.名称}</h2>
          <p><strong>年代:</strong> {artifactData.年代}</p>
          <p><strong>规格:</strong> {artifactData.规格}</p>
          <p><strong>简介:</strong> {artifactData.简介}</p>
          <p><strong>来源:</strong> {source}</p>

           {/* 收藏按钮 */}
           <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background:"#907349",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => addToFavorites(artifactData)}>
            
            
          
            收藏
          </button>
          </Card>)}

          {/* 饼图的Card容器 */}
          <Card
            style={{
              width: "400px",
              height: "400px",
              position: "absolute",
              bottom: "-200px",
              left: "40px",
              borderRadius: "10px",
              overflow: "hidden",
              // backgroundColor:"rgba(205,154,106,0.3)"
              border:'2px solid  #f1f1f1'
            }}
            title="朝代分布"
            bordered={true}
          >
            <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
          
        </Card>

         {/* 推荐的文物展示卡片 */}
  {recommendations.length > 0 && (
    <Card
      title="推荐的相关文物"
      style={{
        width: "400px",
        height: "800px",
        position: "absolute",
        top: "20px",
        right: "40px",
        borderRadius: "10px",
        overflow: "hidden",
        border:'2px solid  #f1f1f1',
        zIndex: 5, // 确保推荐卡片显示在其他内容之上
        // backgroundColor:"rgba(205,154,106,0.3)"
      }}
      bordered={true}
    >
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={recommendations}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.artifact.名称} bordered={false}>
              <p><strong>相似度:</strong> {(item.similarity * 100).toFixed(2)}%</p>
              <p><strong>简介:</strong> {item.artifact.简介}</p>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  )}

  
      
    </div>
  );
};

export default ArtifactDisplay;
