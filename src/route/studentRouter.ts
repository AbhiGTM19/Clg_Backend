import { Router } from 'express';
import studentController from '../controller/studentController';
import {checkToken }  from '../middleware/tokenValidation';
  
  const router = Router();
  
  router.post("/", /*checkToken,*/ studentController.createStudent);
  router.get("/", checkToken, studentController.getStudents);
  router.get("/:id", checkToken, studentController.getStudentById); // Assuming getStudentById expects an ID parameter
  router.patch("/", checkToken, studentController.updateStudent);
  router.delete("/", checkToken, studentController.deleteStudents);
  router.post("/login", studentController.login);
  
  export default router;
