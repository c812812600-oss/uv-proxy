export async function onRequest(context) {

const url = new URL(context.request.url)

// /service/ 以外は通常ページ
if (!url.pathname.startsWith("/service/")) {
return context.next()
}

try {

const encoded = url.pathname.replace("/service/","")
const target = atob(encoded)

const response = await fetch(target,{
headers:{
"user-agent":"Mozilla/5.0"
}
})

return new Response(response.body,{
status: response.status,
headers:{
"content-type": response.headers.get("content-type") || "text/html",
"access-control-allow-origin":"*"
}
})

} catch(e){

return new Response("Proxy Error: "+e)

}

}
