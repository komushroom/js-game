
// 캔버스 세팅

let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,gameOverImage,enemyImage;
let gameOver=false // true 이면 게임이 끝남, false이면 게임이 안끝남
let score =0


function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src='images/background.game.png'
    
    spaceshipImage = new Image();
    spaceshipImage.src='images/spaceship.png'

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png"

    gameOverImage = new Image();
    gameOverImage.src = "Images/gameOver.png";

    enemyImage = new Image();
    enemyImage.src='images/enemy.png';
}

// 우주선 좌표
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64

let bulletList = [] // 총알들을 저장하는 리스트 

function Bullet(){ 
    this.x = 0
    this.y = 0 
    this.init = function(){
        this.x = spaceshipX +20;  
        this.y = spaceshipY;
        this.alive=true //true면 살아있는 총알 false면 쓰인 총알 

        bulletList.push(this); 
        console.log(spaceshipY)
    };
    this.update = function(){
        
    //    if(this.y>=7){
        // this.y-=7  ;
    //    }

    //    if(this.alive>= 700){
    //     this.alive-=700;
    //     this.alive.remove()
    //    }

    //    if(this.y<=7){
    //     // this.y-=7
    //     gameOver = true;
    //    }

    this.y-=7

    if(this.y<=0){
        this.alive = false; 
    }    
}    


    
    this.checkHit=function(){
            //총알.y <= 적군.y And 
            //총알.x >= 적군.x and 총알.x <= 적군 + 적군의 넓이 
        for(let i=0; i < enemyList.length;i++){
            if(
                this.y <=enemyList[i].y && 
                this.x >=enemyList[i].x && 
                this.x <=enemyList[i].x + 40
               
                ) {
                // 총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득 
            score++;
            this.alive = false; //쓴 총알 
            enemyList.splice(i,1);
            console.log(this.alive);
            };
        };
    };
}


function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList = []

function Enemy(){
    this.x=0;
    this.y=0;
    this.init = function(){
        this.y=0
        this.x=generateRandomValue(0,canvas.width-48)
        enemyList.push(this)
    };
    this.update=function(){
        this.y +=3; //적군의 속도 3

    if (this.y >= canvas.height -48){
        gameOver = true;
    }    
    };
}



let keysDown = {}
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] = true
        
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]
        
        if(event.keyCode == 32){

            createBullet()

        }
    });
    // document.addEventListener('click', () => {
    //     if(event.click){
    //         this.alive = true
    //         createBullet()
    //     }
    //   });
}



function createBullet(){
    console.log("총알생성")
    let b = new Bullet()
    b.init()
    console.log("새로운총알")
    console.log(b)
}
 
function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    },1000) //시간 1000
}

function update(){
    if(39 in keysDown) {
        spaceshipX +=5;  
    
    } //right
    if(37 in keysDown){
        spaceshipX -= 5
    }
    if(spaceshipX <=0){
        spaceshipX=0;
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64;
    }

    //총알의 y좌표 업데이트하는 함수 호출 
    for(let i=0; i < bulletList.length;i++){
        if(bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        } 
    }
    
    for(let i=0; i<enemyList.length;i++){
        enemyList[i].update();
    }

}


function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width , canvas.height);
    ctx.drawImage(spaceshipImage , spaceshipX , spaceshipY )
    ctx.fillText(`Score:${score}`,15,30)
    ctx.fillStyle = "white"
    ctx.font = "20px Arial";
    for(let i=0;i < bulletList.length; i++) {
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage , bulletList[i].x, bulletList[i].y );  
        }
    }

    for(let i=0; i < enemyList.length; i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y)
    }
    
}

function main(){
    if(!gameOver){
        update(); //좌표값을 업데이트하고
        render(); // 그려주고
        requestAnimationFrame(main)
    }else{
        ctx.drawImage(gameOverImage,10,100,380,380);
    }

    
    
}
loadImage();
setupKeyboardListener();
createEnemy();
main();





//bullet (총알) 
//enemy (적군)
//spaceship (비행기)
 






// 방향키를 누르면 
//우주선의 xy 좌표가 바뀌고
//다시 render 그려준다 

// 총알만들기  
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x 값은? 스페이스 를 누른 순가느이 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장을 한다 
// 4. 총알들은 x,y 좌표값이 있어야 한다 
// 5. 총알 배열을 가지고 render 그려준다

// 적군만들기  
//  x,y ,init ,update
// 적군은 위치가 랜덤하다 
// 적군은 밑으로 내려온다 
// 1초마다 하나씩 적군이 나온다 y좌표가 증가한다
// 적군의 우주선이 바닥에 닿으면 게임오버 
// 적군과 총알이 만나면 우주선이 사라진다 점수 1점획득 

