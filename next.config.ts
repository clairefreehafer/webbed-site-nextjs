import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // generate a static export in `out` folder.
  output: "export",
  // cannot use optimized images with static export
  images: { unoptimized: true },

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
