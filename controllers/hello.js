exports.greet = async (req, res) => {
  const visitor = req.query.visitor_name || "Guest";

  try {
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

    // Request for IP info
    const ipRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,city`
    );
    const ipInfo = await ipRes.json();

    if (ipInfo.data.status !== "fail") {
      const city = ipInfo.data.city;
      const weatherBaseUrl = "https://api.weatherapi.com/v1";

      // Make request to get weather info
      const weatherRes = await fetch(
        `${weatherBaseUrl}/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
      );
      const weatherInfo = await weatherRes.json();

      res.json({
        client_ip: ip, // The IP address of the requester
        location: city, // The city of the requester
        greeting: `Hello, ${visitor}!, the temperature is ${weatherInfo.current.temp_c} degrees Celsius in ${weatherInfo.location.name}`,
      });
    } else {
      res.status(404).json({ error: "Could not retrieve IP information" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
