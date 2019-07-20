// NOTE: Port to background handler.
const port = chrome.extension.connect({name: 'background.js'})

$(document).ready(function() {
  // NOTE: Convert all 'a' tags into event based handle.
  $('a').each(function(i, el) {
    $(el).click(function() {
      chrome.tabs.create({url: $(el).attr('href')})
    })
  })

  // NOTE: Add port event handler.
  port.onMessage.addListener(function(message) {
    switch (message) {
      case 'invalid-token':
        $('#checkboxEnablePresence > input').prop('disabled', true)
        $('#checkboxEnablePresence > input').prop('checked', false)

        $('#messageUpdateToken').css('display', 'block')
        $('#sectionClientStatus').css('display', 'none')
        break;
      case 'client-connected':
        $('#checkboxEnablePresence > input').prop('disabled', false)
        $('#checkboxEnablePresence > input').prop('checked', true)

        $('#messageUpdateToken').css('display', 'none')
        $('#sectionClientStatus').css('display', 'block')

        setInterval(function() {
          port.postMessage('get-statics')
        }, 1000 * 3)
        break;
      case 'client-deprecated':
        $('#checkboxEnablePresence > input').prop('disabled', false)
        $('#checkboxEnablePresence > input').prop('checked', false)

        $('#messageUpdateToken').css('display', 'none')
        $('#sectionClientStatus').css('display', 'none')
        break;
    }

    if (message.startsWith('data-')) {
      const sectors = message.split(';')
      const key = sectors[0].replace('data-', '')
      const data = JSON.parse(sectors.splice(1)[0])

      switch (key) {
        case 'client-statics':
          $('#textStatusClientPresence').text('Playing Chrome - ' + data.tab)
          $('#textStatusClientPing').text(Math.round(data.ping) + 'ms')
          $('#textStatusClientUser').text(data.account)
          break;
      }
    }
  })

  // NOTE: When presence enable or disable.
  $('#checkboxEnablePresence').checkbox({
    onChecked: function() {
      $('#checkboxEnablePresence > input').prop('disabled', true)

      port.postMessage('enable-rich-presence')
    },
    onUnchecked: function() {
      $('#checkboxEnablePresence > input').prop('disabled', true)

      port.postMessage('disable-rich-presence')
    }
  })

  $('#buttonReloadStatus').click(function() {
    $('#checkboxEnablePresence > input').prop('disabled', false)
    $('#checkboxEnablePresence > input').prop('checked', false)

    $('#messageUpdateToken').css('display', 'none')
    $('#sectionClientStatus').css('display', 'none')
  })

  // NOTE: Get status of handler.
  port.postMessage('get-status')
})
