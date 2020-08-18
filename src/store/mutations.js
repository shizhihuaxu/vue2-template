import {
    setStore,
} from '@/scripts/utils'
import {
    SET_GROUPS,
} from './mutation-types'

export default {
    // 设置当前用户组别
    [SET_GROUPS] (state, group) {
        state.group = group
        setStore('group', group)
    },
}
