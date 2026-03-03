## 2024-05-24 - IP Spoofing Vulnerability in Rate Limiter
**Vulnerability:** The rate limiter relied completely on client-provided headers (`x-forwarded-for` and `x-real-ip`) for IP address identification, without any validation or proxy trust verification. An attacker could spoof these headers to bypass rate limiting completely.
**Learning:** Never trust client-provided headers for critical security controls like rate limiting or authentication without explicitly verifying that the request came from a trusted proxy (e.g. configuring `TRUST_PROXY=true` when behind Cloudflare, Nginx, or an API Gateway).
**Prevention:** Use `getConnInfo(c).remote.address` for raw IP identification in Hono. Only fall back to headers like `x-forwarded-for` if `process.env.TRUST_PROXY === 'true'`.
