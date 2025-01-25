import React from "react";
import { Card } from "antd";

const ArtifactCard = ({ artifact }) => {
  return (
    <Card
      style={{
        width: "200px",
        borderRadius: "10px",
        margin: "auto",
        textAlign: "center",
      }}
      cover={<img src={artifact.图片url} alt={artifact.名称} />}
    >
      <h3>{artifact.名称}</h3>
      <p>{artifact.简介}</p>
    </Card>
  );
};

export default ArtifactCard;