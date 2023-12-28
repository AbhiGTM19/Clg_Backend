import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.get("authorization");

  if (token) {
    token = token.slice(7);

    verify(token, "qwe1234", (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access denied! Unauthorized user",
    });
  }
};

export { checkToken };
