## 2024-05-18 - IP Spoofing in Rate Limiter
**Vulnerability:** The API's rate limiter was blindly trusting user-provided HTTP headers (`x-forwarded-for` and `x-real-ip`) for the `keyGenerator` function to identify the client IP.
**Learning:** This is a classic IP spoofing vulnerability because an attacker can easily forge these headers to bypass rate limiting or pretend to be coming from a different network, unless explicitly behind a trusted proxy.
**Prevention:** Use `getConnInfo(c).remote.address` from `@hono/node-server/conninfo` to get the actual socket connection IP address as the default source. Only trust proxy headers like `x-forwarded-for` or `x-real-ip` when explicitly configured via a flag (e.g., `process.env.TRUST_PROXY === 'true'`).
