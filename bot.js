// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// トークンの用意
const token = 'NzAwMjY0MzU0NDk4NDc4MDk3.XpkE9A.Xk8pg2nNGTeEm_Lhu51baxbI1Uc';

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    console.log('ready...');
});

//-----------------------定義部分開始----------------------------
const scratchframe = 9;

const aprob = 0.2;
const hprob = 0.3;
const kprob = 0.5;

let countfifty = 0, countthirty = 0, counttwen = 0; //カウント用変数
const aoki = [":grinning:",":cry:",":smile:",":grin:",":laughing:"]; //青木の画像格納庫
const kmr = [":sweat_smile:",":joy:",":rofl:",":relaxed:",":blush:"] //kmrの画像格納庫
const hrt = [":innocent:",":slight_smile:",":upside_down:",":wink:"] //hrt,hkhr,太郎の画像格納庫
let randoms = [], scr = [], strname = [], scrans = [];
let inscrans = "";
//-----------------------定義部分終了----------------------------

client.on('message', message => {    
    if(message.content === ".scr"){
        scrpicup(); //スクラッチに表示されるスタンプを選択
        scrprob();  //スクラッチの9個の要素をランダムに配置し、scrans[]に格納
        for(let m = 0; m<scrans.length; m++){   //正方形に要素を配置し、Discordのチャットに送信
            inscrans += scrans[m];              //横に要素を一定数配置
            if(((m + 1) % Math.sqrt(scrans.length)) === 0){
            message.channel.send(inscrans);     //一定数の配置が終わったら画面に表示し、次の行にうつる
                inscrans = "";
            }
        }
        countfifty = 0, countthirty = 0, counttwen = 0;　//各種変数をクリアする
        randoms = [], scr = [], strname = [], scrans = [];
        inscrans = "";
    }
});



function rand(num1, num2){
    return Math.floor(Math.random()*(num2 - num1 + 1) + num1);
}

function nonduprand() { //randams[]にcountに入った数の乱数を重複なしで格納する
    if(randoms.length!=0){
        randoms = [];
    }
    while(count > 0){
        let tmp = rand(0, strname.length -1);
        if(!randoms.includes(tmp)){
            randoms.push(tmp);
            count -= 1;
        }
    }
}

function randprob(){ //スクラッチから出る物の確率によってそれぞれを引き出す
    let scrroop = Math.sqrt(scratchframe) + 1; //抽選回数を算出 //9枠なら4回、16枠なら5回
    for(let i = 0; i<scrroop; i++){ //抽選
        let x = Math.random();
        if(x < (1 - kprob)){　//50%でkmrが出る
            countfifty += 1;
        }else if(x < (1 - (kprob + hprob))){ //30%でhシリーズがでる
            countthirty += 1;
        }else{ //20%で青木が出る
            counttwen += 1;
        }
    }
}

function scrpicup(){
    randprob();
    if(countfifty > 0){
        strname = kmr;
        count = countfifty;
        nonduprand();
        for(let kcount = 0; kcount < randoms.length; kcount++){ //randams[]にある要素の数だけ繰り返し
            scr.push(kmr[randoms[kcount]]); //randoms[]に入っている値のアドレスにあるkmrの画像をscr4[]に格納
        }                                                       //以下同様
    }
    if(countthirty > 0){
        strname = hrt;
        count = countthirty;
        nonduprand();
        for(let hcount = 0; hcount < randoms.length; hcount++){
            scr.push(hrt[randoms[hcount]]);
        }        
    }
    if(counttwen > 0){
        strname = aoki;
        count = counttwen;
        nonduprand();
        for(let acount = 0; acount < randoms.length; acount++){
            scr.push(aoki[randoms[acount]]);
        }
    }
}

function scrprob(){
    let assroop = Math.sqrt(scratchframe) - 1;
    for(let j = 0; j < assroop; j++){
        for(let k = 0; k < scr.length; k++){
            scrans.push(scr[k]);
        }
    }
    scrrand = rand(0, scr.length-1);
    scrans.push(scr[scrrand]);
    
    let scrlength = scrans.length;
    let temp = 0, l = 0;
    while (scrlength) {
        l = Math.floor(Math.random() * scrlength--);
        temp = scrans[scrlength];
        scrans[scrlength] = scrans[l];
        scrans[l] = temp;
    }
}

// Discordへの接続
client.login(token);