const Discord = require('discord.js');
const SlackBot = require('slackbots');
const fs = require("fs");
const Music = require('discord.js-musicbot-addon');
const client = new Discord.Client();
const settings = require('./settings.json');
const cmd = require('./cmd.js');
const schedule = require('node-schedule');
var channel;
const music = new Music(client, {
  youtubeKey: settings.ytkey,
  anyoneCanSkip: true,
  anyoneCanLeave: true,
  anyoneCanAdjust: true,
  botOwner: "134501059753279488",
  ownerOverMember: true,
  defVolume: 10
});

const commandPrefix = "!";

client.on('ready', () => {
  console.log('I\'m Online');   
  var rule = new schedule.RecurrenceRule();
  channel = client.channels.get('310341409620361217');
  rule.hour = 20;
  rule.minute = 0;  
  var j = schedule.scheduleJob(rule, function(){    
  channel.send(' It is 1pm');
});
});


client.on("message", message => {
  //Checks for prefix
  if (!message.content.startsWith(commandPrefix)) return;
  //Ignores bots own messages
  if (message.author.bot) return; 


//Wolfram math
  if(message.content.startsWith(commandPrefix + "math")){    
    cmd.math(message);
  }

  //Dice roll
  if(message.content.startsWith(commandPrefix + "roll")){
    cmd.roll(message);
  }

  //Gif generator
  if(message.content.startsWith(commandPrefix + "gif")){
    cmd.gif(message);
  }

  //Fortnite drops
  if(message.content.startsWith(commandPrefix + "fndrop")){
    cmd.fndrop(message);
  }

  if(message.content.startsWith(commandPrefix + "fnstat")){
cmd.fnstat(message);
  }

  if(message.content.startsWith(commandPrefix + "help")){
    cmd.help(message);
  }

  
});


client.login(settings.token);

// create a bot
var slack = new SlackBot({
  token: settings.slack_token, // Add a bot https://my.slack.com/services/new/bot and put the token 
  name: 'moosebot'
});

slack.on('start', function() {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
      icon_emoji: ':cat:'
  };
  
  // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
  slack.postMessageToChannel('general', 'meow!', params);
  
  // define existing username instead of 'user_name'
  slack.postMessageToUser('user_name', 'meow!', params); 
  
  // If you add a 'slackbot' property, 
  // you will post to another user's slackbot channel instead of a direct message
  slack.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
  
  // define private group instead of 'private_group', where bot exist
  slack.postMessageToGroup('private_group', 'meow!', params); 
});