let express = require(`express`);
let app = express();
var ejsLayouts = require(`express-ejs-layouts`);

var fs = require(`fs`);
var dinoData = fs.readFileSync(`./dinosaurs.json`);
dinoData = JSON.parse(dinoData);

app.set(`view engine`, `ejs`);
app.use(ejsLayouts);
// Body-parser middleware
app.use(express.urlencoded({extended: false}));
app.use(`/dinosaurs`, require(`./controllers/dinosaurs`));
app.use(`/prehistoric_creatures`, require(`./controllers/prehistoric_creatures`));

// Routes
app.get(`/`, (req, res)=>{
    res.send("It's a me, the front end!");
})

app.listen(`8000`, ()=>{
    console.log(`Here's the smooth sounds of port 8000`);
})