let client = new Discord.Client({
  transport: 'websocket' // NOTE: On webbrowser environment.
})
let status = 'client-deprecated'
let intervalTask = null

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    switch (message) {
      case 'enable-rich-presence':
      chrome.storage.local.get('token', function(result) {
        if (result.token) {
          client = new Discord.Client({transport: 'websocket'})
          client.login(String(result.token).replace(/\"/gi, ''))
            .catch(function() {
              status = 'invalid-token'
              port.postMessage(status)
            })

          client.once('ready', function() {
            status = 'client-connected'
            port.postMessage(status)

            const updateActivity = function() {
              chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
              }, function(tabs) {
                const tab = tabs[0]

                if (tab) {
                  client.user.setActivity('Chrome - ' + tab.title, { type: 'PLAYING' })
                }
              })
            }

            updateActivity()
            intervalTask = setInterval(function() {
              updateActivity()
            }, 1000 * 5)
          })
        } else {
          status = 'invalid-token'
          port.postMessage(status)
        }
      })
        break;
      case 'disable-rich-presence':
        clearInterval(intervalTask || setInterval(function() {return null}))

        status = 'client-deprecated'
        port.postMessage(status)
        break;
      case 'get-statics':
        const data = {
          ping: client.ping,
          account: client.user.tag
        }

        port.postMessage('data-client-statics;' + JSON.stringify(data))
        break;
      case 'get-status':
        port.postMessage(status)
        break;
    }
  })
})
