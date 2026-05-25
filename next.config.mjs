/** @type {import('next').NextConfig} */
const nextConfig = {
  //Тут встроенный вебпак
  webpack: (config, { buildId, isServer, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.BUILD_ID": JSON.stringify(buildId),
      })
    )
    console.log(`[Webpack Config] Build ID: ${buildId}, Is Server: ${isServer}`)
    return config
  },
}

export default nextConfig
