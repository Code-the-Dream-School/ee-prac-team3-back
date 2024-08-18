const JWT = require("jsonwebtoken");
const authenticateRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No refresh token provided",
        });
    }

    try {
        const payload = JWT.verify(refreshToken, process.env.REFRESH_SECRET);

        req.user = {
            userId: payload.id,
        };

        next();
    } catch (error) {
        console.error('Refresh token error:', error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};

module.exports = authenticateRefreshToken;