module.exports = {
  apps : [{
    name   : "leana-portfolio",
    script : "npm",
    args   : "start",
    env: {
      PORT: 9942,
      NODE_ENV: "production"
    }
  }]
}