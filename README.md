# epz.js
https://github.com/axutebils74/EPZ
# 使用方法
var a = new EPZ( epzfile, [sync])
a.init([fn])
a.uint8(name,[fn])
a.array(name,[fn])
a.text(name,[fn])
a.blob(name,[fn])
a.base64(name,[fn])
a.arraybuffer(name,[fn])
# epzfile 
自动监测类型可以是 
base64，arraybuffer，uint8array，array，string，blob，url，bloburl
# sync 是否不使用同步，改为回调 
如果sync为undefined是自动推断
如果后面的方法传入了 fn 则为回调函数类型，如果未传入则为同步执行
参数值 false 或者 true
如果为 true 无论 fn 是否存在都是回调函数类型，不是同步的
如果为 false 无论 fn 是否存在都不会调用 fn，而且是同步的
# fn
回调函数
# name 
文件名 或者 第i个文件
# init
在调用 init 之后
a 会多出 arr 属性，obj 属性和，
text，blob，base64，array，uint8，arraybuffer 方法
# 注意事项
虽然不是必须，但是建议 epzfile 类型为 blob，url，bloburl 使用异步方法
最快是使用 uint8array ，同步