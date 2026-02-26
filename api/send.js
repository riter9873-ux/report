export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({success:false});
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "Unknown";

  const userAgent = req.headers["user-agent"] || "Unknown";

  const message = `
New Visit:
IP: ${ip}
User-Agent: ${userAgent}
Time: ${new Date().toLocaleString()}
`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    return res.status(200).json({success:true});
  } catch {
    return res.status(500).json({success:false});
  }
}
