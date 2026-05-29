import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { authenticate, AuthenticatedRequest } from "../middleware/auth";
import { validate } from "../middleware/validation";
import { rateLimiter } from "../middleware/rateLimiter";
import prisma from "../utils/prisma";

const router = Router();

const submitReviewLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many review submissions. Please try again later.",
});

router.get(
  "/approved",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestedLimit = parseInt((req.query.limit as string) || "6", 10);
      const limit = Number.isFinite(requestedLimit)
        ? Math.min(Math.max(requestedLimit, 1), 12)
        : 6;

      const reviews = await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
          user: { select: { name: true } },
          business: { select: { name: true, city: true } },
        },
      });

      res.json({ success: true, data: reviews });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  authenticate,
  submitReviewLimiter,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .isString()
      .trim()
      .isLength({ min: 10, max: 600 })
      .withMessage("Comment must be between 10 and 600 characters"),
  ],
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { rating, comment } = req.body;
      const userId = req.user!.id;
      const businessId = req.user!.businessId || null;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentReview = await prisma.review.findFirst({
        where: { userId, createdAt: { gte: thirtyDaysAgo } },
        select: { id: true, createdAt: true },
      });

      if (recentReview) {
        res.status(429).json({
          success: false,
          error:
            "You have already submitted a review recently. Please try again after 30 days.",
        });
        return;
      }

      const review = await prisma.review.create({
        data: {
          userId,
          businessId,
          rating: Number(rating),
          comment: comment.trim(),
          isApproved: false,
          platform: "app",
        },
      });

      res.status(201).json({ success: true, data: review });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
