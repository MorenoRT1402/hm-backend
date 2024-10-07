import app from "./app";
import connection from "./db/connection";
const PORT = 3000;

connection;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})