-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id  SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    company character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    address character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."pais"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE IF NOT EXISTS public."proveedor"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    country character varying COLLATE pg_catalog."default",
    activo character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."sustancia"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    subpartida character varying COLLATE pg_catalog."default",
    pao character varying COLLATE pg_catalog."default",
    pcg character varying COLLATE pg_catalog."default",
    grupo_sust character varying COLLATE pg_catalog."default",
    activo character varying COLLATE pg_catalog."default",
    cupo_prod character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."importador"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    ruc character varying COLLATE pg_catalog."default",
    user_import character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)
