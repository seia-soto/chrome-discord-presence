const token = localStorage.getItem('token')

if (token && token !== null) {
  chrome.storage.local.set({token: token}, function() {
    alert('Token of your Discord account is ready. This token will used until expired.')
  })
}
