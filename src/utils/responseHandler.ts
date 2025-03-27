import { Response } from "express";
import HTTP_STATUS from "./httpStatusCodes";
import STATUS_MESSAGES from "./statusMessages";

export const successResponse = (
  res: Response,
  message: string = STATUS_MESSAGES.SUCCESS,
  data: any = null,
  statusCode: number = HTTP_STATUS.OK
) => {
    return res.status(statusCode).json({
        message,
        data,
        statusCode
    })
};

export const errorResponse = (
    res: Response,
    message: string = STATUS_MESSAGES.SERVER_ERROR,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error: any = null
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error
    })
}