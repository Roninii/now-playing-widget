This was intended to be an API for fetching user's now playing data from Spotify, but after tinkering for a little, it seems like Spotify's API doesn't really support this. This led to a feeling that the solution was likely going to be a hacky workaround where I'm using puppeteer in some way to complete the login flow, using refresh tokens to keep the user logged in.

~~For now, I'm scrapping this project. Maybe I'll return later!~~

~~Seems there is actually a [Spotify Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) which is probably _exactly_ what I neeed.~~

Nope -- access is still limited to _your_ spotify account. So I still can't add a widget to my portfolio with what I'm currently listening to without doing some hacky things to keep _my_ token and refresh it.
