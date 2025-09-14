// Custom Cypress command to generate a random alphanumeric string of a given length
// Optionally, extra characters can be provided to include in the character set
export function generateRandomString(length, extra = '') {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + extra
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  