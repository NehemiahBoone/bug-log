import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs")
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getAllNotesByBugId)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.editBug)
  }

  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll(req.query)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getAllNotesByBugId(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error);
    }
  }

  async editBug(req, res, next) {
    try {
      let data = await bugsService.editBug(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}