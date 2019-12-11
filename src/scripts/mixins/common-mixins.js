const commonMixins = {
  methods: {
    // 处理响应状态码
    $_commonMixins_handleResStatus(res) {
      if (res.status === 400) {
        this.$Message.warning(res.data.detail)
        return false
      }
      if (
        res.status === 401
        || res.status === 403
      ) {
        this.$Message.error('未授权，请重新登录')

        // 未授权 跳转到登录页
        this.$router.push({
          path: '/login',
        })

        return false
      }

      return true
    },
  },
}

export default commonMixins
