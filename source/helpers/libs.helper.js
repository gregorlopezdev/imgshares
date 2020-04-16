const helpers = {
  buildRandomName: function () {
    const possible = 'abcdefghijklmnñopqrstvxwyz0123456789'
    let randomName = ''

    for (let idx = 0; idx < 8; idx++) {
      randomName += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return randomName
  }
}

module.exports = helpers