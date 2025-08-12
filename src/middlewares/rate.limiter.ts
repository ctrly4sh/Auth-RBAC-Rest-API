import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message : "Too many requests from this IP, please try again after 15 minutes"
});

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message : "Too many login attempts from this IP, please try again after 15 minutes"
}); 