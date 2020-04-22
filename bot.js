// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client();

// トークンの用意
const token = 'ここにはbotのトークンが入ります';

// 準備完了イベントのconsole.logで通知黒い画面に出る。
client.on('ready', () => {
    console.log("ready...")
});

//-----------------------定義部分開始----------------------------
const scratchframe = 9;

const aprob = 0.2;
const hprob = 0.3;
const kprob = 0.5;

let countfifty = 0, countthirty = 0, counttwen = 0; //カウント用変数
const aoki = ["||<:aoki:680707598831321100>||","||<:aoki2:686612812847644682>||","||<:aoki3:686612969949495315>||","||<:aoki4:686614796019564651>||","||<:young_aoki:686613758176395308>||"]; //青木の画像格納庫
const kmr = ["||<:kmr:686189914219479057>||","||<:laugherkmr:701721926535479296>||","||<:laughkmr:701721784071749676>||","||<:staykmr:701721639234306058>||","||<:yuito:680700194291056651>||"] //kmrの画像格納庫
const hrt = ["||<:tarou2:686191732248936488>||","||<:FKHR:686191230417108992>||","||<:haraguti:680709245758734433>||","||<:HRT:686193640569307151>||"] //hrt,hkhr,太郎の画像格納庫
let randoms = [], scr = [], strname = [], scrans = [];
let inscrans = "", scrhit = "";
//-----------------------定義部分終了----------------------------

client.on('message', message => {    
    if(message.content === ".scr"){
        scrpicup(); //スクラッチに表示されるスタンプを選択
        scrprob();  //スクラッチの9個の要素をランダムに配置し、scrans[]に格納
        for(let m = 0; m<scrans.length; m++){   //正方形に要素を配置し、Discordのチャットに送信
            inscrans += scrans[m];              //横に要素を一定数配置
            if(((m + 1) % Math.sqrt(scrans.length)) === 0){
                inscrans += "\n"
            }
        }
        inscrans += `あなたはスクラッチで${scrhit}を獲得しました！\nおめでとうございます！`
        message.channel.send(inscrans);     //一定数の配置が終わったら画面に表示し、次の行にうつる
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
        if(x < (kprob)){　//50%でkmrが出る
            countfifty += 1;
        }else if(x < (kprob + hprob)){ //30%でhシリーズがでる
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

function scrprob(){                                 //ピックアップした画像を一定数複製する
    let assroop = Math.sqrt(scratchframe) - 1;
    for(let j = 0; j < assroop; j++){
        for(let k = 0; k < scr.length; k++){
            scrans.push(scr[k]);
        }
    }

    let x = Math.random();
    let scrindyuito = scrans.indexOf("||<:yuito:680700194291056651>||");        //yuitoとstaykmrがピックアップされたとき、どちらかが当選する確率を大きく上げる
    let scrindstaykmr = scrans.indexOf("||<:staykmr:701721639234306058>||");
    if(scrindyuito != -1 && scrindstaykmr != -1 && x < 0.85){
        let y = rand(0,1);
        if(rand == 0){
            scrans.push("||<:yuito:680700194291056651>||");
            scrhit = "||<:yuito:680700194291056651>||";
        }else{
            scrans.push("||<:staykmr:701721639234306058>||");
            scrhit = "||<:staykmr:701721639234306058>||";
        }
    }else if(scrindyuito != -1 && scrindstaykmr == -1 && x < 0.85){
        scrans.push("||<:yuito:680700194291056651>||");
        scrhit = "||<:yuito:680700194291056651>||";
    }else if(scrindstaykmr != -1 && scrindyuito == -1 && x < 0.85){
        scrans.push("||<:staykmr:701721639234306058>||");
        scrhit = "||<:staykmr:701721639234306058>||";
    }else{
        scrrand = rand(0, scr.length-1);
        scrans.push(scr[scrrand]);
        scrhit = scr[scrrand];
    }

    let scrlength = scrans.length;
    let temp = 0, l = 0;
    while (scrlength) {
        l = Math.floor(Math.random() * scrlength--);    //ランダムに並び替える
        temp = scrans[scrlength];
        scrans[scrlength] = scrans[l];
        scrans[l] = temp;
    }
}

// Discordへの接続
client.login(token);
