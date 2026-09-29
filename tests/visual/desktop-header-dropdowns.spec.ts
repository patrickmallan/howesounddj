import { expect, test } from "@playwright/test";

const groups = [
  { name: "Weddings", first: "Overview", href: "/weddings", count: 4, accent: "#19dfff" },
  { name: "Squamish", first: "Venues", href: "/venues", count: 3, accent: "#ff313f" },
  { name: "Journal", first: "Guides", href: "/guides", count: 2, accent: "#b6ff22" },
] as const;

for (const width of [1280, 1440]) {
  test(`desktop channel menus stay styled and usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "load" });

    for (const group of groups) {
      const trigger = page.getByRole("button", { name: group.name, exact: true });
      await trigger.hover();
      const panel = page.getByRole("menu", { name: group.name });
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("menuitem")).toHaveCount(group.count);
      await expect(panel).toHaveCSS("--channel-color", group.accent);

      const bounds = await panel.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);

      await panel.getByRole("menuitem", { name: new RegExp(`^${group.first}`) }).click();
      await expect(page).toHaveURL(new RegExp(`${group.href}$`));
      await page.goto("/", { waitUntil: "load" });
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
