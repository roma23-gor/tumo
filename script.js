
function setup() {
    createCanvas(400, 600);
    Game.addBalloon()
}

function draw() {
    background('skyblue');
    for(let balloon of Game.balloons)
    {
        balloon.display()
        balloon.move(Game.coins)
        if (balloon.y <= balloon.size / 2 && balloon.color != 'black' && balloon.color != 'gold' ) {
            noLoop()
            Game.balloons.splice(0,Game.balloons.length);
            let coins = Game.coins
            Game.coins = ''
            Game.mir = ''
            background(136,220,166)
            fill('white')
            textSize(64)
            textAlign(CENTER,CENTER)
            text('GameOver', 200, 200)
            textSize(32)
            text('Coins: '+ coins, 200,300)
        }
    }
    textSize(32)
    fill('black')
    text(Game.mir + Game.coins, x, 40)
    if (frameCount % 50 === 0) {
        Game.addBalloon()
    }
    if (frameCount % 200 === 0) {
        Game.addGoldBalloon()
    }
    if (frameCount % 100 === 0) {
        Game.addGreenBalloon()
    }
    if (frameCount % 60 === 0) {
        Game.addBlackBalloon()
    }
    
}
let x = 20
let Croog = 0
function mousePressed(){
    Game.Clike += 1;
    Game.CheckBalloon()
    if(!isLooping()){
        Game.countOfBlack = 0;
        Game.countOfBlue = 0;
        Game.countOfGold = 0;
        Game.countOfGreen = 0;
        Game.coins = 0
        Game.mir = 'Coins '
        ++Croog
        if(Croog == 1)
        {x += 60}
        loop()
        Game.Click = 0;

    }
}

let interval = setInterval(() => {
    Game.sendStatistics();
}, 5000);

class Game{
    static mir = 'Coins '
    static balloons = []
    static coins = 0
    static countOfBlue = 0
    static countOfGold = 0
    static countOfGreen = 0
    static countOfBlack = 0
    static Clike = 0

    static sendStatistics(){
        let stats = {
            coins: this.coins,
            countOfBlack: this.countOfBlack,
            countOfBlue: this.countOfBlue,
            countOfGold: this.countOfGold,
            countOfGreen: this.countOfGreen,
            clike: this.Clike,
        };

        fetch('/stats', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(stats)
        });
    }

    static addBalloon(){
        let ball = new Balloon('blue', 60)
        this.balloons.push(ball)
    }
    static addGoldBalloon(){
        let goldBall = new goldBalloon('gold', 30)
        this.balloons.push(goldBall)
    }
    static addGreenBalloon(){
        let greenBall = new greenBalloon('green', 40)
        this.balloons.push(greenBall)
    }
    static addBlackBalloon(){
        let blackBall = new blackBalloon('black', 50)
        this.balloons.push(blackBall)
    }
    static CheckBalloon(){
        this.balloons.forEach((balloon, index) => {
            let distance = dist(balloon.x, balloon.y, mouseX, mouseY)
            if (distance <= balloon.size / 2) {
                balloon.boom(index)
            }
        })
    }
}
class Balloon{
    constructor(color,size){
        this.x = random(width)
        this.y = random(height-10,height+50)
        this.color = color
        this.size = size
    }
    display(){
        fill(this.color)
        ellipse(this.x, this.y, this.size)
        line(this.x,this.y + this.size/2,this.x,this.y+2*this.size)
    }
    move(coins){
        this.y -= 1+((coins/100)*0.25)
        
    }
    boom(index){
        Game.balloons.splice(index, 1)
        Game.coins +=1
        Game.countOfBlue +=1
    }
}
class goldBalloon extends Balloon{
    constructor(color, size){
        super(color, size)
    }
    boom(index){
        Game.balloons.splice(index, 1)
        Game.coins +=20
        Game.countOfGold += 1
    }
}
class greenBalloon extends Balloon{
    constructor(color, size){
        super(color, size)
    }
    boom(index){
        Game.balloons.splice(index, 1)
        Game.coins +=10
        Game.countOfGreen += 1
    }
}
class blackBalloon extends Balloon{
    constructor(color, size){
        super(color, size)
    }
    boom(index){
        Game.balloons.splice(index, 1)
        Game.coins -=10
        Game.countOfBlack +=1
    }
}