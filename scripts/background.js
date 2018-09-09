const RPC = require('../node_modules/discord-rpc')

const clientId = '488236752222552065'
const scopes = ['rpc', 'rpc.api']

const client = new RPC.Client({transport: 'websocket'})

client.on('ready', () => {
  console.log('Logged in as', client.application.name)
  console.log('Authed for user', client.user.username)

  client.setActivity({
    details: 'Searching web env by Chrome'
  })
})

// Log in to RPC with client id
client.login({clientId, scopes})

module.exports = client
