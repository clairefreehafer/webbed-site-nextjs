import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import type { SourceSpan } from "sass";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // generate a static export in `out` folder.
  output: "export",
  // cannot use optimized images with static export
  images: { unoptimized: true },

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  sassOptions: {
    logger: {
      warn: function (message: string, options: { span: SourceSpan }) {
        const file = options.span.url?.toString().split("sass")[1] ?? "";
        console.log(`[${file}] ${message}`);
      },
      debug: function (message: string, options: { span: SourceSpan }) {
        const file = options.span.url?.toString().split("sass")[1] ?? "";
        console.log(`[${file}] ${message}`);
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });

    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
