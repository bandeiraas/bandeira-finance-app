## 2024-05-15 - Avatar Upload Vulnerability
**Vulnerability:** The profile service's `uploadAvatar` method accepted files without validating their MIME type or size, allowing potential uploads of executable scripts, large files (DoS), or malicious HTML (Stored XSS).
**Learning:** File uploads must always be strictly validated for allowed types and reasonable size limits at the service layer, before storage operations begin.
**Prevention:** Implement strict MIME type whitelisting and enforce size constraints using `ValidationError` for any file processing endpoints.
