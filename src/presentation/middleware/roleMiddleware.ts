export const adminMiddleware = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
