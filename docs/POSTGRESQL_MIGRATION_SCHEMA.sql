-- ==============================================================================
-- BeautifulAIPrompt.com - Phase 2 PostgreSQL Migration Schema
-- ==============================================================================
-- This schema maps 1:1 with the static TypeScript architecture defined in:
--   - src/types/prompt.ts
--   - src/types/category.ts
--   - src/types/collection.ts
--   - src/types/model.ts
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Enumerated Types
CREATE TYPE prompt_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE variable_type AS ENUM ('text', 'textarea', 'select');

-- 3. AI Models Table
CREATE TABLE IF NOT EXISTS ai_models (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'chatgpt', 'claude', 'gemini'
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    badge_color VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'career', 'coding', 'react'
    slug VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 0,
    subcategories TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Prompts Table
CREATE TABLE IF NOT EXISTS prompts (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'p-career-001'
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    short_description VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    subcategory VARCHAR(100),
    tags TEXT[] NOT NULL DEFAULT '{}',
    prompt TEXT NOT NULL,
    
    -- Variables schema stored as JSONB: Array of { name, label, description, placeholder, required, type, options, defaultValue }
    variables JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- Example test arguments: Object of { [var_name]: string }
    example_input JSONB NOT NULL DEFAULT '{}'::jsonb,
    example_output TEXT NOT NULL,
    
    use_cases TEXT[] NOT NULL DEFAULT '{}',
    difficulty prompt_difficulty NOT NULL DEFAULT 'intermediate',
    compatible_models VARCHAR(50)[] NOT NULL DEFAULT '{}',
    
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    trending BOOLEAN NOT NULL DEFAULT FALSE,
    
    related_prompt_ids VARCHAR(50)[] NOT NULL DEFAULT '{}',
    
    -- Presentation & Analytics
    copy_count INT NOT NULL DEFAULT 0,
    save_count INT NOT NULL DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT NULL,
    rating_count INT NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Collections Table
CREATE TABLE IF NOT EXISTS collections (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'col-swe-accelerator'
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Collection Items (Relational Join Table)
CREATE TABLE IF NOT EXISTS collection_prompts (
    collection_id VARCHAR(50) NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    prompt_id VARCHAR(50) NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
    display_order INT NOT NULL DEFAULT 0,
    PRIMARY KEY (collection_id, prompt_id)
);

-- ==============================================================================
-- Indexes for Sub-Millisecond Queries
-- ==============================================================================

-- Prompts indexing
CREATE INDEX IF NOT EXISTS idx_prompts_category_id ON prompts(category_id);
CREATE INDEX IF NOT EXISTS idx_prompts_difficulty ON prompts(difficulty);
CREATE INDEX IF NOT EXISTS idx_prompts_featured ON prompts(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_prompts_trending ON prompts(trending) WHERE trending = TRUE;
CREATE INDEX IF NOT EXISTS idx_prompts_tags ON prompts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_prompts_models ON prompts USING GIN(compatible_models);
CREATE INDEX IF NOT EXISTS idx_prompts_variables ON prompts USING GIN(variables);

-- Full text search indexing
CREATE INDEX IF NOT EXISTS idx_prompts_title_trgm ON prompts USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_prompts_fts ON prompts USING GIN(
    to_tsvector('english', title || ' ' || short_description || ' ' || description)
);

-- Categories indexing
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_featured ON categories(featured) WHERE featured = TRUE;

-- Collections indexing
CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);

-- ==============================================================================
-- Automatic updated_at Trigger
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prompts_updated_at
    BEFORE UPDATE ON prompts
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_collections_updated_at
    BEFORE UPDATE ON collections
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
