type AnyObj = Record<string, any>;

const demoInvoices = [
  {
    id: "demo-inv-1",
    invoiceNumber: "GST-2026-001",
    type: "TAX_INVOICE",
    status: "PAID",
    issueDate: "2026-05-10T00:00:00.000Z",
    dueDate: "2026-05-17T00:00:00.000Z",
    total: 25900,
    amountDue: 0,
    customer: { id: "demo-c-1", name: "Acme Corp", email: "accounts@acme.in" },
    createdAt: "2026-05-10T00:00:00.000Z",
  },
  {
    id: "demo-inv-2",
    invoiceNumber: "GST-2026-002",
    type: "TAX_INVOICE",
    status: "SENT",
    issueDate: "2026-05-14T00:00:00.000Z",
    dueDate: "2026-05-21T00:00:00.000Z",
    total: 12400,
    amountDue: 12400,
    customer: { id: "demo-c-2", name: "Sharma Enterprises", email: "billing@sharma.in" },
    createdAt: "2026-05-14T00:00:00.000Z",
  },
  {
    id: "demo-inv-3",
    invoiceNumber: "GST-2026-003",
    type: "TAX_INVOICE",
    status: "DRAFT",
    issueDate: "2026-05-18T00:00:00.000Z",
    dueDate: null,
    total: 8500,
    amountDue: 8500,
    customer: { id: "demo-c-3", name: "Patel Industries", email: "ops@patel.in" },
    createdAt: "2026-05-18T00:00:00.000Z",
  },
];

const demoCustomers = [
  {
    id: "demo-c-1",
    name: "Acme Corp",
    email: "accounts@acme.in",
    phone: "9876543210",
    gstin: "27ABCDE1234F1Z5",
    billingCity: "Mumbai",
    billingState: "Maharashtra",
    outstandingBalance: 0,
    _count: { invoices: 12 },
  },
  {
    id: "demo-c-2",
    name: "Sharma Enterprises",
    email: "billing@sharma.in",
    phone: "9123456780",
    gstin: "19ABCDE1234F1Z5",
    billingCity: "Kolkata",
    billingState: "West Bengal",
    outstandingBalance: 12400,
    _count: { invoices: 8 },
  },
];

const demoProducts = [
  {
    id: "demo-p-1",
    name: "Premium Packaging Box",
    type: "product",
    hsnSac: "4819",
    price: 1200,
    mrp: 1300,
    gstRate: 18,
    category: "Packaging",
    stockCount: 128,
    lowStockAlert: 25,
  },
  {
    id: "demo-p-2",
    name: "Consulting Service",
    type: "service",
    hsnSac: "9983",
    price: 5000,
    mrp: null,
    gstRate: 18,
    category: "Service",
    stockCount: null,
    lowStockAlert: null,
  },
];

const demoMonthlyRevenue = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((m, i) => ({
  month: `${m} 2026`,
  revenue: [120000, 140000, 130000, 160000, 180000, 175000, 190000, 210000, 185000, 225000, 240000, 230000][i],
}));

function withMeta<T>(rows: T[]) {
  return {
    data: rows,
    meta: {
      total: rows.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
}

export function getGuestDemoResponse(path: string): AnyObj | null {
  if (path.startsWith("/business/stats")) {
    return {
      data: {
        totalRevenue: 482500,
        invoicesThisMonth: 247,
        activeCustomers: 89,
        pendingAmount: 38200,
        pendingInvoicesCount: 4,
      },
    };
  }
  if (path.startsWith("/reports/dashboard")) {
    return { data: { monthlyRevenue: demoMonthlyRevenue } };
  }
  if (path.startsWith("/invoices")) {
    return withMeta(demoInvoices);
  }
  if (path.startsWith("/customers")) {
    return { data: demoCustomers };
  }
  if (path.startsWith("/products")) {
    return { data: demoProducts };
  }
  if (path.startsWith("/subscriptions")) {
    return { data: [] };
  }
  if (path.startsWith("/plans")) {
    return {
      data: [
        {
          id: "demo-plan-free",
          name: "Free",
          slug: "free",
          price: 0,
          features: ["invoicing", "customer", "product", "report", "gst"],
          invoiceLimit: 25,
          customerLimit: 50,
        },
      ],
    };
  }
  if (path.startsWith("/modules")) {
    return {
      data: [
        { slug: "invoicing", requiredPlan: null },
        { slug: "customers", requiredPlan: null },
        { slug: "products", requiredPlan: null },
        { slug: "inventory", requiredPlan: null },
        { slug: "gst-reports", requiredPlan: null },
        { slug: "payments", requiredPlan: null },
        { slug: "expenses", requiredPlan: null },
        { slug: "hrms", requiredPlan: null },
        { slug: "crm", requiredPlan: null },
      ],
    };
  }
  if (path.startsWith("/settings/subscription-control")) {
    return { data: { isSubscriptionEnforced: true } };
  }
  if (path.startsWith("/auth/me")) {
    return {
      data: {
        user: { name: "Guest User", email: "guest@yantrixlab.com" },
        memberships: [],
      },
    };
  }
  return null;
}

