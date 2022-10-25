const notesController = {};
const Note = require("../models/Note") 

notesController.renderNote = (req,res)=>{

    res.render("notes/newNote")
}

notesController.addNote = async(req,res)=>{
   const{rival, points, assists, rebounds, steals, fouls}= req.body;
    const newNote =  new Note({rival, points, assists, rebounds, steals, fouls})
    newNote.user = req.user.id
    await newNote.save()
    req.flash("success_msg", "Game added!")
    res.redirect("/notes")
}


notesController.renderAllNotes = async(req,res)=>{
const allNotes = await Note.find({user: req.user.id}).lean()
res.render("notes/allNotes", {allNotes})
}

notesController.renderEditNote = async(req,res)=>{
    const {id} = req.params
    const note = await Note.findById(id).lean()
    if(note.user != req.user.id){
        req.flash("error_msg","Access to other users games is disabled")
        return res.redirect("/notes")
    }
    res.render("notes/editNote", {note})
}


notesController.editNote = async(req,res)=>{
    const {id} = req.params
    const{rival, points, assists, rebounds, steals, fouls}= req.body;
    await Note.findByIdAndUpdate(id, {rival, points, assists, rebounds, steals, fouls})
    req.flash("success_msg", "Game Updated!")
    res.redirect("/notes")
}


notesController.deleteNote = async(req,res)=>{
    const{id} = req.params
    await Note.findByIdAndDelete(id)
    req.flash("success_msg", "Game Deleted!")
    res.redirect("/notes")
}



module.exports = notesController