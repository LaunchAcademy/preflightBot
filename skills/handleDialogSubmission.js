const validUrl = require('../lib/validUrl')
const dialogSubmittedEvent = require('../lib/dialogSubmittedEvent')
const Submission = require('../lib/models/Submission')
const User = require('../lib/models/User')
const Assignment = require("../lib/models/Assignment")

const db = require("../lib/db")

const submitCode = async (message) => {
  await db.bookshelf.transaction(async (t) => {
    let user = new User({"chat_id": message.user, "channel_id": message.team.id})
    const foundUser = await user.fetch({transacting: t})
    if(foundUser) {
      user = foundUser
    }
    user.set({name: message.raw_message.user.name})
    await user.save(null, {transacting: t})

    let assignment = new Assignment({slug: message.state})
    let foundAssignment = await assignment.fetch({transacting: t})
    if(!foundAssignment) {
      await assignment.save(null, {transacting: t})
    }
    else {
      assignment = foundAssignment
    }

    const submission = new Submission({
      assignment_id: assignment.id, 
      user_id: user.id, 
      url: message.submission.url
    })
    await submission.save(null, {transacting: t})
  })
}
module.exports = function(controller) {
  // create special handlers for certain actions in buttons
  // if the button action is 'say', act as if user said that thing
  controller.middleware.receive.use(async function(bot, message, next) {
    if(message.type === 'dialog_submission' && message.callback_id === dialogSubmittedEvent) {
      if(validUrl(message.submission.url)) {
        submitCode(message)
        bot.whisper(message, 'Thanks for submitting! Keep going!')
        bot.dialogOk()
        const conversations = bot.api.conversations.list({types: "private_channel"}, function(err,response) {
          const submissionsChannel = response.channels.find((channel) => {
            return channel.name === 'submissions'
          })
          if(submissionsChannel) {
            const text = `<@${message.raw_message.user.id}> submitted ${message.submission.url} for \`${message.state}\``
            bot.say({ text, channel: submissionsChannel.id}, function(err, resp) {
              if(err) {
                console.log(`ERROR: ${err}`)
              }
            })
          }
          else {
            console.log("submissions channel NOT FOUND!")
          }
        })
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
