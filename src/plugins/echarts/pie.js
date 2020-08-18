export const commonPieOptions = {
    color: [],
    tooltip: {
        show: false,
    },
    legend: {
        orient: 'vertical', // 图例方向
        icon: 'roundRect',
        right: 0,
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 15, // 上下间距
        textStyle: {
            color: '#333',
            fontSize: 12,
        },
        data: [],
    },
    series: [{
        type: 'pie',
        center: [], // 设置圆心位置
        radius: [], // 设置内外圆半径
        avoidLabelOverlap: false,
        label: {
            show: false,
            position: 'center',
        },
        // 饼状图中心显示百分比
        emphasis: {
            label: { //  饼图图形上的文本标签
                show: true,
                position: 'center',
                formatter: '{percent|{d}}%\n{name|{b}}', // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容
                // 设置文字样式
                rich: {
                    percent: {
                        fontSize: 32,
                        lineHeight: 42,
                    },
                    name: {
                        fontSize: 12,
                        color: '#333',
                        lineHeight: 20,
                    },
                },
            },
        },
        labelLine: {
            normal: {
                show: false,
            },
        },
        data: [],
    }],
}
