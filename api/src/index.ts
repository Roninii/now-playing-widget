import { Hono } from "hono";
import queryString from "node:querystring";

// Generate a random hex string to use as the state parameter
function generateRandomHexString(length: number): string {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.get("/login", (c) => {
  const state = generateRandomHexString(16);
  const scope = "user-read-private user-read-email";

  return c.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: process.env.spotify_client_id,
        scope,
        redirect_uri: "http://localhost:3000/callback",
        state,
      })
  );
});

app.get("/callback", async (c) => {
  const { code } = c.req.query();

  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", "http://localhost:3000/callback");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.spotify_client_id +
            ":" +
            process.env.spotify_client_secret
        ).toString("base64"),
    },
    body: formData,
  });
  const json = await res.json();

  console.log(json);

  return c.text(`
    Success!
    Auth Code: ${code}
    Access Token: ${json}
  `);
});

export default app;
