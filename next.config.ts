import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: 'export',
	images: {
		remotePatterns: [new URL(`${process.env.PRODUCTS_IMAGES_PATH}**`)],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});
		return config;
	}
};

export default nextConfig;