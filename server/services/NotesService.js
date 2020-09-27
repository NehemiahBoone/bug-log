
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async getAllNotesByBugId(id) {
    return await dbContext.Notes.find({ bug: id })
  }
  async getById(id, email) {
    let data = await dbContext.Notes.findOne({ _id: id, creatorEmail: email })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }
  async create(body) {
    let data = await dbContext.Notes.create(body)
    return data
  }
  async editNote(id, email, body) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: email, closed: false }, body, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug")
    }
    return data
  }
  async deleteNote(id, email) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: email })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug")
    }
  }

}

export const notesService = new NotesService();