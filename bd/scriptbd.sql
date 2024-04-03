-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer SERIAL NOT NULL,
    name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    company character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    address character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public."pais"
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",    
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT pais_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public."proveedor"
(
    id SERIAL PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    country character varying COLLATE pg_catalog."default",
    activo character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
)

CREATE TABLE IF NOT EXISTS public."sustancia"
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    subpartida character varying COLLATE pg_catalog."default",
    pao character varying COLLATE pg_catalog."default",
    pcg character varying COLLATE pg_catalog."default",
    grupo_sust character varying COLLATE pg_catalog."default",
    activo character varying COLLATE pg_catalog."default",
    cupo_prod character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT sust_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public."importador"
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name character varying COLLATE pg_catalog."default",
    ruc character varying COLLATE pg_catalog."default",
    user_import character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT import_pkey PRIMARY KEY (id)
)


-- Table: public.onu_imports

-- DROP TABLE IF EXISTS public.onu_imports;

CREATE TABLE IF NOT EXISTS public.imports
(
    id serial NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    authorization_date date,
    month character varying(255),
    quota numeric(19,2),
    status_select integer,
    to_quota numeric(19,2),
    total_co2 numeric(19,2),
    total_weight numeric(19,2),
    vue character varying(255),
    billing_file bigint,
    dai_file bigint,
    data_file bigint,
    importer bigint,
    order_file bigint,
    user_id int,
    years bigint,
    total_weight_verificated numeric(19,2),
    country_id int,
    provider_id bigint,
    send_email boolean,
    total_weight_kg numeric(20,2),
    quota2 numeric(20,2),
    to_quota2 numeric(20,2),
    total_weight2 numeric(20,2),
    total_weight_kg2 numeric(20,2),
)

-- Table: public.onu_detail_imports

-- DROP TABLE IF EXISTS public.onu_detail_imports;

CREATE TABLE IF NOT EXISTS public.imports_detail
(
    id serial NOT NULL,
    created_at timestamp ,
    updated_at timestamp ,
    cif numeric(20,2),
    co2 numeric(20,2),
    fob numeric(20,2),
    observation character varying(255) COLLATE pg_catalog."default",
    request character varying(255) COLLATE pg_catalog."default",
    weight numeric(20,2),
    weightpao numeric(20,2),
    country bigint,
    imports bigint,
    product bigint,
    provider bigint,
    cif_verificated numeric(20,2),
    co2verificated numeric(20,2),
    fob_verificated numeric(20,2),
    observation_verificated character varying(255) COLLATE pg_catalog."default",
    subheading character varying(255) COLLATE pg_catalog."default",
    subheading_product_verificated character varying(255) COLLATE pg_catalog."default",
    weight_verificated numeric(20,2),
    weightpao_verificated numeric(20,2),
    product_verificated bigint,
    price numeric(20,2),
    data_file_test bigint,
    name_product character varying(255) COLLATE pg_catalog."default",
    product_hardware bigint,
    
)
