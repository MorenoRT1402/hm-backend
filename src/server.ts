import app from "./app";
import { connectToDB } from "./db/connection";
const PORT = 3000;

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running at http://localhost:${PORT}`)
})