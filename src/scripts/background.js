let client = null
let status = 'first-run'
let intervalTask = null
let cache = new Object()

const createClientInstance = async (port, token) => {
  if (!token) {
    status = 'invalid-token'
    port.postMessage(status)
  }

  // NOTE: update user-agent value forcely to connect Discord API via browser;
  Discord.Constants.UserAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.309 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36'

  try {
    client = new Discord.Client({
      transport: 'websocket' // NOTE: On webbrowser environment.
    })
    client.on('debug', payload => console.log(payload))

    status = 'client-connecting'

    await client.login(String(token).replace(/\"/gi, ''))

    client.once('ready', function() {
      status = 'client-connected'
      port.postMessage(status)

      const updateActivity = function() {
        chrome.tabs.query({
          active: true,
          lastFocusedWindow: true
        }, function(tabs) {
          const tab = tabs[0]

          if (tab && tab.title !== cache.lastViewedTab) {
            cache.lastViewedTab = tab.title || 'New tab'

            client.user.setActivity('Chrome - ' + cache.lastViewedTab, { type: 'PLAYING' })

            port.postMessage('data-client-statics;' + JSON.stringify({
              tab: cache.lastViewedTab,
              account: client.user.tag
            }))
          }
        })
      }

      updateActivity()

      intervalTask = setInterval(function() {
        updateActivity()
      }, 1000 * 1.5)
    })
  } catch (error) {
    console.error(error)

    status = 'invalid-token'
    port.postMessage(status)
  }
}

const initFn = (port, message) => {
  if (!port || !message) return

  switch (message) {
    case 'enable-rich-presence': {
      chrome.storage.local.get('token', function(result) {
        createClientInstance(port, result.token)
      })

      break
    }
    case 'disable-rich-presence': {
      clearInterval(intervalTask || setInterval(function() { return null }))

      status = 'client-deprecated'
      port.postMessage(status)

      break
    }
    case 'get-statics': {
      const data = {
        tab: cache.lastViewedTab,
        account: client.user.tag
      }

      port.postMessage('data-client-statics;' + JSON.stringify(data))

      break
    }
    case 'get-status': {
      port.postMessage(status)
      break
    }
  }
}

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    initFn(port, message)
  })
})
