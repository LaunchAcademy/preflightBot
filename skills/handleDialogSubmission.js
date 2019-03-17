const validUrl = require('../lib/validUrl')
const dialogSubmittedEvent = require('../lib/dialogSubmittedEvent')

module.exports = function(controller) {
  // create special handlers for certain actions in buttons
  // if the button action is 'say', act as if user said that thing
  controller.middleware.receive.use(function(bot, message, next) {
    if(message.type === 'dialog_submission' && message.callback_id === dialogSubmittedEvent) {
      if(validUrl(message.submission.url)) {
        bot.whisper(message, 'Thanks for submitting! Keep going!')
        bot.dialogOk()
      } 
      else {
        bot.dialogError({name: 'url', error: 'Please specify a valid URL!'})
      }
    }

    // if (message.type == 'interactive_message_callback') {
    //   if (message.actions[0].name.match(/^say$/)) {
    //       var reply = message.original_message;

    //       for (var a = 0; a < reply.attachments.length; a++) {
    //           reply.attachments[a].actions = null;
    //       }

    //       var person = '<@' + message.user + '>';
    //       if (message.channel[0] == 'D') {
    //           person = 'You';
    //       }

    //       reply.attachments.push(
    //           {
    //               text: person + ' said, ' + message.actions[0].value,
    //           }
    //       );

    //       bot.replyInteractive(message, reply);

    //    }
    // }
    
    next();    
      
  });
}
