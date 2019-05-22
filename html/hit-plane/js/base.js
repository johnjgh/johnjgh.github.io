var mainScreen = document.getElementById('mainscreen')
var bg1 = document.getElementById('bg1')
var bg2 = document.getElementById('bg2')
var airPlane = document.getElementById('airplane')
var startGame = document.getElementById('start')
var Score = document.getElementById('score')
var gameOver = document.getElementById('gameover')
var reStart = document.getElementById('restart')
var Audio = document.getElementById('music')
var alltimer = {}


//开始游戏就调用各个定时器和事件监听器
startGame.addEventListener('click', function () {
    startGame.style.display = 'none'
    Score.style.display = 'block'
    airPlane.style.display = 'block'
    move()
}, false)

//重新开始游戏
reStart.addEventListener('click',function () {
    recover()
    move()
}, false)

//结束游戏
gameOver.addEventListener('click', function () {
    startGame.style.display = 'block'
    Score.style.display = 'none'
    airPlane.style.display = 'none'
    recover()
}, false)

//开启定时器和事件监听器
function move() {
    Audio.play()
    alltimer['timerbg'] = setInterval(bg, 10)
    airPlane.addEventListener('click',plane, false)
    alltimer['timerBullet'] = setInterval(Bullet, 300)
    alltimer['timerEnemy'] = setInterval(Enemy, 400)
    alltimer['timerattach'] = setInterval(attach, 50)
    alltimer['timerdeath'] = setInterval(death, 50)
}

//将所有标签归回原位
function recover() {
    gameOver.style.display = 'none'
    reStart.style.display = 'none'
    //将飞机归回原位
    airPlane.style.left = '201.5px'
    airPlane.style.top = '650px'
    var bl = document.getElementsByClassName('bullet')
    var en = document.getElementsByClassName('enemy')
    //将屏幕上的飞机和敌人清空（注：此处得到的bl和en是包含文本节点的，要删除所有节点时需采用从后往前删的方法）
    for (var i = bl.length - 1; i >= 0; i--){
        mainScreen.removeChild(bl[i])
    }
    for (var j = en.length - 1; j >= 0; j--){
        mainScreen.removeChild(en[j])
    }
    //将分数清空
    Score.firstElementChild.innerHTML = '0'
    Audio.load()
}

//让背景图动起来
function bg() {
    bg1.style.top = bg1.offsetTop + 1 + 'px'
    bg2.style.top = bg2.offsetTop + 1 + 'px'
    if (bg1.offsetTop >= 768) {
        bg1.style.top = '-768px'
    }
    if (bg2.offsetTop >= 768) {
        bg2.style.top = '-768px'
    }
}

//让飞机能被点击并移动
function plane(e) {
    var ec = e || window.event
    basex = ec.pageX
    basey = ec.pageY
    movex = 0
    movey = 0
    mainScreen.addEventListener('mousemove',moveplane, false)
}
//让飞机随鼠标移动
function moveplane(e) {
    var em = e || window.event
    movex = em.pageX - basex
    basex = em.pageX
    movey = em.pageY - basey
    basey = em.pageY
    airPlane.style.left = airPlane.offsetLeft + movex + 'px'
    airPlane.style.top = airPlane.offsetTop + movey + 'px'
}

//让飞机产生子弹
function Bullet() {
    var bullet = document.createElement('div');
    mainScreen.appendChild(bullet)
    bullet.className = 'bullet'
    bullet.style.left = airPlane.offsetLeft + 52 + 'px';
    bullet.style.top = airPlane.offsetTop - 10 + 'px';
    document.getElementById('bullet').play();
    //让子弹飞
    var timerBulletFly = setInterval(function () {
        bullet.style.top = bullet.offsetTop - 10 + 'px';
        if (bullet.offsetTop <= (-10)) {
            clearInterval(timerBulletFly);
            mainScreen.removeChild(bullet);
        }
    }, 50);
    bullet.timer = timerBulletFly;
    alltimer['timerBulletFly'+timerBulletFly] = timerBulletFly;
};

//产生敌人
function Enemy() {
    var enemy = document.createElement('div');
    enemy.className = 'enemy';
    mainScreen.appendChild(enemy);
    enemy.style.top = '0px';
    enemy.style.left = randomNum(0, 472) + 'px';
    //让敌人飞
    var timerEnemyFly = setInterval(function () {
        enemy.style.top = enemy.offsetTop + 10 + 'px';
        if (enemy.offsetTop >= 768) {
            clearInterval(timerEnemyFly);
            mainScreen.removeChild(enemy);
        }
    }, 50);
    enemy.timer = timerEnemyFly;
    alltimer['timerEnemyFly'+timerEnemyFly] = timerEnemyFly;
};

//子弹打到敌人
function attach() {
    var allbullets = document.getElementsByClassName('bullet')
    var allenemys = document.getElementsByClassName('enemy')
    for (var i = 0; i < allbullets.length; i++){
        for (var j = 0; j < allenemys.length; j++){
            var b = allbullets[i]
            var e = allenemys[j]
            if (attachFunc(b, e)) {
                clearInterval(b.timer)
                clearInterval(e.timer)
                mainScreen.removeChild(b)
                mainScreen.removeChild(e)
                document.getElementById('hit').play()
                Score.firstElementChild.innerHTML = parseInt(Score.firstElementChild.innerHTML) + 1
                break
            }
        }
    }
}

//敌人碰到飞机
function death() {
    var allenemys = document.getElementsByClassName('enemy')
    for (var i = 0; i < allenemys.length; i++){
        if (attachFunc(allenemys[i], airPlane)){
            //清除所有定时器
            console.log(alltimer)
            for (var each in alltimer) {
                clearInterval(alltimer[each])
            }
            //尽量不要用暴力清除定时器的方法
            // for (var j = 0; j < 500; j++) {
            //     clearInterval(j)
            // }
            gameOver.style.display = 'block'
            reStart.style.display = 'block'
            mainScreen.removeEventListener('mousemove', moveplane, false)
            airPlane.removeEventListener('click',plane, false)
            document.getElementById('over').play()
            Audio.pause()
        }
    }
}

//产生随机数
function randomNum(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

//碰撞检测
function attachFunc(obj1, obj2) {
    var obj1Left = obj1.offsetLeft;
    var obj1Right = obj1Left + obj1.offsetWidth;
    var obj1Top = obj1.offsetTop;
    var obj1Bottom = obj1Top + obj1.offsetHeight;

    var obj2Left = obj2.offsetLeft;
    var obj2Right = obj2Left + obj2.offsetWidth;
    var obj2Top = obj2.offsetTop;
    var obj2Bottom = obj2Top + obj2.offsetHeight;

    if (!(obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top >obj2Bottom)){
        return true
    }
    else {
        return false
    }
}


