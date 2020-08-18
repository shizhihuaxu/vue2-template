// 列表分页、多选
const tableListMixins = {
    data () {
        return {
            isSpinShow: false, // 是否展示 loading
            // 分页
            currentPage: 1, // 当前页码
            totalData: 0, // 数据总数
            pageSize: 20, // 分页 每页条数
            // 多选
            hasSelected: false, // 是否选中多选项
            checkedIds: new Set(), // 多选选中项,set 去重
            checkedSize: 0, // 解决 vue 无法监听 set 变化的问题， ids 长度
            // 筛选条件
            hasFilters: false, // 是否已筛选
            isFilterShow: false, // 是否显示筛选部分
            // 当前操作
            currentId: 0,
            currentOperation: 'add', // add,edit,view,delete
        }
    },
    watch: {
        // 选中项列表不为空时显示批量操作按钮
        checkedSize () {
            this.hasSelected = this.checkedSize !== 0
        },
    },
    methods: {
        // 全选
        handleSelectAll (selectedArr) {
            selectedArr.map(item => {
                this.checkedIds.add(item.id)
            })
            this.checkedSize = this.checkedIds.size // 更新
        },
        // 取消全选
        handleSelectAllCancle (tableRef) {
            const data = this.$refs[tableRef].data

            data.forEach((item) => {
                if (this.checkedIds.has(item.id)) {
                    this.checkedIds.delete(item.id)
                }
            })
            this.checkedSize = this.checkedIds.size // 更新
        },
        // 选中某一项
        handleSelect (selection, row) {
            this.checkedIds.add(row.id)
            this.checkedSize = this.checkedIds.size // 更新
        },
        // 取消选中某一项，为了兼顾全选后取消选中某一项，要从已选择的 arr 里删掉这一项，而不是直接使用已选中项
        handleSelectCancle (selection, row) {
            this.checkedIds.delete(row.id)
            this.checkedSize = this.checkedIds.size // 更新
        },
        /**
         * 清空列表选中项，用于导出所选后
         * @param { Object }  data  tableData
         * @return { Object }  dataCopy 为每一行数据加上 _checked = false
        */
        clearTableCheckedSatus (data) {
            // 清除选中状态
            const dataCopy = JSON.parse(JSON.stringify(data))
            dataCopy.map(item => {
                item._checked = false
            })

            return dataCopy
        },
        /**
         * 最后一页只有一条数据时，在编辑后需要刷新列表，修改某些字段某会对查询结果数量有影响，
         * 可能会导致页码减少一页或这不变(与删除不同。删除一定会导致 page 减少)，需要处理查询参数中的 page 字段
         * 需要减少 page 字段值的情况需要满足以下条件：
         *  1. 编辑的项是最后一页最后一项
         *  2. 编辑的字段在列表的筛选条件中
         *  2. 编辑的字段在筛选条件中的同一字段不为全部的含义（如果为全部不会对查询结果有影响）
         * 例如：
         * objA: {is_read: '', action: 1,status: 2} 查询参数
         * objB: {is_read: 2, action: 2 } 详情页改的数据
         * 如果 objB 字段在 objA 中，且 objA 中统一字段不为空，且两者不同，那么即为有变化
         * 只要 objB 中有一个与 objA 的字段不同即为不同
         *
         * is_read 的变化不影响
         * action 的变化有影响
         * 不检查 status 因为 objB 中没有 status
         * @param { Object } params   详情页修改的参数
         */
        handleIfLastPageLastOneEdit (params = {}) {
            if (!Object.keys(params).length) return

            // 如果此条数据在最后一页 且最后一页只有一条
            if (
                this.totalData % this.filterParams.page_size === 1 &&
                this.currentPage === Math.ceil(this.totalData / this.filterParams.page_size)
            ) {
                // 拷贝一份，不要影响原数据
                const filtersObj = JSON.parse(JSON.stringify(this.filterParams))
                const paramsObj = JSON.parse(JSON.stringify(params))

                // 去除筛选条件中的为空字符串的值， 空字符串表示筛选全部， 不会有影响
                for (const key in filtersObj) {
                    if (Object.prototype.hasOwnProperty.call(filtersObj, key) && filtersObj[key] === '') {
                        delete filtersObj[key]
                    }
                }

                // 判断 paramsObj 中的字段在 filtersObj相同字段值是否一致
                Object.keys(paramsObj).map((key) => {
                    if (filtersObj[key] !== '' && paramsObj[key] !== filtersObj[key]) {
                        this.currentPage = this.currentPage - 1 || 1
                        this.filterParams.page = this.currentPage
                    }
                })
            }
        },
        // 当最后一页只有一条数据，删除后，重置分页参数
        handleIfLastPageLastOneDelete () {
            if (this.totalData % this.filterParams.page_size === 1 &&
                this.currentPage === Math.ceil(this.totalData / this.filterParams.page_size)
            ) {
                this.currentPage = this.currentPage - 1 || 1
                this.filterParams.page = this.currentPage
            }
        },
    },
}

export default tableListMixins
