import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("hello")
})
app.listen(PORT, () => {
    console.log(`This server is running on ${PORT}`);
});

