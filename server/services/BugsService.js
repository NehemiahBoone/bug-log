
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }
  async getById(id) {
    let data = await dbContext.Bugs.findOne({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
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

}

export const bugsService = new BugsService();