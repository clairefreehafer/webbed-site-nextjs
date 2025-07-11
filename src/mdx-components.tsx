import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => {
      if (props.href.startsWith("http")) {
        return <a {...props} target="_blank" />;
      }
      return <Link {...props} />;
    },
    ...components,
  };
}
