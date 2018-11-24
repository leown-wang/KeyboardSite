//初始化数据
var keys = {
    '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
    '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
    '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
    'length': 3
}
var hash = {'q': 'www.qq.com', 'w': 'weibo.com', 'g': 'github.com', 'b': 'baidu.com', 'e': 'www.ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': undefined,  's': 'sohu.com', 'z': 'zhihu.com',
}
var hashInLocalStorage = JSON.parse(localStorage.getItem('userHash') || 'null')
var listenKeypress = true
if(hashInLocalStorage){
    hash = hashInLocalStorage
}
//初始化键盘
var mainInner = document.createElement("div")
mainInner.className = 'mainInner'
main.appendChild(mainInner)

for (let i = 0; i < keys.length; i++) {
    var row = document.createElement("div")
    row.className = 'row'
    mainInner.appendChild(row)
    for (let j = 0; j < keys[i].length; j++) {
        var key = document.createElement("div")
        key.className = 'key'
        key.textContent = keys[i][j].toUpperCase()
        row.appendChild(key)

        var img = document.createElement("img")
        if (hash[keys[i][j]] && !undefined) {
            img.src = 'http://'+ hash[keys[i][j]] + '/favicon.ico'
        }else {
            img.style.display = 'none'
        }
        img.onerror = function (e) {
           e.target.style.display = 'none'
        }
        key.appendChild(img)
        key.onclick = function (e) {
           if(hash[e.target.firstChild.textContent.toLowerCase()]&&!undefined)
            window.open('https://'+hash[e.target.firstChild.textContent.toLowerCase()],'_blank')
        }
        var edit = document.createElement("div")
        edit.className = 'edit'
        edit.textContent = 'edit'
        edit.onclick = function (e){
            e.stopPropagation()
            var website = prompt('修改 '+keys[i][j].toUpperCase() +' 键关联的网址为')
            if (website != null && website != '') {
                hash[keys[i][j]] = website
                e.target.previousSibling.src = 'http://'+ hash[keys[i][j]] + '/favicon.ico'
                e.target.previousSibling.style.display = 'inline'
            }
            localStorage.setItem('userHash', JSON.stringify(hash))
        }
        key.appendChild(edit)
    }
}
var imgIndex = Math.floor(Math.random() * 3) + 1
document.body.style.backgroundImage = 'url(image/' + imgIndex + '-min.jpg)'

//监听键盘
window.onkeypress = function (e) {
    if(hash[e.key]&& !undefined&&listenKeypress){
        window.open('https://'+hash[e.key],'_blank')
    }
}

searchBox.onfocus = function (e) {
    listenKeypress = false
}
searchBox.onkeypress = function (e) {

    if (e.key === 'Enter'){
       window.open('http://www.google.com/search?q='+searchBox.value)
        searchBox.value = ''
    }
}
searchBox.onblur = function (e) {
    listenKeypress = true

}