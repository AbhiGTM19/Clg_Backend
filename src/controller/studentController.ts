import { Request, Response } from 'express';
import { create, getStudentById, getStudents, deleteStudents, updateStudent, getStudentByStudentEmail, getUserByStudentEmail } from '../services/studentService';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export default {
  createStudent: (req: Request, res: Response) => {
    // Encrypting the password
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getStudentById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    getStudentById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found.",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getStudents: (req: Request, res: Response) => {
    getStudents((err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success : 0,
          message : "Failed to get"
        })
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateStudent: (req: Request, res: Response) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },
  deleteStudents: (req: Request, res: Response) => {
    const data = req.body;
    deleteStudents(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        message: "Student deleted successfully",
      });
    });
  },
  login: (req: Request, res: Response) => {
    const body = req.body;
    getStudentByStudentEmail(body.email, (err, results) => {
      console.log(results)
      if (err || !results) {
        console.log(err);
        return res.status(500).json({
          success : 0,
          data : "Internal server error",
          error : err?.message
        })
      }
      /* else if (!results) {
        return res.status(200).json({
          success: 0,
          data: "Invalid email or password",
        });
      } */
      /* To check if the result is being generated or not ->
      console.log(body.password)
      console.log("//////////////////////////////")
      console.log(results.password)
      console.log("//////////////////////////////")
      console.log(results[0].password) */
      const result = compareSync(body.password, results[0].password);
      if (result) {
        console.log(results)
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", { expiresIn: "1h" });
        return res.json({
          success: 1,
          message: "Login Successful",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid",
        });
      }
    });
    // return res.status(200).json({
    //   success : 0,
    //   message : "working"
    // })
    // getUserByStudentEmail(body.email, (err, results) => {
    //     console.log(err);
    //     console.log("////////////////////////////")
    //     console.log(results)
    //     console.log("////////////////////////////")
    //     return res.status(200).json({
    //       success : 0,
    //       data : "Internal server error",
    //       error : err?.message
    //     })
    //   })
    }
  }

