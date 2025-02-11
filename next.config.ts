import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // generate a static export in `out` folder.
  output: "export",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
