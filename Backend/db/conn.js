const mongoose = require("mongoose");

const connectionURL = "mongodb+srv://jaydeep:3KM1Lwq3Z5Yyn68M@cluster0.p7sbc.mongodb.net/Redux-Crud?retryWrites=true&w=majority";

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Connection Succesfully");
    } else {
        console.log("Connection Error");
    }
});
