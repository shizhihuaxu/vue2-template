<template>
    <div id='app'>
        <div>
            <p>
                If ViewUI is successfully added to this project, you'll see an
                <code v-text='&apos;<Button>&apos;'></code>
                below
            </p>
            <Button type='primary'>Button</Button>
        </div>
        <HelloWorld msg='Welcome to Your Vue.js App' />
    </div>
</template>

<script>

export default {
    name: 'app',
    themeObj: {
        primary: '#079087',
        fontColor: '#333',
    },
    methods: {
        getFile (url, isBlob = false) {
            return new Promise((resolve, reject) => {
                const client = new XMLHttpRequest()
                client.responseType = isBlob ? 'blob' : ''
                client.onreadystatechange = () => {
                    if (client.readyState !== 4) {
                        return
                    }
                    if (client.status === 200) {
                        const urlArr = client.responseURL.split('/')
                        resolve({
                            data: client.response,
                            url: urlArr[urlArr.length - 1],
                        })
                    } else {
                        reject(new Error(client.statusText))
                    }
                }
                client.open('GET', url)
                client.send()
            })
        },
        // 更换主题文件
        writeNewStyle () {
            // 再把关键词变量替换成用户所选择的颜色值
            let cssText = this.originalStyle
            Object.keys(this.colors).forEach((key) => {
                cssText = cssText.replace(new RegExp(`(:|\\s+)${key}`, 'g'), `$1${this.colors[key]}`)
            })

            // 创建一个 style 标签追加到 head 中
            if (this.originalStylesheetCount === document.styleSheets.length) {
                const style = document.createElement('style')
                style.innerText = cssText
                document.head.appendChild(style)
            } else {
                document.head.lastChild.innerText = cssText
            }
        },
    },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
