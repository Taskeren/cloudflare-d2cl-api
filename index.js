
const cheaterListUrl = "https://raw.githubusercontent.com/Surikkusu/Destiny2CheaterList/main/Cheater%20List"

async function handleRequest(request) {

  let requestUrl = new URL(request.url)
  let steam64id = requestUrl.pathname

  if(steam64id == "/") {
    return Response.redirect("https://github.com/Surikkusu/Destiny2CheaterList", 301)
  }

  let userCont = cheaterListUrl + steam64id

  let content = await fetch(userCont)
  let stat = content.status
  let text = await content.text()

  let debugText = `Fetching cheating data of [${steam64id}], resulting ${content.status} with text of [${text}].`
  console.log(debugText)

  let ret = ""
  if(stat == 400 || stat == 404) {
    ret = {
      "status": 0,
      "message": "No cheating records exists."
    }
  } else if(stat == 200) {
    ret = {
      "status": 1,
      "message": `${text}`
    }
  } else {
    ret = {
      "status": -1,
      "message": "Unexpected fetching status. Contact administrator for further support."
    }
  }

  return new Response(JSON.stringify(ret), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "access-control-allow-origin": "*",
      "x-fetch-status": stat
    }
  })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})