export const commonLineOptions = {
    color: [],
    // 坐标轴位置
    grid: {
        x: 40, // x 轴左侧到容器左边距离
        y: 10, // y 轴上方到容器顶端距离
        x2: 30, // x 轴右侧侧到容器右边距离
        y2: 70, // y 轴下方到容器低端距离
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        // 边框阴影
        extraCssText: 'box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);',
        textStyle: {
            color: '#333',
        },
        axisPointer: { // 坐标轴指示器
            lineStyle: {
                color: '#d8d8d8',
            },
        },
        // 将多个 series 的数据节点的单位体现出来
        formatter (params) {
            const {
                axisValueLabel,
            } = params[0]

            let elem = ''

            // value[2] 为带单位的数值
            params.map(item => {
                elem = `${elem}
                        <div style="font-size: 14px;margin-top: 10px;">
                            ${item.marker} ${item.seriesName}: ${item.value[2]}
                        </div>`
            })

            // 加上横坐标标名的数据项名称
            elem = `<div style="padding: 10px 16px;">
                        <div style="font-size: 18px;">${axisValueLabel}</div>
                        ${elem}
                    </div>`

            return elem
        },
        // 将多个 series 的数据节点的单位体现出来
        // formatter (params) {
        //     const {
        //         axisValueLabel,
        //         value,
        //     } = params[0]

        //     return `<div style="padding: 10px 16px;">
        //                 <div style="font-size: 18px;">${axisValueLabel}</div>
        //                 <div style="font-size: 14px;margin-top: 10px;">${seriesName}：${value[1]}%</div>
        //             </div>`
        // },
    },
    xAxis: {
        show: false,
        type: 'time',
        boundaryGap: false,
        // 去掉纵坐标刻度线
        axisTick: {
            show: false,
        },
        // 坐标轴字体色
        axisLabel: {
            color: '#999',
        },
        splitLine: {
            show: false,
        },
        // 坐标轴线颜色
        axisLine: {
            lineStyle: {
                color: '#d8d8d8',
            },
        },
    },
    yAxis: {
        type: 'value',
        minInterval: 1, // 纵坐标不可为小数
        // 去掉纵坐标刻度线
        axisTick: {
            show: false,
        },
        // 坐标轴字体颜色
        axisLabel: {
            color: '#999',
        },
        // 纵轴的水平分割线
        splitLine: {
            show: true,
            lineStyle: {
                color: '#d8d8d8',
            },
        },
        axisLine: {
            show: false,
        },
    },
    legend: {
        left: 40, // 跟横坐标开始位置对齐
        bottom: 16,
        padding: [0, 0],
        icon: 'roundRect',
        itemGap: 34,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
            color: '#333',
            fontSize: 12,
        },
        data: [], // 图例分类
    },
    series: [
        {
            name: '分类名称',
            type: 'line',
            areaStyle: { // 渐变区域填充样式
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#666', // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#dcdcdc', // 100% 处的颜色
                        }],
                        globaCoord: false,
                    },
                },
            },
            data: [], // 数据
        },
    ],
}
