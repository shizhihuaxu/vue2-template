<template>
    <!-- 嵌套的表单校验 -->
    <div class='page'>
        <Form
            :model='modeInfo'
            :label-width='70'
        >
            <FormItem label='模式选择：'>
                <RadioGroup
                    v-model='modeInfo.mode'
                    @on-change='toggleMode'
                >
                    <Radio label='bridge'>bridge</Radio>
                    <Radio label='route'>route</Radio>
                    <Radio label='mix'>mix</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem class='mb-0 wrapper-form-item'>
                <!-- 网口配置选择 -->
                <div class='port-checkbox-group'>
                    <Checkbox
                        v-for='(item, key) in modeInfo.args'
                        :key='key'
                        v-model='item.enabled'
                        @on-change='setPortsValidators'
                    >
                        {{ `${item.ports[0].name}-${item.ports[1].name}` }}
                    </Checkbox>
                </div>
                <!-- IP 配置 start-->
                <Form
                    v-show='modeInfo.mode !== "bridge" && hasCheckedPorts'
                    ref='portIPConfigForm'
                    :model='modeInfo'
                    :label-width='110'
                    class='config-port-ip-form'
                >
                    <div
                        v-for='(item, index) in modeInfo.args'
                        :key='index'
                        :class='{
                            "config-port-ip-item": item.enabled,
                            "config-port-ip-item-hidden": !item.enabled
                        }'
                    >
                        <!-- 网口选中时，输入一对网口的 ip -->
                        <FormItem
                            v-if='item.enabled'
                            :label='item.ports[0].name + " IP地址："'
                            :prop='"args." + index + ".ports[0].ip"'
                            :rules='ipValidator[index]'
                        >
                            <Input
                                v-model='item.ports[0].ip'
                                class='config-port-ip-input'
                                clearable
                                @on-change='checkPairedIP(index, 0)'
                                @on-blur='checkPairedIP(index, 0)'
                                @on-enter='saveModeSetting'
                            ></Input>
                        </FormItem>
                        <Icon
                            v-if='item.enabled'
                            custom='bl-icon-double-arrow'
                        />
                        <FormItem
                            v-if='item.enabled'
                            :label='item.ports[1].name + " IP地址："'
                            :prop='"args." + index + ".ports[1].ip"'
                            :rules='ipValidator[index]'
                        >
                            <Input
                                v-model='item.ports[1].ip'
                                class='config-port-ip-input'
                                clearable
                                @on-change='checkPairedIP(index, 1)'
                                @on-blur='checkPairedIP(index, 1)'
                                @on-enter='saveModeSetting'
                            ></Input>
                        </FormItem>
                    </div>
                </Form>
            <!-- IP 配置 end  -->
            </FormItem>
        </Form>
    </div>
</template>

<script>

export default {
    data () {
        return {
            hasCheckedPorts: false, // 是否选中了成对网口
            // 模式设置信息
            modeInfo: {
                mode: 'bridge', // bridge，route, mix
                args: [
                    // 当为 route 时,选中 了某对口，必须填这对口的两个 ip，未选中可传符合格式的 ip 或 null
                    {
                        enabled: false, // boolean
                        ports: [
                            { name: 'LAN1', ip: '' },
                            { name: 'LAN2', ip: '' },
                        ], // ip:string/null
                    },
                    {
                        enabled: true, // boolean
                        ports: [
                            { name: '扩展口3', ip: '' },
                            { name: '扩展口4', ip: '' },
                        ], // ip:string/null
                    },
                ],
            },
            ipValidator: [
                // { validator: this.validateCidrIP, trigger: 'blur' },
            ],
        }
    },
    watch: {
    // 判断是否选中网口，显示 IP 输入框
        modeInfo: {
            handler () {
                this.hasCheckedPorts = this.modeInfo.args.some(item => {
                    return item.enabled === true // 有一个为 true 表示有选中项
                })
            },
            deep: true,
        },
    },
    methods: {
        // 设置开启的成对端口的默认校验规则
        setPortsValidators () {
            const mode = this.modeInfo.mode
            this.ipValidator = []

            this.modeInfo.args.forEach(item => {
                // 只有 enabled 并且不为桥接模式时才添加校验
                if (item.enabled && mode !== 'bridge') {
                    const validatorObj = { trigger: 'blur' }

                    // 当为 mix 模式时可为空，route 模式时不可为空
                    validatorObj.validator = mode === 'mix' ? this.validateCidrIPWithNull : this.validateCidrIP

                    this.ipValidator.push(validatorObj)
                }
            })
        },
        // 切换路由模式,清空输入框于错误提示
        toggleMode () {
            this.getModeSettingInfo(true)
            this.$refs.portIPConfigForm.resetFields()
            this.setPortsValidators()
        },
        checkPairedIP (argsIndex, portsIndex) {
            if (this.modeInfo.mode === 'mix') {
                // 需要 trim 和判断 null
                const currentIP = this.modeInfo.args[argsIndex].ports[portsIndex].ip
                const pairedPortsIndex = portsIndex ? portsIndex - 1 : portsIndex + 1
                const pairedIP = this.modeInfo.args[argsIndex].ports[pairedPortsIndex]
                    .ip

                const hasCurrentIP = currentIP && String(currentIP).trim() !== ''
                const hasPairedIP = pairedIP && String(pairedIP).trim() !== ''

                // 成对的 ip 输入框内容只要有一个 ip 已经输入，另一个ip 必须输入
                if (hasCurrentIP || hasPairedIP) {
                    this.ipValidator[argsIndex].validator = this.validateCidrIP
                } else {
                    this.ipValidator[argsIndex].validator = this.validateCidrIPWithNull
                }

                // 校验成对的输入框
                this.$refs.portIPConfigForm.validateField(`args.${argsIndex}.ports[${portsIndex}].ip`)
                this.$refs.portIPConfigForm.validateField(`args.${argsIndex}.ports[${pairedPortsIndex}].ip`)
            } else {
                this.ipValidator[argsIndex].validator = this.validateCidrIP
            }
        },
    },
}
</script>
