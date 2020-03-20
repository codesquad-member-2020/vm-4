import app from "./server.js";

const PORT = 8081;

const handleListening = () => console.log(`✅ Listening on http://localhost:${PORT}...`);

app.listen(PORT, handleListening);
