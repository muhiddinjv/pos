import express from 'express';
import {login} from "../controllers/loginController"

const router = express.Router()

router
    .post("/api/login", login);


