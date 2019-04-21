const http = require('http')
const request = require('request')

const hostname = '127.0.0.1'
// 因为我电脑这两个端口被占用了。所以换了两个。可以自己随便更改
const port = 8020
const imgPort = 8021

// 文本代理
const textServer = http.createServer((req, res) => {
  // 新的知乎日报api。之前的出问题了
  const url = 'http://daily.zhihu.com/api/4' + req.url
  const options = {
    url: url
  }

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      // utf-8保证中文显示
      res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
      // 跨域设置。允许所有跨域
      res.setHeader('Access-Control-Allow-Origin', '*')
      // 返回内容
      res.end(body)
    }
  }
  request.get(options, callback)
})
// 监听文本端口
textServer.listen(port, hostname, () => {
  console.log(`textServer run at http://${hostname}:${port}/`)
})
// img代理
const imgServer = http.createServer((req, res) => {
  const url = req.url.split('/img/')[1]
  const options = {
    url: url,
    encoding: null
  }

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      const contentType = response.headers['content-type']
      res.setHeader('Content-Type', contentType)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(body)
    }
  }
  request.get(options, callback)
})
// 监听图片端口
imgServer.listen(imgPort, hostname, () => {
  console.log(`imgServer run at http://${hostname}:${imgPort}/`)
})
