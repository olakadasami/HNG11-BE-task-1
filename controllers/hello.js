const axios = require("axios");

exports.greet = async (req, res) => {
  const visitor = req.query.visitor_name || "Guest";
  const clientIp = req.ip;
  console.log({ ip: clientIp });

  try {
    const weatherBaseUrl = "https://api.weatherapi.com/v1";
    // Make request to get weather info
    const weatherInfo = await axios.get(
      `${weatherBaseUrl}/current.json?key=${process.env.WEATHER_API_KEY}&q=${clientIp}`
    );

    res.json({
      client_ip: clientIp,
      location: weatherInfo.data.location.region,
      greeting: `Hello, ${visitor}!, the temperature is ${weatherInfo.data.current.temp_c} degrees Celsius in ${weatherInfo.data.location.region}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
