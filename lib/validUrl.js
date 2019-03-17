const validUrl = (inputText) => {
  return !!inputText.match(/^https?:\/\//)
}

module.exports = validUrl
