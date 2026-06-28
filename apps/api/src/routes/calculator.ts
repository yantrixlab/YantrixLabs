import { Router, Request, Response, NextFunction } from 'express';
import { authenticate, requireSuperAdmin, AuthenticatedRequest } from '../middleware/auth';
import prisma from '../utils/prisma';

const router = Router();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Public Routes ──────────────────────────────────────────────────────────

// GET /api/v1/calculator/data — combined payload for the public calculator page
router.get('/data', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [platforms, categories] = await Promise.all([
      prisma.calculatorPlatform.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.calculatorFeatureCategory.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          features: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      }),
    ]);

    res.json({ success: true, data: { platforms, categories } });
  } catch (error) {
    next(error);
  }
});

// ─── Admin Routes (auth + super-admin required) ─────────────────────────────

router.use(authenticate);
router.use(requireSuperAdmin);

// ── Platforms ────────────────────────────────────────────────────────────

router.get('/platforms', async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const platforms = await prisma.calculatorPlatform.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data: platforms });
  } catch (error) {
    next(error);
  }
});

router.post('/platforms', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, basePrice, multiplier, isActive } = req.body;

    if (!name) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }

    const slug = slugify(name);
    const existing = await prisma.calculatorPlatform.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ success: false, error: 'A platform with this name already exists' });
      return;
    }

    const maxOrder = await prisma.calculatorPlatform.aggregate({ _max: { sortOrder: true } });
    const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

    const platform = await prisma.calculatorPlatform.create({
      data: {
        name: name.trim(),
        slug,
        basePrice: basePrice !== undefined ? Number(basePrice) : 0,
        multiplier: multiplier !== undefined ? Number(multiplier) : 1,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        sortOrder,
      },
    });

    res.status(201).json({ success: true, data: platform });
  } catch (error) {
    next(error);
  }
});

router.put('/platforms/reorder', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!Array.isArray(ids)) {
      res.status(400).json({ success: false, error: 'A valid array of platform IDs is required for reordering' });
      return;
    }
    await Promise.all(
      ids.map((id, index) => prisma.calculatorPlatform.update({ where: { id }, data: { sortOrder: index } }))
    );
    res.json({ success: true, data: { message: 'Platforms reordered' } });
  } catch (error) {
    next(error);
  }
});

router.put('/platforms/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, basePrice, multiplier, isActive, sortOrder } = req.body;
    const platform = await prisma.calculatorPlatform.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name: name.trim(), slug: slugify(name) }),
        ...(basePrice !== undefined && { basePrice: Number(basePrice) }),
        ...(multiplier !== undefined && { multiplier: Number(multiplier) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });
    res.json({ success: true, data: platform });
  } catch (error) {
    next(error);
  }
});

router.delete('/platforms/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.calculatorPlatform.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: { message: 'Platform deleted' } });
  } catch (error) {
    next(error);
  }
});

// ── Categories ───────────────────────────────────────────────────────────

router.get('/categories', async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.calculatorFeatureCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { features: true } } },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

router.post('/categories', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, isActive } = req.body;

    if (!name) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }

    const slug = slugify(name);
    const existing = await prisma.calculatorFeatureCategory.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ success: false, error: 'A category with this name already exists' });
      return;
    }

    const maxOrder = await prisma.calculatorFeatureCategory.aggregate({ _max: { sortOrder: true } });
    const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

    const category = await prisma.calculatorFeatureCategory.create({
      data: {
        name: name.trim(),
        slug,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        sortOrder,
      },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.put('/categories/reorder', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!Array.isArray(ids)) {
      res.status(400).json({ success: false, error: 'A valid array of category IDs is required for reordering' });
      return;
    }
    await Promise.all(
      ids.map((id, index) => prisma.calculatorFeatureCategory.update({ where: { id }, data: { sortOrder: index } }))
    );
    res.json({ success: true, data: { message: 'Categories reordered' } });
  } catch (error) {
    next(error);
  }
});

router.put('/categories/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, isActive, sortOrder } = req.body;
    const category = await prisma.calculatorFeatureCategory.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name: name.trim(), slug: slugify(name) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.delete('/categories/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.calculatorFeatureCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: { message: 'Category deleted' } });
  } catch (error) {
    next(error);
  }
});

// ── Features ─────────────────────────────────────────────────────────────

router.get('/features', async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const features = await prisma.calculatorFeature.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { category: { select: { id: true, name: true } } },
    });
    res.json({ success: true, data: features });
  } catch (error) {
    next(error);
  }
});

router.post('/features', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, categoryId, isActive } = req.body;

    if (!name || !categoryId) {
      res.status(400).json({ success: false, error: 'Name and category are required' });
      return;
    }

    const maxOrder = await prisma.calculatorFeature.aggregate({
      _max: { sortOrder: true },
      where: { categoryId },
    });
    const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;

    const feature = await prisma.calculatorFeature.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: price !== undefined ? Number(price) : 0,
        categoryId,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        sortOrder,
      },
    });

    res.status(201).json({ success: true, data: feature });
  } catch (error) {
    next(error);
  }
});

router.put('/features/reorder', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!Array.isArray(ids)) {
      res.status(400).json({ success: false, error: 'A valid array of feature IDs is required for reordering' });
      return;
    }
    await Promise.all(
      ids.map((id, index) => prisma.calculatorFeature.update({ where: { id }, data: { sortOrder: index } }))
    );
    res.json({ success: true, data: { message: 'Features reordered' } });
  } catch (error) {
    next(error);
  }
});

router.put('/features/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, categoryId, isActive, sortOrder } = req.body;
    const feature = await prisma.calculatorFeature.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(price !== undefined && { price: Number(price) }),
        ...(categoryId !== undefined && { categoryId }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });
    res.json({ success: true, data: feature });
  } catch (error) {
    next(error);
  }
});

router.delete('/features/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.calculatorFeature.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: { message: 'Feature deleted' } });
  } catch (error) {
    next(error);
  }
});

export default router;
