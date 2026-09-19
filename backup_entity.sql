--
-- PostgreSQL database dump
--

\restrict w4hDIU0D3FwWGvzBoMXssFUvS1PQicOZ7JvCM8VepNvFdt0fnRGQ1f8g1VT8RMc

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: entities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entities (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.entities OWNER TO postgres;

--
-- Name: entities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entities_id_seq OWNER TO postgres;

--
-- Name: entities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entities_id_seq OWNED BY public.entities.id;


--
-- Name: entities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entities ALTER COLUMN id SET DEFAULT nextval('public.entities_id_seq'::regclass);


--
-- Data for Name: entities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entities (id, name, type, status, latitude, longitude, created_at, updated_at) FROM stdin;
2	Sensor Suhu Pusat	Perangkat IoT	Aktif	-6.91746400	107.61912300	2026-09-19 14:06:02.047617+07	2026-09-19 14:06:02.047617+07
4	Lampu Merah	Fasilitas	Aktif	-6.89898500	107.59217800	2026-09-19 14:33:38.727646+07	2026-09-19 14:33:38.727646+07
3	Aerox 2021	Kendaraan	Aktif	-6.87639300	107.57616600	2026-09-19 14:27:48.102788+07	2026-09-19 14:55:35.160331+07
\.


--
-- Name: entities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entities_id_seq', 4, true);


--
-- Name: entities entities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entities
    ADD CONSTRAINT entities_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict w4hDIU0D3FwWGvzBoMXssFUvS1PQicOZ7JvCM8VepNvFdt0fnRGQ1f8g1VT8RMc

