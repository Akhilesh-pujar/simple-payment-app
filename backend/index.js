const express = require("express");
const rootroute = require("./routes/index")
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1",rootroute);


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`PORT listenig on ${PORT}`);
})