import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow this Mac's Tailscale addresses for development previews on other devices.
  allowedDevOrigins: ["100.120.123.0", "taylors-macbook-pro.tail4d1dcc.ts.net"],
};

export default nextConfig;
