import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

interface ErrorResponse {
    success: boolean;
    error: {
        code: string;
        message: string;
        details?: any; // Only for dev
    };
}

export const globalErrorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'Something went wrong';

    // 1. Handle AppError (Trusted operational errors)
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        errorCode = err.code;
        message = err.message;
    }

    // 2. Handle Prisma Errors
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            statusCode = 409;
            errorCode = 'DUPLICATE_ENTRY';
            message = 'A record with this unique field already exists.';
        } else if (err.code === 'P2025') {
            statusCode = 404;
            errorCode = 'NOT_FOUND';
            message = 'Record not found.';
        } else {
            statusCode = 400;
            errorCode = `PRISMA_${err.code}`;
            message = 'Database operation failed.';
        }
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorCode = 'VALIDATION_ERROR';
        message = 'Invalid data provided to database.';
    }

    // 3. Handle JWT Errors
    else if (err instanceof JsonWebTokenError) {
        statusCode = 401;
        errorCode = 'INVALID_TOKEN';
        message = 'Invalid session token. Please log in again.';
    }
    else if (err instanceof TokenExpiredError) {
        statusCode = 401;
        errorCode = 'TOKEN_EXPIRED';
        message = 'Your session has expired. Please log in again.';
    }
    else if (err instanceof NotBeforeError) {
        statusCode = 401;
        errorCode = 'TOKEN_NOT_ACTIVE';
        message = 'Token is not yet active.';
    }

    // 4. Handle Syntax/Parsing Errors
    else if (err instanceof SyntaxError && 'body' in err) {
        statusCode = 400;
        errorCode = 'JSON_PARSE_ERROR';
        message = 'Invalid JSON payload.';
    }

    // Build Response
    const response: ErrorResponse = {
        success: false,
        error: {
            code: errorCode,
            message: message
        }
    };

    // Log critical errors
    if (statusCode >= 500) {
        console.error('💥 CRITICAL ERROR:', err);
    }

    res.status(statusCode).json(response);
};
