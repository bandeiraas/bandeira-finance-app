# Sentinel Journal - Security Learnings

This journal records critical security learnings, patterns, and decisions for the Bandeira Finance project.

## 2024-05-24 - [Unrestricted File Upload]
**Vulnerability:** The `ProfileService.uploadAvatar` method accepted any file type and size without validation, potentially allowing attackers to upload malicious scripts (e.g., SVG/HTML for XSS) or large files (DoS).
**Learning:** File upload endpoints must always validate MIME types and file sizes on the server side, even if client-side validation exists. Relying on `file.type` is a first step, but "magic bytes" inspection is preferred for high-security contexts.
**Prevention:** Implemented strict allowlist for MIME types (`image/jpeg`, `image/png`, `image/webp`) and a 5MB size limit using `ValidationError` to reject invalid uploads early.
