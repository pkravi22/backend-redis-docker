import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Tokens are generally sent like: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // Continue to next middleware or controller
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  } finally {
    console.log("crossed  middleware");
  }
};
