
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

ALTER SCHEMA "public" OWNER TO "postgres";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE VIEW "public"."products_view" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "title",
    NULL::"text" AS "description",
    NULL::"text"[] AS "categories",
    NULL::"text" AS "url",
    NULL::"text" AS "github_url",
    NULL::"text" AS "twitter",
    NULL::"text" AS "instagram",
    NULL::"text"[] AS "images",
    NULL::"text" AS "slug",
    NULL::"text"[] AS "supabase_features",
    NULL::boolean AS "approved",
    NULL::timestamp without time zone AS "created_at",
    NULL::bigint AS "views",
    NULL::"text"[] AS "image_keys";

ALTER TABLE "public"."products_view" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_hacktoberfest_tags"() RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view 
      where 'Hacktoberfest' % any(categories) 
      ;
end; $$;

ALTER FUNCTION "public"."get_hacktoberfest_tags"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_monthly"("month_number" integer) RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view where extract(month from created_at) = month_number and extract(year from created_at) = 2023;
end; $$;

ALTER FUNCTION "public"."get_monthly"("month_number" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_monthly"("month_string" "text") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view where extract(month from created_at) = month_string ;
end; $$;

ALTER FUNCTION "public"."get_monthly"("month_string" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_related_products"("parent_id" "uuid") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view where id <> parent_id order by random();
end; $$;

ALTER FUNCTION "public"."get_related_products"("parent_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_related_products_v2"("product_slug" "text") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM products_view p
    WHERE p.slug <> product_slug
    ORDER BY similarity(p.description, (SELECT description FROM products_view WHERE slug = product_slug)) DESC
    LIMIT 6;
END;
$$;

ALTER FUNCTION "public"."get_related_products_v2"("product_slug" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_search_result"("search_term" "text") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view where to_tsvector(description || ' ' || title) @@ to_tsquery(search_term);
end; $$;

ALTER FUNCTION "public"."get_search_result"("search_term" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_supabase_tags"("tag" "text") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$
begin
  return query 
    select * from products_view where tag like any(supabase_features);
end; $$;

ALTER FUNCTION "public"."get_supabase_tags"("tag" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_tags"("tag" "text") RETURNS SETOF "public"."products_view"
    LANGUAGE "plpgsql"
    AS $$begin
  return query 
    select * from products_view where categories @> array[tag];
end;$$;

ALTER FUNCTION "public"."get_tags"("tag" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."hacktoberfest_count"() RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
begin
  return (select count(*) from products where 'Hacktoberfest' % any(categories));
end; $$;

ALTER FUNCTION "public"."hacktoberfest_count"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."submission_count"("tag" "text") RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
begin
  return (select count(*) from hackathon_view where tag=any(categories));
end; 
 $$;

ALTER FUNCTION "public"."submission_count"("tag" "text") OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."bring_the_func_view" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "title",
    NULL::"text" AS "description",
    NULL::"text"[] AS "categories",
    NULL::"text" AS "url",
    NULL::"text" AS "github_url",
    NULL::"text" AS "twitter",
    NULL::"text" AS "instagram",
    NULL::"text"[] AS "images",
    NULL::"text" AS "slug",
    NULL::"text"[] AS "supabase_features",
    NULL::boolean AS "approved",
    NULL::timestamp without time zone AS "created_at",
    NULL::bigint AS "views";

ALTER TABLE "public"."bring_the_func_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."flutter_hackathon_view" AS
 SELECT "products_view"."id",
    "products_view"."title",
    "products_view"."description",
    "products_view"."categories",
    "products_view"."url",
    "products_view"."github_url",
    "products_view"."twitter",
    "products_view"."instagram",
    "products_view"."images",
    "products_view"."slug",
    "products_view"."supabase_features",
    "products_view"."approved",
    "products_view"."created_at",
    "products_view"."views"
   FROM "public"."products_view"
  WHERE ('Flutter Hackathon'::"text" = ANY ("products_view"."categories"));

ALTER TABLE "public"."flutter_hackathon_view" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."forms" (
    "id" bigint NOT NULL,
    "email" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."forms" OWNER TO "postgres";

ALTER TABLE "public"."forms" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."forms_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text",
    "email" "text",
    "description" "text",
    "categories" "text"[],
    "url" "text",
    "github_url" "text",
    "twitter" "text",
    "instagram" "text",
    "images" "text"[],
    "slug" "text",
    "supabase_features" "text"[],
    "approved" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "team_info" "jsonb"[],
    "image_keys" "text"[]
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."hackathon_view" AS
 SELECT "products"."id",
    "products"."categories"
   FROM "public"."products";

ALTER TABLE "public"."hackathon_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."hacktoberfest_count" AS
 SELECT "count"(*) AS "count"
   FROM "public"."products"
  WHERE ('Hacktoberfest'::"text" OPERATOR("extensions".%) ANY ("products"."categories"));

ALTER TABLE "public"."hacktoberfest_count" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."hacktoberfest_view" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "title",
    NULL::"text" AS "description",
    NULL::"text"[] AS "categories",
    NULL::"text" AS "url",
    NULL::"text" AS "github_url",
    NULL::"text" AS "twitter",
    NULL::"text" AS "instagram",
    NULL::"text"[] AS "images",
    NULL::"text" AS "slug",
    NULL::"text"[] AS "supabase_features",
    NULL::boolean AS "approved",
    NULL::timestamp without time zone AS "created_at",
    NULL::bigint AS "views";

ALTER TABLE "public"."hacktoberfest_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."holiday_hackdays_view" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "title",
    NULL::"text" AS "description",
    NULL::"text"[] AS "categories",
    NULL::"text" AS "url",
    NULL::"text" AS "github_url",
    NULL::"text" AS "twitter",
    NULL::"text" AS "instagram",
    NULL::"text"[] AS "images",
    NULL::"text" AS "slug",
    NULL::"text"[] AS "supabase_features",
    NULL::boolean AS "approved",
    NULL::timestamp without time zone AS "created_at",
    NULL::bigint AS "views";

ALTER TABLE "public"."holiday_hackdays_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."launch-week-hackathon-8" (
    "user_id" "uuid" NOT NULL,
    "allowed_email" boolean
);

ALTER TABLE "public"."launch-week-hackathon-8" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."launch-week-hackathon-x" (
    "user_id" "uuid" NOT NULL,
    "allowed_email" boolean
);

ALTER TABLE "public"."launch-week-hackathon-x" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."launch_week_5_view" AS
 SELECT "products_view"."id",
    "products_view"."title",
    "products_view"."description",
    "products_view"."categories",
    "products_view"."url",
    "products_view"."github_url",
    "products_view"."twitter",
    "products_view"."instagram",
    "products_view"."images",
    "products_view"."slug",
    "products_view"."supabase_features",
    "products_view"."approved",
    "products_view"."created_at",
    "products_view"."views"
   FROM "public"."products_view"
  WHERE ('Launch Week 5'::"text" = ANY ("products_view"."categories"));

ALTER TABLE "public"."launch_week_5_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."launch_week_6_view" AS
 SELECT "products_view"."id",
    "products_view"."title",
    "products_view"."description",
    "products_view"."categories",
    "products_view"."url",
    "products_view"."github_url",
    "products_view"."twitter",
    "products_view"."instagram",
    "products_view"."images",
    "products_view"."slug",
    "products_view"."supabase_features",
    "products_view"."approved",
    "products_view"."created_at",
    "products_view"."views"
   FROM "public"."products_view"
  WHERE ('Launch Week 6'::"text" = ANY ("products_view"."categories"));

ALTER TABLE "public"."launch_week_6_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."launch_week_7_view" AS
 SELECT "products_view"."id",
    "products_view"."title",
    "products_view"."description",
    "products_view"."categories",
    "products_view"."url",
    "products_view"."github_url",
    "products_view"."twitter",
    "products_view"."instagram",
    "products_view"."images",
    "products_view"."slug",
    "products_view"."supabase_features",
    "products_view"."approved",
    "products_view"."created_at",
    "products_view"."views"
   FROM "public"."products_view"
  WHERE ('Launch Week 7'::"text" = ANY ("products_view"."categories"));

ALTER TABLE "public"."launch_week_7_view" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."launch_week_x_view" AS
 SELECT "products_view"."id",
    "products_view"."title",
    "products_view"."description",
    "products_view"."categories",
    "products_view"."url",
    "products_view"."github_url",
    "products_view"."twitter",
    "products_view"."instagram",
    "products_view"."images",
    "products_view"."slug",
    "products_view"."supabase_features",
    "products_view"."approved",
    "products_view"."created_at",
    "products_view"."views",
    "products_view"."image_keys"
   FROM "public"."products_view"
  WHERE ('Launch Week X'::"text" = ANY ("products_view"."categories"));

ALTER TABLE "public"."launch_week_x_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."open-source-hackathon" (
    "user_id" "uuid" NOT NULL,
    "allowed_email" boolean
);

ALTER TABLE "public"."open-source-hackathon" OWNER TO "postgres";

COMMENT ON TABLE "public"."open-source-hackathon" IS 'Open Source Hackathon';

CREATE OR REPLACE VIEW "public"."tags_view" AS
 SELECT "s"."tags",
    "count"(*) AS "count"
   FROM ( SELECT "unnest"("products"."categories") AS "tags"
           FROM "public"."products"
          WHERE ("products"."approved" = true)) "s"
  GROUP BY "s"."tags";

ALTER TABLE "public"."tags_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."views" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "ip_address" "text",
    "product_id" "uuid"
);

ALTER TABLE "public"."views" OWNER TO "postgres";

ALTER TABLE ONLY "public"."forms"
    ADD CONSTRAINT "forms_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."launch-week-hackathon-8"
    ADD CONSTRAINT "launch-week-hackathon-8_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."launch-week-hackathon-x"
    ADD CONSTRAINT "launch-week-hackathon-x_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."open-source-hackathon"
    ADD CONSTRAINT "open-source-hackathon_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_slug_key" UNIQUE ("slug");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_title_key" UNIQUE ("title");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE VIEW "public"."products_view" AS
 SELECT "products"."id",
    "products"."title",
    "products"."description",
    "products"."categories",
    "products"."url",
    "products"."github_url",
    "products"."twitter",
    "products"."instagram",
    "products"."images",
    "products"."slug",
    "products"."supabase_features",
    "products"."approved",
    "products"."created_at",
    "count"("views"."id") AS "views",
    "products"."image_keys"
   FROM ("public"."products"
     LEFT JOIN "public"."views" ON (("products"."id" = "views"."product_id")))
  WHERE ("products"."approved" = true)
  GROUP BY "products"."id";

CREATE OR REPLACE VIEW "public"."bring_the_func_view" AS
 SELECT "products"."id",
    "products"."title",
    "products"."description",
    "products"."categories",
    "products"."url",
    "products"."github_url",
    "products"."twitter",
    "products"."instagram",
    "products"."images",
    "products"."slug",
    "products"."supabase_features",
    "products"."approved",
    "products"."created_at",
    "count"("views"."id") AS "views"
   FROM ("public"."products"
     LEFT JOIN "public"."views" ON (("products"."id" = "views"."product_id")))
  WHERE (('Bring the func'::"text" OPERATOR("extensions".%) ANY ("products"."categories")) AND ("products"."id" <> ALL (ARRAY['67db71ab-867e-403d-8885-991760c29386'::"uuid", '80889e84-06ed-44ee-a6d6-637975fa523c'::"uuid", '6cf421d5-3a2c-45c2-a220-37d771e24deb'::"uuid", '68b1d4d6-3bbf-43b9-85e3-fabadce1655d'::"uuid", '4f482a70-3a46-44f8-b791-ba7325d5f22b'::"uuid", '827679e3-feb7-4615-ad67-f07eecb1b540'::"uuid"])))
  GROUP BY "products"."id";

CREATE OR REPLACE VIEW "public"."hacktoberfest_view" AS
 SELECT "products"."id",
    "products"."title",
    "products"."description",
    "products"."categories",
    "products"."url",
    "products"."github_url",
    "products"."twitter",
    "products"."instagram",
    "products"."images",
    "products"."slug",
    "products"."supabase_features",
    "products"."approved",
    "products"."created_at",
    "count"("views"."id") AS "views"
   FROM ("public"."products"
     LEFT JOIN "public"."views" ON (("products"."id" = "views"."product_id")))
  WHERE (('Hacktoberfest'::"text" OPERATOR("extensions".%) ANY ("products"."categories")) AND ("products"."id" <> ALL (ARRAY['633da892-5329-417d-8f39-de4ce2dc0f85'::"uuid", '92ee5660-5034-4e03-a0d1-f7ac0c2b2000'::"uuid", 'e6511092-4f14-4071-a97d-c00997107a7d'::"uuid", '4ce9493a-f4b4-4f44-9165-17533c4eaa4c'::"uuid", 'c77204bb-467d-4007-8074-d0333797760e'::"uuid", 'bbf730ef-1ca0-41fb-920b-7af6bc6b2d78'::"uuid", '3568ac14-7e56-4246-979b-dfc8f4ee9456'::"uuid", '1f840090-511a-430e-b4d2-8370fa35150b'::"uuid", '62f2fb1f-0e27-43b5-91a1-e0a2390e2b4f'::"uuid", '8e2789a6-8254-41af-8815-8cde592bab7e'::"uuid"])))
  GROUP BY "products"."id";

CREATE OR REPLACE VIEW "public"."holiday_hackdays_view" AS
 SELECT "products"."id",
    "products"."title",
    "products"."description",
    "products"."categories",
    "products"."url",
    "products"."github_url",
    "products"."twitter",
    "products"."instagram",
    "products"."images",
    "products"."slug",
    "products"."supabase_features",
    "products"."approved",
    "products"."created_at",
    "count"("views"."id") AS "views"
   FROM ("public"."products"
     LEFT JOIN "public"."views" ON (("products"."id" = "views"."product_id")))
  WHERE (('Holiday Hackdays'::"text" OPERATOR("extensions".%) ANY ("products"."categories")) AND ("products"."id" <> ALL (ARRAY['457bf554-9a37-45ae-ae12-f19e8354bb0b'::"uuid", '20b57673-5787-4fe9-ab65-e72f5341aad4'::"uuid", '0873cbc4-0a83-4473-b1d8-996e19b29a8f'::"uuid", 'dc3469a5-7e93-4136-b56e-51f48ce37d61'::"uuid", '2e14820c-2323-4db4-a036-be4961a619d5'::"uuid", '06f39c78-3b0d-4ebe-9ead-31c26782f075'::"uuid", '056778b9-414a-41fe-924d-42d917c637f9'::"uuid", '38c4fb84-139a-4c86-946d-f8db45c8b519'::"uuid"])))
  GROUP BY "products"."id";

ALTER TABLE ONLY "public"."launch-week-hackathon-8"
    ADD CONSTRAINT "launch-week-hackathon-8_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."launch-week-hackathon-x"
    ADD CONSTRAINT "launch-week-hackathon-x_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."open-source-hackathon"
    ADD CONSTRAINT "public_open-source-hackathon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

CREATE POLICY "Enable all action for users based on email" ON "public"."products" USING (("auth"."email"() = "email")) WITH CHECK (("auth"."email"() = "email"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."launch-week-hackathon-8" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."launch-week-hackathon-x" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."open-source-hackathon" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for everyone" ON "public"."forms" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."launch-week-hackathon-8" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."launch-week-hackathon-x" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."open-source-hackathon" FOR SELECT USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."users" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."users" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."forms" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."launch-week-hackathon-8" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."launch-week-hackathon-x" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."open-source-hackathon" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."views" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."launch-week-hackathon-8";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."launch-week-hackathon-x";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."products_view" TO "anon";
GRANT ALL ON TABLE "public"."products_view" TO "authenticated";
GRANT ALL ON TABLE "public"."products_view" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_hacktoberfest_tags"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_hacktoberfest_tags"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_hacktoberfest_tags"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_monthly"("month_number" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_monthly"("month_number" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_monthly"("month_number" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_monthly"("month_string" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_monthly"("month_string" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_monthly"("month_string" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_related_products"("parent_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_related_products"("parent_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_related_products"("parent_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_related_products_v2"("product_slug" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_related_products_v2"("product_slug" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_related_products_v2"("product_slug" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_search_result"("search_term" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_search_result"("search_term" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_search_result"("search_term" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_supabase_tags"("tag" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_supabase_tags"("tag" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_supabase_tags"("tag" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_tags"("tag" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_tags"("tag" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_tags"("tag" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."hacktoberfest_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."hacktoberfest_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."hacktoberfest_count"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."submission_count"("tag" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."submission_count"("tag" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."submission_count"("tag" "text") TO "service_role";

GRANT ALL ON TABLE "public"."bring_the_func_view" TO "anon";
GRANT ALL ON TABLE "public"."bring_the_func_view" TO "authenticated";
GRANT ALL ON TABLE "public"."bring_the_func_view" TO "service_role";

GRANT ALL ON TABLE "public"."flutter_hackathon_view" TO "anon";
GRANT ALL ON TABLE "public"."flutter_hackathon_view" TO "authenticated";
GRANT ALL ON TABLE "public"."flutter_hackathon_view" TO "service_role";

GRANT ALL ON TABLE "public"."forms" TO "anon";
GRANT ALL ON TABLE "public"."forms" TO "authenticated";
GRANT ALL ON TABLE "public"."forms" TO "service_role";

GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."hackathon_view" TO "anon";
GRANT ALL ON TABLE "public"."hackathon_view" TO "authenticated";
GRANT ALL ON TABLE "public"."hackathon_view" TO "service_role";

GRANT ALL ON TABLE "public"."hacktoberfest_count" TO "anon";
GRANT ALL ON TABLE "public"."hacktoberfest_count" TO "authenticated";
GRANT ALL ON TABLE "public"."hacktoberfest_count" TO "service_role";

GRANT ALL ON TABLE "public"."hacktoberfest_view" TO "anon";
GRANT ALL ON TABLE "public"."hacktoberfest_view" TO "authenticated";
GRANT ALL ON TABLE "public"."hacktoberfest_view" TO "service_role";

GRANT ALL ON TABLE "public"."holiday_hackdays_view" TO "anon";
GRANT ALL ON TABLE "public"."holiday_hackdays_view" TO "authenticated";
GRANT ALL ON TABLE "public"."holiday_hackdays_view" TO "service_role";

GRANT ALL ON TABLE "public"."launch-week-hackathon-8" TO "anon";
GRANT ALL ON TABLE "public"."launch-week-hackathon-8" TO "authenticated";
GRANT ALL ON TABLE "public"."launch-week-hackathon-8" TO "service_role";

GRANT ALL ON TABLE "public"."launch-week-hackathon-x" TO "anon";
GRANT ALL ON TABLE "public"."launch-week-hackathon-x" TO "authenticated";
GRANT ALL ON TABLE "public"."launch-week-hackathon-x" TO "service_role";

GRANT ALL ON TABLE "public"."launch_week_5_view" TO "anon";
GRANT ALL ON TABLE "public"."launch_week_5_view" TO "authenticated";
GRANT ALL ON TABLE "public"."launch_week_5_view" TO "service_role";

GRANT ALL ON TABLE "public"."launch_week_6_view" TO "anon";
GRANT ALL ON TABLE "public"."launch_week_6_view" TO "authenticated";
GRANT ALL ON TABLE "public"."launch_week_6_view" TO "service_role";

GRANT ALL ON TABLE "public"."launch_week_7_view" TO "anon";
GRANT ALL ON TABLE "public"."launch_week_7_view" TO "authenticated";
GRANT ALL ON TABLE "public"."launch_week_7_view" TO "service_role";

GRANT ALL ON TABLE "public"."launch_week_x_view" TO "anon";
GRANT ALL ON TABLE "public"."launch_week_x_view" TO "authenticated";
GRANT ALL ON TABLE "public"."launch_week_x_view" TO "service_role";

GRANT ALL ON TABLE "public"."open-source-hackathon" TO "anon";
GRANT ALL ON TABLE "public"."open-source-hackathon" TO "authenticated";
GRANT ALL ON TABLE "public"."open-source-hackathon" TO "service_role";

GRANT ALL ON TABLE "public"."tags_view" TO "anon";
GRANT ALL ON TABLE "public"."tags_view" TO "authenticated";
GRANT ALL ON TABLE "public"."tags_view" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."views" TO "anon";
GRANT ALL ON TABLE "public"."views" TO "authenticated";
GRANT ALL ON TABLE "public"."views" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
