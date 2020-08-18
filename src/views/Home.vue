<template>
    <div class='login-container'>
        <Form
            ref='loginForm'
            :model='loginInfo'
            :rules='formValidators'
        >
            <FormItem prop='username'>
                <Input
                    type='text'
                    class='username'
                    placeholder='请输入用户名'
                    v-model='loginInfo.username'
                    @on-enter='login'
                ></Input>
            </FormItem>
            <FormItem prop='password'>
                <Input
                    type='password'
                    placeholder='请输入密码'
                    :maxlength='16'
                    v-model='loginInfo.password'
                    @on-enter='login'
                ></Input>
            </FormItem>
        </Form>
        <Button
            type='primary'
            long
            class='login-btn'
            @click='login'
        >
            登 录
        </Button>
    </div>
</template>

<script>
// 引入工具函数
import { clearStore, checkUsername, checkPassword } from '@/scripts/utils'
// 引入 vuex
import { mapMutations } from 'vuex'

export default {
    data () {
        return {
            // 登录信息
            loginInfo: {
                username: '',
                password: '',
            },
            // 校验规则
            formValidators: {
                username: [{ validator: this.validateUsername, trigger: 'blur' }],
                password: [{ validator: this.validatePassword, trigger: 'blur' }],
            },
        }
    },
    mounted () {
        clearStore()
    },
    methods: {
        ...mapMutations(['SET_GROUPS']),
        // 校验用户名格式
        validateUsername (rule, value, callback) {
            checkUsername(value, callback)
        },
        // 校验密码格式
        validatePassword (rule, value, callback) {
            checkPassword(value, callback)
        },
        // 登录
        login () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // 检验通过
                    const params = this.$_globalMixins_trimParams(this.loginInfo)

                    this.$api.login(params).then(res => {
                        if (res && res.status === 200) {
                            const { group } = res.data

                            // 将当前角色类别存入 vuex
                            this.SET_GROUPS(group)
                            this.$router.push('/index')
                        }
                    })
                }
            })
        }, // login end
    }, // methods end
}
</script>

<style lang='scss'>
// 登录表单
.login-container {
    margin-left: 200px;
    border-radius: 4px;
    background-color: #fff;
}
// 登录表单
.login-form {
    padding: 0 48px 48px;
    // 登录按钮
    .login-btn {
        font-size: 16px;
        margin-top: 36px;
        @include height-lh(48px);
    }
}
</style>
