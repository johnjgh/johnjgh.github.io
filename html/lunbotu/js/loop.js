var jsBox = document.getElementById('box')
var jsPic = document.getElementById('pic')
var jsLeft = document.getElementById('left')
var jsRigth = document.getElementById('right')
var jslistArr = document.getElementsByTagName('li')

jslistArr[0].style.backgroundColor = 'red'
jsLeft.style.display = 'none'
jsRigth.style.display = 'none'

var currentPage = 1
var timer = setInterval(startLoop,2000)
function startLoop() {
    currentPage++
    changepage()
}
function changepage() {
    if (currentPage == 9){
        currentPage = 1
    }else if (currentPage == 0){
        currentPage = 8
    }
    jsPic.src = 'img/' + currentPage +'.jpg'
    jsPic.parentElement.href = '#' + currentPage
    for(var i = 0; i < jslistArr.length; i++){
        jslistArr[i].style.backgroundColor = '#aaa'
    }
    jslistArr[currentPage-1].style.backgroundColor = 'red'
}

jsBox.addEventListener('mouseover', function () {
    jsLeft.style.display = 'block'
    jsRigth.style.display = 'block'
    clearInterval(timer)
},false)
jsBox.addEventListener('mouseout', function () {
    jsLeft.style.display = 'none'
    jsRigth.style.display = 'none'
    timer = setInterval(startLoop,2000)
},false)

jsLeft.addEventListener('mouseover', deep,false)
jsRigth.addEventListener('mouseover', deep, false)
function deep(){
    this.style.backgroundColor = "rgba(0,0,0,0.6)"
}
jsLeft.addEventListener('mouseout', notdeep,false)
jsRigth.addEventListener('mouseout', notdeep, false)
function notdeep(){
    this.style.backgroundColor = "rgba(0,0,0,0.2)"
}

jsLeft.addEventListener('click',function () {
    currentPage--
    changepage()
},false)
jsRigth.addEventListener('click',function () {
    currentPage++
    changepage()
},false)

for (var i = 0; i < jslistArr.length; i++){
    jslistArr[i].index = i + 1
    jslistArr[i].addEventListener('mouseover', function () {
        currentPage = parseInt(this.index)
        changepage()
    },false)
}