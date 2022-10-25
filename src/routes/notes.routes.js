const {Router} = require("express")
const router = Router();
const {addNote, renderNote, renderAllNotes, renderEditNote, editNote, deleteNote} = require("../controllers/notes.controllers")
const {isAuth} = require("../helpers/auth")

//create Note
router.get("/notes/add",isAuth, renderNote)

router.post("/notes/add-note",isAuth, addNote)

//Get All
router.get("/notes", isAuth,renderAllNotes)

//edit Note
router.get("/notes/edit/:id",isAuth, renderEditNote)

router.put("/notes/edit/:id",isAuth, editNote)

//delete Note

router.delete("/notes/delete/:id",isAuth, deleteNote)



module.exports =router