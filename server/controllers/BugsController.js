import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs")
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getAllNotesByBugId)
      .post("", this.create)
      .put("/:id", this.editBug)
      .delete("/:id", this.closeBug)
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
      let data = await bugsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      let data = await bugsService.getAllNotesByBugId(req.params.id, req.userInfo.email)
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

  async closeBug(req, res, next) {
    try {
      let data = await bugsService.closeBug(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {

    }
  }
}