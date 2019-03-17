const dialogSubmittedEvent = require("../lib/dialogSubmittedEvent")
const extractLessonSlug = require('../lib/extractLessonSlug')

module.exports = function(controller) {
  controller.middleware.receive.use(function(bot, message, next) {
    if(message.type === "message_action" && message.callback_id === "submitWork") {
      const dialog = bot.createDialog(
        'Submit Work',
        dialogSubmittedEvent,
        'Send'
      ).addUrl('CodePen or Code Example Url','url','')

      const lessonSlug = extractLessonSlug(message.message.text)
      if(lessonSlug) {
        bot.replyWithDialog(message, Object.assign(dialog.asObject(),
          {state: lessonSlug}
        ))
      }
      else {
        bot.whisper(message, "Sorry, that is not an an assignment message")
      }
    }
  })
}