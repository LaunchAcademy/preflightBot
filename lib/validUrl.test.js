const validUrl = require("./validUrl")

describe("validUrl", () => {
  it("returns true if a valid http url is specified", () => {
    expect(validUrl("http://www.google.com")).toBe(true)  
  })

  it("returns true if a valid https url is specified", () => {
    expect(validUrl("https://www.google.com")).toBe(true)
  })

  it("returns false if I specify nonsense", () => {
    expect(validUrl("dashjugheruthuyewrthsaef")).toBe(false)
  })
})