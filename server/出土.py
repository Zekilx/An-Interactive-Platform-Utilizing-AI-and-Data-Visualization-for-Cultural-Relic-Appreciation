import json

# 使用相对路径加载 JSON 数据
with open("server/excavated_items.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 其余代码保持不变
nodes = set()
links = []

for item in data:
    name = item["名称"]
    excavation_year = item["出土年限"]
    
    # 提取朝代信息
    dynasty = name.split("】")[0].replace("【", "") if "】" in name else "未知朝代"

    # 添加出土年限、朝代、名称节点
    nodes.add(excavation_year)
    nodes.add(dynasty)
    nodes.add(name)
    
    # 创建链接
    if excavation_year:
        links.append({"source": excavation_year, "target": dynasty, "value": 1})
    links.append({"source": dynasty, "target": name, "value": 1})

# 将结果转换为字典格式
nodes_list = [{"name": node} for node in nodes]
output_data = {
    "nodes": nodes_list,
    "links": links
}

# 将结果保存为 JSON 文件
with open("server/sankey_data.json", "w", encoding="utf-8") as outfile:
    json.dump(output_data, outfile, ensure_ascii=False, indent=4)

print("数据已成功生成！节点和链接已保存到 'server/sankey_data.json'")
