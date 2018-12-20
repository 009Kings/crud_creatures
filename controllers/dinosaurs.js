var express = require(`express`);
var router = express.Router();

var fs = require(`fs`);
var dinoData = fs.readFileSync(`./dinosaurs.json`);
dinoData = JSON.parse(dinoData);


router.get(`/`, (req, res)=>{
    var nameFilter = req.query.nameFilter;

    if (nameFilter) {
        var filteredData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
        res.render(`dinosaurs/index`, {myDinos: filteredData})
    } else {
        res.render(`dinosaurs/index`, {myDinos: dinoData})
    }
})

router.get(`/new`, (req, res)=>{
    res.render(`dinosaurs/new`)
})

//Express show route for dinosaurs (lists one dino)
router.get(`/:idx`, (req, res)=>{
    if(dinoData[req.params.idx-1]) {
        res.render(`dinosaurs/show`, {dino: dinoData[req.params.idx-1]});
    } else {
        res.send(`We only have ${dinoData.length} dinos at this time`);
    }
    //render page with data of the specified dino
})

router.post(`/`, (req, res)=>{
    // Add item to dinosaurs array
    dinoData.push(req.body);

    // Save dinosaurs to the data.json file
    fs.writeFileSync(`../dinosaurs.json`, JSON.stringify(dinoData))

    // redirect to the GET /dinosoaurs route (index)
    res.redirect('/dinosaurs');
})

router.get(`/edit/:idx`, (req, res)=>{
    if(dinoData[req.params.idx-1]) {
        res.render(`./dinosaurs/edit`, {id: req.params.idx, dino: dinoData[req.params.idx-1]});
    } else {
        res.send(`That is not an editable dinosaur!`)
    }
})

router.post(`/edit/:idx`, (req, res)=>{
    // Add item to dinosaurs array
    dinoData[req.params.idx-1] = req.body;

    // Save dinosaurs to the data.json file
    fs.writeFileSync(`../dinosaurs.json`, JSON.stringify(dinoData))

    // redirect to the GET /dinosoaurs route (index)
    res.redirect('/dinosaurs');
})

module.exports = router;