//functions - add modularity to better locate commands and code
//create function - puts user into database with base stats.
const settings = require('./settings.json');
const wolfram = require('wolfram').createClient(settings.wolframA);
const fortnite = require('fortnite');
const fn = new fortnite(settings.fortnite);
const giphy = require('giphy-api')(settings.giphy);
const table = require('text-table');
const help = [
'!musichelp - for music help',
'!math - Returns answer to equation specified',
'!roll - Rolls a random number between 1 and 6 if no max is given',
'!gif - Generates a gif on the specified topic',
'!fnstats - Returns stats of specified player'
];

module.exports = {
  
  math: function(message){		
    let equation = message.content.replace(new RegExp('.*' + "!math"), '');
    wolfram.query(equation, function(err, result) {
      if(err){message.reply("Please input function");}
      else{let p = JSON.parse(JSON.stringify(result));		
      message.reply(p[1].subpods[0].value);}
    })       
  },

  roll: function(message){
    let sides = message.content.replace(new RegExp('.*' + "!roll"), '');  
    if(sides == ""){
      message.reply(Math.floor((Math.random() * 6) + 1));
    }else{
      message.reply(Math.floor((Math.random() * sides) + 1));
    }  
  },

  gif: function(message){
    let rand = (Math.floor((Math.random() * 10) + 1));
      let gif = message.content.replace(new RegExp('.*' + "!gif"), '');
      giphy.search({
          q: gif,
          limit:10,
          rating: 'pg-13'
      }, function (err, res) {
          message.reply(res.data[rand].url);
      });
  },

  fndrop: function(message){
    let locations = ['Junk Junction', 'Haunted Hills','Anarachy Acres',
    'Wailing Woods','Tomato Town','Loot Lake', 'Pleasant Park', 'Snobby Shores',
    'Soccer Field','Tilted Towers', 'Dusty Depot', 'Retail Row', 'Lonely Lodge',
    'Greasy Grove', 'Shifty Shafts','Salty Springs', 'Fatal Fields',
    'Moisty Mire', 'Flush Factory', 'Lucky Landing'];
    message.channel.send(locations[(Math.floor((Math.random() * locations.length)))]);
  },

  fnstat: function(message){
    
    let user = message.content.split(" ");    
    fn.getInfo(user[1], 'pc').then(function(data){      
      let life = data.lifetimeStats;
      let total = data.stats;
   
      let t = table([
        ['\nCurrent Season:'],
        ['Solo Wins', total.curr_p2.top1.value],
        ['Duo Wins', total.curr_p10.top1.value],
        ['Squad Wins', total.curr_p9.top1.value],
        ['\nTotal:'],
        ['Solo Wins', total.p2.top1.value],
        ['Duo Wins', total.p10.top1.value],
        ['Squad Wins', total.p9.top1.value],
        ['\nLife Time:'],
        ['Wins', life[8].value],
        ['Kills', life[10].value],
        ['KD', life[11].value],
        ['Matches Played', life[7].value],
        ['Time Played', life[13].value]
      ]);
      message.channel.send('```' +t +'```'); 
    });
  
    
  },  

  help: function(message){
    let tempMsg = '```Commands:';
    for( i = 0; i < help.length; i++){      
      tempMsg = tempMsg.concat('\n',help[i]);
    }
    tempMsg = tempMsg.concat('```');
    message.channel.send(tempMsg);
  }


  
    
  
  
  }//end
  