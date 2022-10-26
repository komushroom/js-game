var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

canvas.width=400;
canvas.height=700;

let score = 0;

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;



// img.width = '50px'
// img.height = '50px'


// var img2 = new Image();
// img2.src = 'img/dino.png' 



var dino = {
    x : 10,
    y : 200,
    width : 50,
    height  : 50,
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x,this.y, this.width,this.height);
        // ctx.drawImage(img2, this.x, this.y)
    }
}


// var img1 = new Image();
// img1.src = 'img/cactus.png' 

// function generateRandomValue(min,max){
//     let  randomCactus = Math.random(this.x)
// }


class Cactus {
    constructor(){
        this.x = 1000;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y, this.width,this.height);
        // ctx.drawImage(img1, this.x, this.y)
    }
}






var timer = 0;
var cactusSeveral = []; //cactus 여러개
var jumptime = 0;   // 점프timer
var animation;

// var jump 스페이스바 눌렀을때  y좌표 변함 

// 프레임마다 실행
function FrameStart(){
    animation = requestAnimationFrame(FrameStart);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(timer % 200 === 0){
        var cactus = new Cactus();
        cactusSeveral.push(cactus);
    }

    cactusSeveral.forEach((a,i,o)=>{
        //x좌표가 0미만이면 제거 
        if(a.x < 0){
            o.splice(i,1)
            
        }
        if(a.x == 0){
            score++;
        }

        ctx.fillText(`Score:${score}`,50,50 )
        ctx.font = "20px Arial";

        a.x-=1;  //속도

        impact(dino, a);


        a.draw();
    })
    if(jump == true){
        dino.y-=2;
        jumptime++;
    }

    if (jump == false){
        if(dino.y < 200){
            dino.y+=3;
        }
    }

    if (jumptime  > 80){
        jump = false;
        jumptime = 0
    }

    
    dino.draw()
}
console.log(jumptime)

FrameStart();
//충돌확인

function impact(dino, cactus){
    var  xd = cactus.x - (dino.x +dino.width);
    var  yd = cactus.y - (dino.y +dino.height);
    if(xd < 0 && yd < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}


var jump = false;
document.addEventListener('keydown',function(e){
    if (e.code === 'Space'){
        jump = true;
    }
})

document.addEventListener('click',function(e){
        jump = true;
})


reStartBtn.addEventListener('click', ()=>{

    start.innerHTML = ""; // 게임판 초기화
    init(); //새로운 게임 시작
    gameEnd.style.display = "none"; //종료창 제거
})






//18 // dino.x += 1;
// dino.draw()

//xd x축차이 yd y축차이 
// a = 장애물