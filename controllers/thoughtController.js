const {Thought} = require("../models")


module.exports = {
   async findAllThoughts(req,res){
        try{
            const thoughts = await Thought.find()
            res.json(thoughts)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

    async createThought(req,res){
        try{
            const thought = await Thought.create(req.body)
            res.json(thought)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },





}