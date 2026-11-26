import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("primary navigation and detail routes", async ({ page, isMobile }) => {
  await page.goto("/");
  const hero = page.getByRole("heading", { level: 1 });
  await expect(hero).toContainText("Engineering complex steel structures.");
  if (isMobile) {
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await trigger.click();
  }
  const nav = page.getByRole("navigation", { name: isMobile ? "Mobile navigation" : "Main navigation", exact: true });
  await nav.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL("/services");

  await page.locator(".service-card").filter({ hasText: "Steel Fabrication" }).getByRole("link").click();
  await expect(page).toHaveURL("/services/steel-fabrication");
  await expect(hero).toHaveText("Steel Fabrication");
  await page.getByRole("link", { name: "Enquire About This Service" }).click();
  await expect(page).toHaveURL("/contact?type=Fabrication#enquiry");
  await expect(page.getByLabel("Enquiry type")).toHaveValue("Fabrication");

  await page.goto("/projects");
  await page.getByRole("button", { name: "Aviation", exact: true }).click();
  await expect(page.getByRole("button", { name: "Aviation", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator(".project-card").filter({ hasText: "Dubai International Airport Concourse IV" }).getByRole("link").click();
  await expect(hero).toHaveText("Dubai International Airport Concourse IV");
  await expect(page.getByText("Dar Al Handasah", { exact: true })).toBeVisible();
  await page.locator(".contact-band").getByRole("link", { name: "Project Enquiry" }).click();
  await expect(page.getByLabel("Enquiry type")).toHaveValue("Project Enquiry");
});

test("gallery opens, moves between images and restores focus", async ({ page, isMobile }) => {
  await page.goto("/projects#gallery");
  const tile = page.getByRole("button", { name: "View photo: Dubai Creek Residences" });
  await tile.click();
  const viewer = page.getByRole("dialog", { name: "Project photo viewer" });
  await expect(viewer).toBeVisible();
  if (isMobile) {
    await viewer.locator(".lightbox-image").evaluate((target) => {
      const first = new Touch({ identifier: 1, target, clientX: 230, clientY: 180 });
      const last = new Touch({ identifier: 1, target, clientX: 80, clientY: 180 });
      target.dispatchEvent(new TouchEvent("touchstart", { touches: [first], bubbles: true }));
      target.dispatchEvent(new TouchEvent("touchend", { changedTouches: [last], bubbles: true }));
    });
  } else {
    await page.keyboard.press("ArrowRight");
  }
  await expect(viewer.getByRole("img", { name: "Al Habtoor Palace" })).toBeVisible();
  await viewer.getByRole("button", { name: "Close gallery" }).click();
  await expect(viewer).not.toBeVisible();
  await expect(tile).toBeFocused();
});

test("contact validates and prepares a complete email draft without a provider", async ({ page, request }) => {
  await page.goto("/contact");
  const prepare = page.getByRole("button", { name: "Prepare email draft" });
  await prepare.click();
  await expect(page.locator(".enquiry-form").getByRole("alert")).toHaveText("Check the highlighted fields.");
  await expect(page.getByRole("textbox", { name: "Name" })).toBeFocused();

  const message = "This is a website validation check.";
  await page.getByLabel("Name").fill("QA Test");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Enquiry type").selectOption("Project Enquiry");
  await page.getByLabel("Message").fill(message);
  await prepare.click();

  await expect(page.getByRole("heading", { name: "Your email draft is ready" })).toBeFocused();
  await expect(page.getByLabel("Draft message")).toHaveValue(new RegExp(message));
  const link = new URL((await page.getByRole("link", { name: "Open email app" }).getAttribute("href"))!);
  expect(link.protocol).toBe("mailto:");
  expect(link.pathname).toBe("info@yms-uae.com");
  expect(link.searchParams.get("subject")).toContain("Project Enquiry");
  expect(link.searchParams.get("body")).toContain(message);

  await page.getByRole("textbox", { name: /^Message/ }).fill("Updated enquiry for the next draft.");
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveCount(0);

  const api = await request.post("/api/enquiry", { data: { name: "QA Test", email: "qa@example.com", type: "Project Enquiry", message } });
  expect(api.status()).toBe(503);
});

test("contact map opens on demand and shares its location with directions", async ({ page }) => {
  await page.route("https://maps.google.com/**", (route) => route.fulfill({ body: "<title>Map test fixture</title>", contentType: "text/html" }));
  await page.goto("/contact");
  const map = page.locator(".contact-map");
  const directions = new URL((await map.getByRole("link", { name: "Get directions" }).getAttribute("href"))!);
  const frame = map.locator("iframe");
  await expect(frame).toHaveCount(0);
  await map.getByRole("button", { name: "Load Google Maps" }).click();
  await expect(frame).toBeVisible();
  const embed = new URL((await frame.getAttribute("src"))!);
  expect(embed.searchParams.get("q")).toBe(directions.searchParams.get("destination"));
});

test("contact reveals loading and success when delivery is accepted", async ({ page }) => {
  const configuredURL = process.env.PLAYWRIGHT_CONFIGURED_URL || (process.env.PLAYWRIGHT_BASE_URL ? "" : "http://127.0.0.1:3103");
  test.skip(!configuredURL, "Requires the configured test instance.");
  let confirmDelivery: () => void = () => {};
  const acknowledgement = new Promise<void>((resolve) => { confirmDelivery = resolve; });
  let attempt = 0;
  await page.route("**/api/enquiry", async (route) => {
    attempt += 1;
    if (attempt === 1) {
      await route.fulfill({ status: 502, json: { message: "We couldn’t send your enquiry." } });
      return;
    }
    await acknowledgement;
    await route.fulfill({ status: 201, json: { message: "Your enquiry has been sent." } });
  });

  await page.goto(configuredURL + "/contact");
  await page.getByLabel("Name").fill("QA Test");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Enquiry type").selectOption("General Enquiry");
  await page.getByLabel("Message").fill("This is a website validation check.");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("link", { name: "Open email app" })).toBeVisible();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  confirmDelivery();
  await expect(page.getByRole("status")).toContainText("Your enquiry has been sent.");
  await expect(page.getByLabel("Message")).toHaveValue("");
});

test("server validates fields and blocks cross-origin submissions", async ({ request }) => {
  const invalid = await request.post("/api/enquiry", { data: { email: "not-an-email", type: "unknown" } });
  expect(invalid.status()).toBe(422);
  expect((await invalid.json()).errors).toMatchObject({ email: "Enter a valid email address.", type: "Choose an enquiry type." });
  const crossOrigin = await request.post("/api/enquiry", { headers: { Origin: "https://example.org" }, data: {} });
  expect(crossOrigin.status()).toBe(403);
});

test("permanent legacy redirects and custom 404", async ({ request, page }) => {
  const redirects = [
    ["/about-us", "/about"],
    ["/what-we-do", "/facilities"],
    ["/fabrication", "/services/steel-fabrication"],
    ["/project-list", "/projects"],
    ["/copy-of-disclaimer", "/qhse"],
    ["/copy-of-quality-policy", "/disclaimer"],
    ["/copy-of-career", "/career#vacancies"],
  ];
  for (const [from, to] of redirects) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(to);
  }
  const response = await page.goto("/projects/project-that-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page unavailable");
});

test("sitemap routes render and internal links are covered", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The sitemap and response metadata are viewport-independent.");
  const sitemap = await request.get("/sitemap.xml");
  const urls = [...(await sitemap.text()).matchAll(/<loc>(https:\/\/www\.ymsengineering\.com[^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toHaveLength(55);
  const paths = new Set(urls.map((url) => new URL(url).pathname));
  const titles = new Set<string>();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    const html = await response.text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    expect(title, path).toBeTruthy();
    expect(titles.has(title!), path).toBeFalsy();
    titles.add(title!);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical ? new URL(canonical).href : undefined, path).toBe(url);
    expect(html, path).toContain('property="og:title"');
    expect(html, path).toContain('name="description"');
    expect(html.match(/<h1[ >]/g), path).toHaveLength(1);
    for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"]*)"/g)) {
      expect(paths.has(href.split(/[#?]/)[0]), path + " → " + href).toBeTruthy();
    }
  }
  expect(await (await request.get("/robots.txt")).text()).toContain("https://www.ymsengineering.com/sitemap.xml");
});

test("layout has no horizontal overflow at target widths", async ({ page, isMobile }) => {
  const widths = isMobile ? [360, 390, 430, 768] : [1024, 1366, 1440, 1920];
  for (const path of ["/", "/about", "/services", "/facilities", "/facilities/machinery-equipment", "/services/design-engineering", "/projects", "/projects/damac-bay-2", "/contact", "/qhse"]) {
    await page.goto(path);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path + " at " + width).toBeTruthy();
    }
  }
});

test("key photos load and key pages pass basic accessibility scans", async ({ page }) => {
  for (const path of ["/", "/projects", "/projects/al-habtoor-tower", "/facilities/machinery-equipment", "/services/design-engineering", "/contact"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    if (path !== "/contact") {
      const heroImage = page.locator("main section").first().locator("img").first();
      await expect.poll(() => heroImage.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
    }
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), path).toEqual([]);
  }
});

test("contact provides a direct-email fallback without JavaScript", async ({ browser, baseURL, isMobile }) => {
  test.skip(isMobile, "The no-script fallback is viewport-independent.");
  const page = await browser.newPage({ javaScriptEnabled: false });
  try {
    await page.goto(baseURL + "/contact");
    await expect(page.locator(".form-panel").getByRole("link", { name: "info@yms-uae.com" })).toHaveAttribute("href", "mailto:info@yms-uae.com");
    await expect(page.locator(".enquiry-form")).not.toBeVisible();
  } finally {
    await page.close();
  }
});

test("signature projects distinguish project imagery and scope", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#projects .project-card");
  await expect(cards.locator("h3")).toHaveText([
    "Al Habtoor Tower", "DAMAC Bay 2", "25hours Heimat",
    "Al Habtoor Grand Residences", "Burj Azizi Site Bridge", "City Walk Bridge Gantry",
  ]);
  await expect(page.getByText("Depending on project type.", { exact: true })).toBeVisible();
  await cards.first().getByRole("link").click();
  await expect(page).toHaveURL("/projects/al-habtoor-tower");
  await expect(page.getByText("Steel embedments for outriggers.", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fabrication", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Installation / Site Works", exact: true })).toBeVisible();
  const tile = page.getByRole("button", { name: "View photo: Architectural render of Al Habtoor Tower" });
  await tile.click();
  const dialog = page.getByRole("dialog", { name: "Project photo viewer" });
  await expect(dialog.getByRole("img", { name: "Architectural render of Al Habtoor Tower" })).toBeVisible();
  await dialog.getByRole("button", { name: "Close gallery" }).click();
  await expect(tile).toBeFocused();
});
