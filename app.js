/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/





var scores, roundScore, activePlayer,gamePlaying;



init();
/*
function rollBtn() {
    //do something
}
rollBtn();

document.querySelector('.btn-roll').addEventListener('click',rollBtn) //这里的rollBtn是回调函数。不加()是因为我们不想要在这里执行函数，我们想要click动作去执行函数
//callback function: the function is not called by us, but by other function
*/


//下面的function叫匿名函数。can not be reused
document.querySelector('.btn-roll').addEventListener('click',function(){
    if (gamePlaying) {
        //1 产生一个随机数字
    var dice = Math.floor(Math.random() * 6 + 1) //思考为什么要dice变量写在这里，而不放在globalcontext. 为什么sorce,roundsource要放在globalcontext

    //2 显示图像
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png'; //忘记加png了刷了半天不显示图像。傻！

    //3 做加法。但当随机数字是1的时候，加法归0
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
    } 

    
    
}) 

    document.querySelector('.btn-hold').addEventListener('click', function(){
        if (gamePlaying){
                   //1 做加法
        scores[activePlayer] += roundScore;

        //2 显示
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        

        //达到100以后win
        if (scores[activePlayer] >= 20) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
        } else {
            nextPlayer();
        }

        }      
})




function nextPlayer() {
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    
    //下面这段代码错误的原因在于，只对1个activePlayer进行了toggle!!
    //document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //在建立nextPlayer函数之前，我用了下面这段代码。提出函数之后，这段代码不会被执行。因为在scope chain之外了。
    //diceDom.style.display = 'none';

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    //dice = Math.floor(Math.random() * 6 + 1); 
    //document.querySelector('#current-1').textContent = dice; //math要大写！！
    
    document.querySelector('.dice').style.display = 'none'; // 忘记加引号了
    
    
    //除了querySelector,我们还可以通过getElementById的方法来获取id。这样会更快。
    //把html里的数字变为0。
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    //如果我们不先remove再add的话，当player1是active的时候结束，就会有两个active存在了！！
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    }