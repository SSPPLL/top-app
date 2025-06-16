import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: 'export',
	images: {
		remotePatterns: [new URL(`https://old-images.hb.ru-msk.vkcs.cloud/uploads/**`)],
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