
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }
  async getById(id, email) {
    let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: email })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }
  async getAllNotesByBugId(id, email) {
    return await dbContext.Notes.find({ bug: id, creatorEmail: email })
  }
  async create(body) {
    let data = await dbContext.Bugs.create(body)
    return data
  }
  async editBug(id, email, body) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: email, closed: false }, body, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug")
    }
    return data
  }
  async closeBug(id, email, body) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: email }, body, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug")
    }
  }

}

export const bugsService = new BugsService();