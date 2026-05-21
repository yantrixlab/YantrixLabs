import prisma from "./prisma";

const SUBSCRIPTION_CONTROL_KEY = "subscription_control";

export async function isSubscriptionEnforced(): Promise<boolean> {
  const config = await prisma.siteConfig.findUnique({
    where: { key: SUBSCRIPTION_CONTROL_KEY },
    select: { primaryBtnLabel: true },
  });

  if (!config?.primaryBtnLabel) return true;
  return config.primaryBtnLabel.toLowerCase() !== "disabled";
}

export { SUBSCRIPTION_CONTROL_KEY };
