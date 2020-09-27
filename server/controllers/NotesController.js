import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes")
    this.router
      .get("/:id", this.getById)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.editNote)
      .delete("/:id", this.deleteNote)
  }

  async getById(req, res, next) {
    try {
      let data = await notesService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await notesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error);
    }
  }

  async editNote(req, res, next) {
    try {
      let data = await notesService.editNote(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      let data = await notesService.deleteNote(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {

    }
  }
}