const {Schema, model }=require("mongoose");

const NotesSchema = new Schema({
     
    rival: {
        type: String,
        required: true
    },
    points:{
        type : Number,
        required: true
    },
    assists:{
        type : Number,
        required: true
    },
    rebounds:{
        type : Number,
        required: true
    },
    steals:{
        type : Number,
        required: true
    },
    fouls:{
        type : Number,
        required: true
    },
    user:{
        type: String,
        required: true
    }
},{
    timestamps: false
})


module.exports = model("Note", NotesSchema, "allNotes")