-- Durable share tokens for live doc links (Google-docs-style sharing).
-- NULL = the doc has never been shared. The editor token grants live editing,
-- the viewer token watching; either token also unlocks the anonymous at-rest
-- snapshot read (GET /docs/:id/shared). Lookups ride the id PK — no index.
ALTER TABLE documents ADD COLUMN editor_token TEXT;
ALTER TABLE documents ADD COLUMN viewer_token TEXT;
