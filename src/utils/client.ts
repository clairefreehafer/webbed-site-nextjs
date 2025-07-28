export function getActiveNavLink(currentUrl: string, pageUrl: string) {
  const currentSection = currentUrl.split("/")[1];

  if (pageUrl === "/" && !currentSection) {
    return "active";
  }

  if (currentSection === pageUrl.replace("/", "")) {
    return "active";
  }
  return "";
}
