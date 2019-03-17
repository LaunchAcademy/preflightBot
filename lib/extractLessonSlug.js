const extractLessonSlug = (messageText) => {
  const matches = messageText.match(/\<(https?.*)\>/)
  if(matches && matches.length > 0) {
    const tokenizedPath = matches[1].split("/")
    return tokenizedPath[tokenizedPath.length - 1]
  }
  else{
    return null
  }
}

module.exports = extractLessonSlug