var express = require(`express`);
var router = express.Router();

var fs = require(`fs`);
var preHCreatures = fs.readFileSync(`./prehistoric_creatures.json`);
preHCreatures = JSON.parse(preHCreatures);


router.get(`/`, (req, res)=>{
    var nameFilter = req.query.nameFilter;

    if (nameFilter) {
        var filteredData = preHCreatures.filter((creature)=>{
            return creature.name.toLowerCase() === nameFilter.toLowerCase();
        });
        res.render(`prehistoric_creatures/index`, {myCreatures: filteredData})
    } else {
        res.render(`prehistoric_creatures/index`, {myCreatures: preHCreatures})
    }
})

router.get(`/new`, (req, res)=>{
    res.render(`prehistoric_creatures/new`)
})

//Express show route for prehistoric_creatures (lists one creature)
router.get(`/:idx`, (req, res)=>{
    if(preHCreatures[req.params.idx-1]) {
        res.render(`prehistoric_creatures/show`, {creature: preHCreatures[req.params.idx-1]});
    } else {
        res.send(`We only have ${preHCreatures.length} prehistoric creatures at this time`);
    }
    //render page with data of the specified creature
})

router.post(`/`, (req, res)=>{
    // Add item to prehistoric_creatures array
    preHCreatures.push(req.body);

    // Save prehistoric_creatures to the data.json file
    fs.writeFileSync(`./prehistoric_creatures.json`, JSON.stringify(preHCreatures))

    // redirect to the GET /prehistoric_creatures route (index)
    res.redirect('/prehistoric_creatures');
})

router.get(`/edit/:idx`, (req, res)=>{
    if(preHCreatures[req.params.idx-1]) {
        res.render(`./prehistoric_creatures/edit`, {id: req.params.idx, creature: preHCreatures[req.params.idx-1]});
    } else {
        res.send(`That is not an editable creature!`)
    }
})

router.post(`/edit/:idx`, (req, res)=>{
    preHCreatures[req.params.idx-1] = req.body;

    fs.writeFileSync(`./prehistoric_creature.json`, JSON.stringify(preHCreatures));

    res.redirect(`/prehistoric_creatures`);
})

module.exports = router;