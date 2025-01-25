import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ChuTu = () => {
    const chartRef = useRef(null); // 用于引用 DOM 元素
  
    useEffect(() => {
      if (chartRef.current) {
        const myChart = echarts.init(chartRef.current);
  
        const option = {
          backgroundColor: '#fff',
          title: {
            text: '文物出土',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          series: [
            {
              type: 'sankey',
              layout: 'none',
              emphasis: {
                focus: 'adjacency'
              },
              data: [
                {
                    "name": "【宋】小木塔"
                },
                {
                    "name": "【宋】盛真珠舍利宝幢内木函"
                },
                {
                    "name": "【宋】彩绘描金泥质观音立像（2尊）"
                },
                {
                    "name": "【宋】浮雕佛像石函"
                },
                {
                    "name": "【宋】五节石函"
                },
                {
                    "name": "【宋】铁莲瓣形佛龛"
                },
                {
                    "name": "晚唐～五代"
                },
                {
                    "name": "【宋】铜小金涂塔"
                },
                {
                    "name": "【宋】铁铸金涂舍利塔"
                },
                {
                    "name": "1980年"
                },
                {
                    "name": "未知年份"
                },
                {
                    "name": "1960年年"
                },
                {
                    "name": "【唐～五代】碧纸金书《妙法莲华经》"
                },
                {
                    "name": "【宋】铜如来佛坐像"
                },
                {
                    "name": "1960年"
                },
                {
                    "name": "1978年"
                },
                {
                    "name": "【宋】铁函"
                },
                {
                    "name": "【宋】真珠舍利宝幢"
                },
                {
                    "name": "1835"
                },
                {
                    "name": "【宋】木经箱"
                },
                {
                    "name": "【宋】雕版印刷《妙法莲华经》"
                },
                {
                    "name": "明 景泰"
                },
                {
                    "name": "【宋】琥珀印章"
                },
                {
                    "name": "唐～五代"
                },
                {
                    "name": "【宋】铜佛坐像"
                },
                {
                    "name": "【宋】陶碗形香炉"
                },
                {
                    "name": "【宋】石造像龛"
                },
                {
                    "name": "【宋】铜观音坐像（2尊）"
                },
                {
                    "name": "宋"
                },
                {
                    "name": "【宋】残石造像（3 件）"
                },
                {
                    "name": "【晚唐～五代】檀香木雕三连式佛龛（檀龛宝相）"
                },
                {
                    "name": "【清】蚰龙耳彝炉"
                },
                {
                    "name": "【宋】鎏金镂花包边楠木经箱"
                },
                {
                    "name": "清"
                },
                {
                    "name": "【宋】铜一佛二菩萨像"
                },
                {
                    "name": "【明 景泰】青花人物纹梅瓶"
                },
                {
                    "name": "【宋】小玉幢"
                },
                {
                    "name": "【宋】铜地藏菩萨坐像"
                }
              ],
              "links": [
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】木经箱",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】琥珀印章",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铁铸金涂舍利塔",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】陶碗形香炉",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "晚唐～五代",
                    "value": 1
                },
                {
                    "source": "晚唐～五代",
                    "target": "【晚唐～五代】檀香木雕三连式佛龛（檀龛宝相）",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】石造像龛",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜观音坐像（2尊）",
                    "value": 1
                },
                {
                    "source": "1960年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铁莲瓣形佛龛",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】小玉幢",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】小木塔",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "唐～五代",
                    "value": 1
                },
                {
                    "source": "唐～五代",
                    "target": "【唐～五代】碧纸金书《妙法莲华经》",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】残石造像（3 件）",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜一佛二菩萨像",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】彩绘描金泥质观音立像（2尊）",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜小金涂塔",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】木经箱",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】琥珀印章",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铁铸金涂舍利塔",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】陶碗形香炉",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "晚唐～五代",
                    "value": 1
                },
                {
                    "source": "晚唐～五代",
                    "target": "【晚唐～五代】檀香木雕三连式佛龛（檀龛宝相）",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】石造像龛",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜观音坐像（2尊）",
                    "value": 1
                },
                {
                    "source": "1960年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铁莲瓣形佛龛",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】小玉幢",
                    "value": 1
                },
                {
                    "source": "1980年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】小木塔",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "唐～五代",
                    "value": 1
                },
                {
                    "source": "唐～五代",
                    "target": "【唐～五代】碧纸金书《妙法莲华经》",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】残石造像（3 件）",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜一佛二菩萨像",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】彩绘描金泥质观音立像（2尊）",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜小金涂塔",
                    "value": 1
                },
                {
                    "source": "1960年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铁函",
                    "value": 1
                },
                {
                    "source": "1960年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】小木塔",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】真珠舍利宝幢",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】五节石函",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】浮雕佛像石函",
                    "value": 1
                },
                {
                    "source": "未知年份",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜地藏菩萨坐像",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】鎏金镂花包边楠木经箱",
                    "value": 1
                },
                {
                    "source": "1960年年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜佛坐像",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】盛真珠舍利宝幢内木函",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】雕版印刷《妙法莲华经》",
                    "value": 1
                },
                {
                    "source": "1978年",
                    "target": "宋",
                    "value": 1
                },
                {
                    "source": "宋",
                    "target": "【宋】铜如来佛坐像",
                    "value": 1
                },
                {
                    "source": "未知年份",
                    "target": "明 景泰",
                    "value": 1
                },
                {
                    "source": "明 景泰",
                    "target": "【明 景泰】青花人物纹梅瓶",
                    "value": 1
                },
                {
                    "source": "1835",
                    "target": "清",
                    "value": 1
                },
                {
                    "source": "清",
                    "target": "【清】蚰龙耳彝炉",
                    "value": 1
                }
              ],
              lineStyle: {
                color: 'source',
                curveness: 0.5
              },
              label: {
                color: 'rgba(0,0,0,0.7)',
                fontSize: 10
              }
            }
          ]
        };
  
        // 渲染图表
        myChart.setOption(option);
  
        // 在组件卸载时清理图表实例
        return () => {
          myChart.dispose();
        };
      }
    }, []);
  
    return (
      <div 
        ref={chartRef} // 绑定 ref
        style={{ display:'flex', 
                justifyContent:'center', 
                width: '100%', 
                height: '400px', marginTop:300,
                border:'2px solid #dfc9a1',
                borderRadius:100}} // 设置宽高，确保元素存在
      />
    );
  };
export default ChuTu;
