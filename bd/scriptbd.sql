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
    activo boolean,
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
    activo boolean,
    cupo_prod boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."importador"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    ruc character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    user_import character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."anio"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    activo boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."grupo_sust"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    activo boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

CREATE TABLE IF NOT EXISTS public."cupo"
(
    id SERIAL PRIMARY KEY,
    importador character varying COLLATE pg_catalog."default",
    anio character varying COLLATE pg_catalog."default",
    hfc character varying COLLATE pg_catalog."default",
    hcfc character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)

-- Table: public.onu_imports

-- DROP TABLE IF EXISTS public.onu_imports;

drop table public.importacion;
CREATE TABLE IF NOT EXISTS public.importacion
(
    id serial NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    authorization_date date,
    month character varying(255),
    cupo_asignado numeric(19,2),
    status character varying(255),
    cupo_restante numeric(19,2),
    tota_solicitud numeric(19,2),
    total_pesoKg numeric(19,2),
    vue character varying(255) UNIQUE,
    factura_file bytea,
    dai_file bytea,
    data_file bytea,
    importador character varying(255),
    orden_file bytea,
    user_id int,
    years bigint,
    country character varying(255),
    proveedor character varying(255),
    send_email boolean,
	grupo character varying(255)
)

-- Table: public.onu_detail_imports

-- DROP TABLE IF EXISTS public.onu_detail_imports;



drop table importacion_detail
CREATE TABLE IF NOT EXISTS public.importacion_detail
(
    id serial NOT NULL,
    created_at timestamp ,
    updated_at timestamp ,
    cif numeric(20,2),
    co2 numeric(20,2),
    fob numeric(20,2),
    peso_kg numeric(20,2),
    peso_pao numeric(20,2),
    country bigint,
    importacion bigint,
    sustancia character varying(255),
	subpartida character varying(255),
    price numeric(20,2),
    ficha_file bytea
);
