import express from "express";
import { addNewAdmin, addNewDoctor, deleteDoctor, getAllDoctors, getAllUser, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import {isAdminAuthenticated,isPatientAuthenticated} from"../middlewares/auth.js"

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin)
router.get("/doctors",getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,getAllUser)
router.get("/patient/me",isPatientAuthenticated,getAllUser)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor)
router.delete('/doctors/:id',isAdminAuthenticated,deleteDoctor);

export default router