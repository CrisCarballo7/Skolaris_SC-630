const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  // roles puede ser string o array
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "No autorizado" });

    const token = authHeader.split(" ")[1];
    console.log("🔑 Token recibido:", token); // ✅ ahora sí

    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.rol)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
};

module.exports = authMiddleware;
