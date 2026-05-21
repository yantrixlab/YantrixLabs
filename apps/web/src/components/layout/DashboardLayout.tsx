"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  LogOut,
  Bell,
  Menu,
  X,
  IndianRupee,
  Building2,
  ChevronRight,
  Lock,
  Receipt,
  Boxes,
  UserCircle,
  Target,
  Crown,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  isAuthenticated,
  getUserData,
  apiFetch,
  isSafeImageUrl,
} from "@/lib/api";
import {
  BusinessProfileSetupModal,
  type BusinessSettings as BizSettings,
} from "@/components/ui/BusinessProfileSetupModal";
import { GlobalSearch } from "@/components/ui/GlobalSearch";
import themeStyles from "./DashboardTheme.module.css";

const INVOICE_USAGE_WARNING_RATIO = 0.8;

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/products", label: "Products", icon: Package },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/payments", label: "Payments", icon: IndianRupee },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/hrm", label: "HRM", icon: UserCircle },
  { href: "/crm", label: "CRM", icon: Target },
];

const NAV_MODULE_SLUG: Record<string, string> = {
  "/invoices": "invoicing",
  "/customers": "customers",
  "/products": "products",
  "/reports": "gst-reports",
  "/payments": "payments",
  "/expenses": "expenses",
  "/inventory": "inventory",
  "/hrm": "hrms",
  "/crm": "crm",
};

const NAV_CREATE_ROUTES: Record<string, string> = {
  "/invoices": "/invoices/new",
  "/customers": "/customers/new",
  "/products": "/products/new",
};

const SETTINGS_ITEMS = [
  { href: "/settings", label: "Business Settings", icon: Building2 },
  { href: "/settings/billing", label: "Billing & Plans", icon: IndianRupee },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    role?: string;
  }>({});
  const [planInfo, setPlanInfo] = useState<{
    name: string;
    slug: string;
    invoicesUsed: number;
    invoiceLimit: number;
    customersUsed: number;
    customerLimit: number;
    features: string[];
    isExpired?: boolean;
    endDate?: string;
  } | null>(null);
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [setupSettings, setSetupSettings] = useState<BizSettings | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);
  const [activeModuleSlugs, setActiveModuleSlugs] =
    useState<Set<string> | null>(null);
  const [moduleRequiredPlans, setModuleRequiredPlans] = useState<
    Record<string, string | null>
  >({});
  const [moduleOrder, setModuleOrder] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("gst_invoice_theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [subscriptionEnforced, setSubscriptionEnforced] = useState(true);

  useEffect(() => {
    localStorage.setItem("gst_invoice_theme", theme);
    document.documentElement.setAttribute("data-gst-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#060b16" : "";
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/auth/login");
      return;
    }
    const tokenData = getUserData();
    setUserData(tokenData);

    apiFetch("/auth/me")
      .then((res: any) => {
        if (res.data?.user) {
          setUserData((prev) => ({
            ...prev,
            name: res.data.user.name,
            email: res.data.user.email,
          }));
        }
        const biz = res.data?.memberships?.[0]?.business;
        if (
          biz?.logo &&
          typeof biz.logo === "string" &&
          isSafeImageUrl(biz.logo)
        ) {
          setBusinessLogo(biz.logo);
        }
        if (biz?.name) setBusinessName(biz.name);

        const bizId = biz?.id || getUserData().businessId;
        if (bizId) {
          apiFetch(`/business/${bizId}`)
            .then((bizRes: any) => {
              const s = bizRes?.data;
              if (s) {
                const isIncomplete =
                  !s.email?.trim() ||
                  !s.phone?.trim() ||
                  !s.address?.trim() ||
                  !s.invoicePrefix?.trim();
                if (isIncomplete) {
                  setSetupSettings(s);
                  setSetupRequired(true);
                }
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});

    apiFetch("/modules")
      .then(
        (res: {
          data?: Array<{ slug: string; requiredPlan?: string | null }>;
        }) => {
          const modules = res.data || [];
          if (modules.length === 0) {
            // Empty module config should not hide the whole sidebar.
            setActiveModuleSlugs(null);
            setModuleRequiredPlans({});
            setModuleOrder([]);
            return;
          }
          const slugs = new Set<string>(modules.map((m) => m.slug));
          const requiredPlanBySlug: Record<string, string | null> = {};
          modules.forEach((m) => {
            requiredPlanBySlug[m.slug] = m.requiredPlan ?? null;
          });
          setActiveModuleSlugs(slugs);
          setModuleRequiredPlans(requiredPlanBySlug);
          setModuleOrder(modules.map((m) => m.slug));
        },
      )
      .catch(() => {
        setActiveModuleSlugs(null);
        setModuleRequiredPlans({});
      });

    apiFetch("/settings/subscription-control")
      .then((res: any) => {
        setSubscriptionEnforced(res?.data?.isSubscriptionEnforced !== false);
      })
      .catch(() => {
        setSubscriptionEnforced(true);
      });

    apiFetch("/subscriptions")
      .then(async (res: any) => {
        const subs = res.data || [];

        const fetchFreePlanInfo = async (): Promise<{
          features: string[];
          invoiceLimit: number;
          customerLimit: number;
        }> => {
          try {
            const plansRes: any = await apiFetch("/plans");
            const plans: any[] = plansRes.data || [];
            const freePlan =
              plans.find((p: any) => p.slug === "free") ||
              plans.find((p: any) => p.price === 0) ||
              plans.slice().sort((a: any, b: any) => a.price - b.price)[0];
            if (freePlan) {
              return {
                features: freePlan.features || [],
                invoiceLimit: freePlan.invoiceLimit || 5,
                customerLimit: freePlan.customerLimit || 10,
              };
            }
          } catch (err) {
            console.error("Failed to fetch plans for free-plan fallback:", err);
          }
          return { features: [], invoiceLimit: 5, customerLimit: 10 };
        };

        const activeSub = subs.find(
          (s: any) =>
            (s.status === "ACTIVE" || s.status === "TRIAL") &&
            new Date(s.endDate) > new Date(),
        );
        const clientExpiredSub = !activeSub
          ? subs.find(
              (s: any) =>
                s.status === "EXPIRED" ||
                ((s.status === "ACTIVE" || s.status === "TRIAL") &&
                  new Date(s.endDate) <= new Date()),
            )
          : null;
        const sub = activeSub || clientExpiredSub;

        if (sub) {
          const isExpired =
            sub.status === "EXPIRED" ||
            ((sub.status === "ACTIVE" || sub.status === "TRIAL") &&
              new Date(sub.endDate) <= new Date());

          if (isExpired) {
            const {
              features: freePlanFeatures,
              invoiceLimit: freePlanInvoiceLimit,
              customerLimit: freePlanCustomerLimit,
            } = await fetchFreePlanInfo();

            apiFetch("/business/stats")
              .then((statsRes: any) => {
                setPlanInfo({
                  name: sub.plan?.name || "Unknown",
                  slug: "free",
                  invoicesUsed: statsRes?.data?.invoicesThisMonth ?? 0,
                  invoiceLimit: freePlanInvoiceLimit,
                  customersUsed: statsRes?.data?.activeCustomers ?? 0,
                  customerLimit: freePlanCustomerLimit,
                  features: freePlanFeatures,
                  isExpired: true,
                  endDate: sub.endDate,
                });
              })
              .catch(() => {
                setPlanInfo({
                  name: sub.plan?.name || "Unknown",
                  slug: "free",
                  invoicesUsed: 0,
                  invoiceLimit: freePlanInvoiceLimit,
                  customersUsed: 0,
                  customerLimit: freePlanCustomerLimit,
                  features: freePlanFeatures,
                  isExpired: true,
                  endDate: sub.endDate,
                });
              });
          } else {
            apiFetch("/business/stats")
              .then((statsRes: any) => {
                setPlanInfo({
                  name: sub.plan?.name || "Free",
                  slug: sub.plan?.slug || "free",
                  invoicesUsed: statsRes?.data?.invoicesThisMonth ?? 0,
                  invoiceLimit: sub.plan?.invoiceLimit || 5,
                  customersUsed: statsRes?.data?.activeCustomers ?? 0,
                  customerLimit: sub.plan?.customerLimit || 0,
                  features: sub.plan?.features || [],
                  isExpired: false,
                  endDate: sub.endDate,
                });
              })
              .catch(() => {
                setPlanInfo({
                  name: sub.plan?.name || "Free",
                  slug: sub.plan?.slug || "free",
                  invoicesUsed: 0,
                  invoiceLimit: sub.plan?.invoiceLimit || 5,
                  customersUsed: 0,
                  customerLimit: sub.plan?.customerLimit || 0,
                  features: sub.plan?.features || [],
                  isExpired: false,
                  endDate: sub.endDate,
                });
              });
          }
        } else {
          const {
            features: freePlanFeatures,
            invoiceLimit: freePlanInvoiceLimit,
            customerLimit: freePlanCustomerLimit,
          } = await fetchFreePlanInfo();
          apiFetch("/business/stats")
            .then((statsRes: any) => {
              setPlanInfo({
                name: "Free",
                slug: "free",
                invoicesUsed: statsRes?.data?.invoicesThisMonth ?? 0,
                invoiceLimit: freePlanInvoiceLimit,
                customersUsed: statsRes?.data?.activeCustomers ?? 0,
                customerLimit: freePlanCustomerLimit,
                features: freePlanFeatures,
                isExpired: true,
              });
            })
            .catch(() => {
              setPlanInfo({
                name: "Free",
                slug: "free",
                invoicesUsed: 0,
                invoiceLimit: freePlanInvoiceLimit,
                customersUsed: 0,
                customerLimit: freePlanCustomerLimit,
                features: freePlanFeatures,
                isExpired: true,
              });
            });
        }
      })
      .catch(() => {});
  }, [router, pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  const planRank = (slug: string): number => {
    const s = slug.toLowerCase();
    if (s === "free") return 0;
    if (s === "daily") return 1;
    if (s === "starter" || s === "monthly" || s === "yearly") return 2;
    if (s === "pro") return 3;
    if (s === "business" || s === "enterprise") return 4;
    return 0;
  };

  const isNavEnabled = (href: string): boolean => {
    if (!subscriptionEnforced) return true;
    const slug = NAV_MODULE_SLUG[href];
    if (!slug) return true;
    const requiredPlan = moduleRequiredPlans[slug];
    if (!requiredPlan) return true;
    if (!planInfo) return true;
    return planRank(planInfo.slug) >= planRank(requiredPlan);
  };

  const isModuleGloballyActive = (href: string): boolean => {
    const slug = NAV_MODULE_SLUG[href];
    if (!slug) return true;
    if (activeModuleSlugs === null) return true;
    return activeModuleSlugs.has(slug);
  };

  const sortedNavItems = useMemo(() => {
    if (moduleOrder.length === 0) return NAV_ITEMS;
    const noSlug = NAV_ITEMS.filter((item) => !NAV_MODULE_SLUG[item.href]);
    const withSlug = NAV_ITEMS.filter((item) => NAV_MODULE_SLUG[item.href]);
    withSlug.sort((a, b) => {
      const ai = moduleOrder.indexOf(NAV_MODULE_SLUG[a.href]);
      const bi = moduleOrder.indexOf(NAV_MODULE_SLUG[b.href]);
      const aPos = ai === -1 ? Infinity : ai;
      const bPos = bi === -1 ? Infinity : bi;
      return aPos - bPos;
    });
    return [...noSlug, ...withSlug];
  }, [moduleOrder]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/auth/login";
  };

  const handleSetupComplete = (updated: BizSettings) => {
    setSetupRequired(false);
    setSetupSettings(null);
    if (updated?.name) setBusinessName(updated.name);
  };

  const displayName = userData.name || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => {
    const collapsed = !mobile && sidebarCollapsed;
    return (
      <div
        className={`flex h-full flex-col ${mobile ? "" : collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      >
        {/* Logo */}
        <div
          className={`flex h-16 items-center border-b border-slate-700/70 ${collapsed ? "justify-center px-3" : "px-5"} flex-shrink-0`}
        >
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
              <img
                src="/app_logo.png"
                alt="Yeantrix Labs"
                className="h-full w-full object-contain"
              />
            </div>
            {!collapsed && (
              <span className="text-base font-bold text-white truncate">
                {businessName || "Yeantrix Labs"}
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto overflow-x-hidden py-4 ${collapsed ? "px-2" : "px-3"}`}
        >
          {!collapsed && (
            <p className="section-label px-3 mb-2 text-white uppercase tracking-wider text-[11px] font-semibold">
              Main
            </p>
          )}

          <div className="space-y-0.5">
            {sortedNavItems.map((item) => {
              if (!isModuleGloballyActive(item.href)) return null;
              const enabled = isNavEnabled(item.href);
              const active = isActive(item.href);

              if (!enabled) {
                return (
                  <Link
                    key={item.href}
                    href="/settings/billing"
                    onClick={() => mobile && setSidebarOpen(false)}
                    title={`Upgrade to unlock ${item.label}`}
                    className={`nav-item ${collapsed ? "justify-center" : ""} text-slate-500 hover:bg-slate-800/70`}
                  >
                    <item.icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        <Lock className="h-3 w-3 text-slate-500" />
                      </>
                    )}
                  </Link>
                );
              }
              return (
                <div
                  key={item.href}
                  className={`group/menu flex items-center rounded-xl overflow-hidden ${
                    active ? "bg-[#353d5b]" : "hover:bg-[#353d5b]"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => mobile && setSidebarOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={`nav-item group/link relative flex-1 ${collapsed ? "justify-center" : ""} ${
                      active ? "text-white" : "text-white"
                    } ${!collapsed && NAV_CREATE_ROUTES[item.href] ? "rounded-r-none" : ""}`}
                  >
                    <item.icon
                      className="h-4 w-4 flex-shrink-0 text-white"
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {active && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        )}
                      </>
                    )}
                    {collapsed && active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-white/80" />
                    )}
                  </Link>

                  {!collapsed && NAV_CREATE_ROUTES[item.href] && (
                    <Link
                      href={NAV_CREATE_ROUTES[item.href]}
                      onClick={() => mobile && setSidebarOpen(false)}
                      title={`Create ${item.label.slice(0, -1)}`}
                      aria-label={`Create ${item.label.slice(0, -1)}`}
                      className="nav-item-create flex h-9 w-9 items-center justify-center rounded-r-xl rounded-l-none border-l border-white/10 bg-[#4b5474] text-white transition-all duration-150 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Settings section */}
          <div className="mt-6">
            {!collapsed && (
              <p className="section-label px-3 mb-2 text-white uppercase tracking-wider text-[11px] font-semibold">
                Settings
              </p>
            )}
            {collapsed && <div className="my-3 border-t border-slate-700/70" />}
            <div className="space-y-0.5">
              {collapsed ? (
                <Link
                  href="/settings"
                  title="Settings"
                  className={`nav-item justify-center ${isActive("/settings") ? "nav-item-active" : "nav-item-inactive"}`}
                >
                  <Settings
                    className={`h-4 w-4 flex-shrink-0 ${isActive("/settings") ? "text-[#3f6fcc]" : "text-white"}`}
                  />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white hover:bg-[#343b5b] transition-all duration-150"
                  >
                    <Settings className="h-4 w-4 text-white flex-shrink-0" />
                    <span className="flex-1 text-left">Settings</span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 text-white transition-transform duration-200 ${settingsOpen ? "rotate-90" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {settingsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 space-y-0.5"
                      >
                        {SETTINGS_ITEMS.filter((item) => (
                          subscriptionEnforced || item.href !== "/settings/billing"
                        )).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => mobile && setSidebarOpen(false)}
                            className={`nav-item ${isActive(item.href) ? "nav-item-active" : "nav-item-inactive"}`}
                          >
                            <item.icon
                              className={`h-4 w-4 flex-shrink-0 ${isActive(item.href) ? "text-[#3f6fcc]" : "text-white"}`}
                            />
                            <span className="flex-1">{item.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* User / Plan section */}
        <div
          className={`border-t border-slate-700/70 ${collapsed ? "p-2" : "p-3"} flex-shrink-0`}
        >
          {!collapsed &&
            planInfo &&
            subscriptionEnforced &&
            (() => {
              const isPremium =
                !planInfo.isExpired && planInfo.name.toLowerCase() !== "free";
              const invoiceLimitReached =
                planInfo.invoiceLimit > 0 &&
                planInfo.invoicesUsed >= planInfo.invoiceLimit;

              if (isPremium) {
                return (
                  <div className="mb-3 rounded-2xl p-3.5 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 border border-indigo-800/60 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Crown className="h-3.5 w-3.5 text-amber-400" />
                        <p className="text-xs font-bold text-white">
                          {planInfo.name} Plan
                        </p>
                      </div>
                      <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full tracking-wide">
                        PRO
                      </span>
                    </div>
                    {planInfo.invoiceLimit > 0 && (
                      <>
                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-[11px] text-indigo-300">
                            {planInfo.invoicesUsed}/{planInfo.invoiceLimit}{" "}
                            invoices
                          </p>
                          <p className="text-[11px] font-semibold text-amber-300">
                            {Math.max(
                              0,
                              planInfo.invoiceLimit - planInfo.invoicesUsed,
                            )}{" "}
                            left
                          </p>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full rounded-full bg-indigo-800/60 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                            style={{
                              width: `${Math.min(100, (planInfo.invoicesUsed / planInfo.invoiceLimit) * 100)}%`,
                            }}
                          />
                        </div>
                      </>
                    )}
                    {planInfo.endDate && (
                      <p className="text-[11px] text-indigo-400 mt-1.5">
                        Expires{" "}
                        {new Date(planInfo.endDate).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </p>
                    )}
                    <Link
                      href="/settings/billing"
                      className="mt-2.5 block text-center rounded-xl py-1.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:from-amber-500 hover:to-amber-600 transition-all shadow-sm"
                    >
                      Manage Plan
                    </Link>
                  </div>
                );
              }

              const invoiceBarColor = invoiceLimitReached
                ? "bg-red-500"
                : planInfo.isExpired
                  ? "bg-orange-500"
                  : planInfo.invoicesUsed / planInfo.invoiceLimit >=
                      INVOICE_USAGE_WARNING_RATIO
                    ? "bg-amber-500"
                    : "bg-indigo-500";
              const invoiceTextColor = invoiceLimitReached
                ? "text-red-600"
                : planInfo.isExpired
                  ? "text-orange-600"
                  : "text-indigo-600";

              return (
                <div
                  className={`mb-3 rounded-xl p-3 border ${planInfo.isExpired ? "bg-red-50 border-red-200/80" : invoiceLimitReached ? "bg-red-50 border-red-200/80" : "bg-amber-50 border-amber-200/80"}`}
                >
                  <p className="text-xs font-semibold text-gray-800">
                    {planInfo.name} Plan
                  </p>
                  {planInfo.isExpired ? (
                    <>
                      <p className="text-xs text-red-600 font-medium mt-1">
                        Expired — free tier active
                      </p>
                      {planInfo.endDate && (
                        <p className="text-xs text-red-500 mt-0.5">
                          Expired{" "}
                          {new Date(planInfo.endDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </p>
                      )}
                    </>
                  ) : null}
                  {planInfo.invoiceLimit > 0 && (
                    <>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-xs text-gray-600">
                          {planInfo.invoicesUsed}/{planInfo.invoiceLimit}{" "}
                          invoices
                        </p>
                        <p
                          className={`text-xs font-semibold ${invoiceTextColor}`}
                        >
                          {Math.max(
                            0,
                            planInfo.invoiceLimit - planInfo.invoicesUsed,
                          )}{" "}
                          left
                        </p>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${invoiceBarColor}`}
                          style={{
                            width: `${Math.min(100, (planInfo.invoicesUsed / planInfo.invoiceLimit) * 100)}%`,
                          }}
                        />
                      </div>
                    </>
                  )}
                  {!planInfo.isExpired && planInfo.endDate && (
                    <p className="text-xs text-gray-400 mt-1">
                      Expires{" "}
                      {new Date(planInfo.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
                  {!planInfo.isExpired && planInfo.customerLimit > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {planInfo.customersUsed}/{planInfo.customerLimit}{" "}
                      customers
                    </p>
                  )}
                  <Link
                    href="/settings/billing"
                    className={`mt-2 block text-center rounded-lg py-1.5 text-xs font-semibold text-white transition-colors ${planInfo.isExpired ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"}`}
                  >
                    {planInfo.isExpired ? "Renew Plan" : "Upgrade"}
                  </Link>
                </div>
              );
            })()}

          {/* User row */}
          <div
            className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : "px-1 mb-2"}`}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-white">
              {businessLogo ? (
                <img
                  src={businessLogo}
                  alt={businessName || "Business"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-white text-xs font-bold">{initials}</span>
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-100 truncate">
                  {displayName}
                </p>
                {userData.email && (
                  <p className="text-[11px] text-slate-400 truncate">
                    {userData.email}
                  </p>
                )}
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all duration-150"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          )}
          {collapsed && (
            <button
              onClick={handleLogout}
              title="Log out"
              className="flex items-center justify-center rounded-xl p-2 text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all w-full mt-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${themeStyles.gstModuleTheme} ${theme === "dark" ? themeStyles.dark : ""} flex h-screen bg-gray-50/80 overflow-hidden print:block print:h-auto print:overflow-visible print:bg-white`}
    >
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-700/70 bg-[#111a35] print:hidden transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"} relative`}
        style={{ flexShrink: 0 }}
      >
        <Sidebar />
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed((c) => !c)}
          className="absolute -right-3 top-20 z-10 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-[#1b2646] shadow-sm text-slate-300 hover:text-white hover:shadow-md transition-all duration-150"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="h-3 w-3" />
          ) : (
            <PanelLeftClose className="h-3 w-3" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="print:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#111a35] shadow-xl lg:hidden"
            >
              <div className="absolute right-3 top-3">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-xl p-2 text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Sidebar mobile />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden print:block print:overflow-visible">
        {/* Top bar */}
        <header
          className="flex h-16 items-center border-b border-gray-100 bg-white px-4 lg:px-6 gap-3 print:hidden flex-shrink-0"
          style={{ boxShadow: "0 1px 0 0 rgb(0 0 0 / 0.04)" }}
        >
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Global Search */}
          <GlobalSearch />

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 transition-colors"
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>

            {(() => {
              const invoiceBlocked =
                (subscriptionEnforced && planInfo?.isExpired) ||
                (planInfo?.invoiceLimit != null &&
                  subscriptionEnforced &&
                  planInfo.invoiceLimit > 0 &&
                  planInfo.invoicesUsed >= planInfo.invoiceLimit);
              return invoiceBlocked ? (
                <Link
                  href="/settings/billing"
                  aria-disabled="true"
                  title={
                    planInfo?.isExpired
                      ? "Plan expired — renew to create invoices"
                      : "Invoice limit reached — upgrade to create more"
                  }
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 py-2 text-sm font-semibold text-gray-400 pointer-events-none"
                >
                  <Lock className="h-3.5 w-3.5" />
                  New Invoice
                </Link>
              ) : (
                <Link
                  href="/invoices/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-150 active:scale-95"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Invoice
                </Link>
              );
            })()}

            <button className="relative rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 ring-2 ring-gray-100 cursor-pointer hover:ring-indigo-200 transition-all">
              {businessLogo ? (
                <img
                  src={businessLogo}
                  alt={businessName || "Business Logo"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-white text-xs font-bold">{initials}</span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Business Profile Setup Modal */}
      {setupRequired && setupSettings && (
        <BusinessProfileSetupModal
          settings={setupSettings}
          onComplete={handleSetupComplete}
        />
      )}
    </div>
  );
}
