const extractLessonSlug = require("./extractLessonSlug")

describe("extractLessonSlug", () => {
  it("returns a valid slug for a proper lesson url", () => {
    const message = "Something <https://learn.launchacademy.com/lessons/oop-tic-tac-toe>"

    expect(extractLessonSlug(message)).toEqual("oop-tic-tac-toe")
  })

  it("returns null for a message without a url in it", () => {
    const message = "Something"

    expect(extractLessonSlug(message)).toBe(null)
  })
})