import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Card } from "antd";
import { CloseOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";
import "./ChatBot.css"; // 自定义样式

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (input.trim() === "") return;
        
        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5001/api/ask-question", {
                promptText: input,
            });
            const botResponse = response.data.choices[0]?.message?.content || "抱歉，我不理解您的问题。";

            setMessages([...messages, userMessage, { role: "bot", content: botResponse }]);
        } catch (error) {
            setMessages([...messages, { role: "bot", content: "发生错误，请稍后再试。" }]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="chatbot-container">
            <Button
                type="primary"
                shape="circle"
                icon={<MessageOutlined />}
                size="large"
                className="chatbot-button"
                onClick={toggleChatbot}
            />
            {isOpen && (
                <Card className="chatbot-window" title="AI Assistant" bordered={false}>
                    {/* 关闭按钮 */}
                      <Button
                        className="close-button"
                        shape="circle"
                        icon={<CloseOutlined />}
                        onClick={toggleChatbot}
                        size="large"
                    />
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <p key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </p>
                        ))}
                        {loading && <p className="message bot">...</p>}
                    </div>
                    <Input
                        style={{ marginTop: 0 }} 
                        placeholder="Please enter the questions..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSendMessage}
                        addonAfter={<Button type="primary" icon={<SendOutlined />}  loading={loading}  onClick={handleSendMessage}></Button>}
                    />
                </Card>
            )}
        </div>
    );
};

export default ChatBot;
