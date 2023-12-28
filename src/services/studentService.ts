import { Pool, QueryError } from 'mysql2';
import pool from '../config/databaseConfig';

interface Student {
  id?: number;
  first_name?: string;
  last_name?: string;
  age?: number;
  email?: string;
  password?: string;
  number?: string;
}

const create = (data: Student, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `INSERT INTO registration(firstName, lastName, age, email, password, number) VALUES(?, ?, ?, ?, ?, ?)`,
    [
      data.first_name,
      data.last_name,
      data.age,
      data.email,
      data.password,
      data.number,
    ],
    (error: QueryError | null, results?: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getStudents = (callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `SELECT id, firstName, lastName, age, email, number FROM registration`,
    [],
    (error: QueryError | null, results?: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getStudentById = (id: number, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `SELECT id, firstName, lastName, age, email, number FROM registration WHERE id=?`,
    [id],
    (error: QueryError | null, results?: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const updateStudent = (data: Student, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `UPDATE registration SET firstName=?, lastName=?, age=?, email=?, password=?, number=? WHERE id=?`,
    [
      data.first_name,
      data.last_name,
      data.age,
      data.email,
      data.password,
      data.number,
      data.id,
    ],
    (error: QueryError | null, results?: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const deleteStudents = (data: Student, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `DELETE FROM registration WHERE id=?`,
    [data.id],
    (error: QueryError | null, results?: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
};

const getStudentByStudentEmail = (email: any, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `SELECT * FROM registration WHERE email = ?`,
    [email],
    (error: QueryError | null, results?: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

const getUserByStudentEmail = (email: any, callBack: (error: QueryError | null, results?: any) => void) => {
  pool.query(
    `SELECT * FROM registration WHERE email = ?`,
    [email],
    (error: QueryError | null, results?: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
};

export {
  create,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudents,
  getStudentByStudentEmail,
  getUserByStudentEmail
};
