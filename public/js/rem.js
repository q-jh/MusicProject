function remSize() {
    //获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    //获取字体的大小
    document.documentElement.style.fontSize = (deviceWidth/7.5)+'px'
    document.querySelector('body').style.fontSize = 0.3+'rem'

}
//当出口发送变化就会适配
window.onresize = function () {
    remSize()
}
