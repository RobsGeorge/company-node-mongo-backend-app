const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/compdb",{useNewUrlParser: true, useUnifiedTopology: true});

//Creating Schema and Model
const compSchema = {
    code: Number,
    name: String,
    address: String,
    isActive: Number
}
const Company =  mongoose.model("Company", compSchema);



const comp1 = new Company({
    code: 21,
    name: "Microsoft",
    address: "US",
    isActive: 1
});

const comp2 = new Company({
    code: 15,
    name: "Google",
    address: "Egypt",
    isActive: 1
});

const comp3 = new Company({
    code: 54,
    name: "Apple",
    address: "India",
    isActive: 0
});



// Company.insertMany([comp1, comp2, comp3], function(err){
//     if(err){
//     console.log(err);
// }
// else{
// console.log("Successfully added to the database");
// }
// });



app.get('/', (req, res) => {
    res.json({"message": "Welcome to Company Application."});
});

// app.post('/', (req, res)=>{
//     const compCode = req.body.code;
//     const compName = req.body.name;
//     const compAddress = req.body.address;
//     const isActive = req.body.isActive;
//
//     const comp = Company({
//         code: compCode,
//         name: compName,
//         address: compAddress,
//         isActive: isActive
//     });
//
//     comp.save();
// });

app.route('/companies')
// Create a new Company
.post(function(req,res){
        //Validate request
        if(!req.body.code)
        {
            return res.status(400).send({
                message: "Company code cannot be empty"
            });
        }

        //CREATE a Company
            const compCode = req.body.code;
            const compName = req.body.name;
            const compAddress = req.body.address;
            const isActive = req.body.isActive;

            const comp = Company({
                code: compCode,
                name: compName,
                address: compAddress,
                isActive: isActive
            });

            comp.save()
            .then(data=>{
                res.send(data);
            }).catch(err=>{
                res.send({
                    message: "Error occured while creating the company"
                });
            });
    })
    // Retrieve all Companies
.get(function(req, res){
        Company.find(function(err, foundCompanies){
            if(!err){
                if(foundCompanies.length==0)
                {
                    res.send("No Companies Found");
                }
                else
                {
                    res.send(foundCompanies);
                }
        }
        else
        {
            res.send(err);
        }
        });
    })
    //Delete all Companies
.delete(function(req, res){
        Company.deleteMany( function(err){
            if(!err){
                res.send("Deleted ALL companies!");
            }
            else{
                res.send(err);
            }
        });
    });


app.route('/companies/:code')
    // Retrieve a single Company with company code
.get(function(req, res){
        Company.findOne({code: req.params.code},function(err, foundCompany){
            if(foundCompany)
            {
                res.send(foundCompany);
            }
            else
            {
                res.send("No Companies with code " + req.params.code);
            }
        });
})
.put(function(req, res){
    Company.updateOne(
        {code: req.params.code},
        {
            code: req.body.code,
            name: req.body.name
        },
        {overwrite: true},
        function(err, foundCompanies){
            if(!err)
            {
                    res.send("Successfully Updated Company with code "+ req.params.code);
            }
            else{

                res.send("Error occured while updating Company with code "+ req.params.code);
            }
    });
})
.delete(function(req, res){
    Company.deleteOne({code: req.params.code}, function(err, foundCompanies){
        if(!err){
            if(foundCompanies.length>0)
            {
                res.send("Successfully Deleted Company with Code "+ req.params.code);
            }
        }
        else
        {
        res.send("Error occured while deleting Company with Code "+ req.params.code);
        }
    });
});


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
