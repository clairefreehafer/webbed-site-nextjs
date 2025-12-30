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

export function slugify(string: string): string {
  return string.replaceAll(" & ", "-and-").replaceAll(" ", "-");
}

export function deslugify(string: string): string {
  return string.replaceAll("-and-", " & ").replaceAll("-", " ");
}
