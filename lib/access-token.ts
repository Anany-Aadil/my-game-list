const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";

export default async function getAccessToken() {
  const response = await fetch(
    `${TWITCH_TOKEN_URL}?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" },
  );

  const data = await response.json();
  return data.access_token;
}
