--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Ubuntu 13.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1 (Ubuntu 13.1-1.pgdg20.04+1)

-- Started on 2020-12-05 13:35:14 +03

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 17352)
-- Name: lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lists (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    "desc" text,
    color smallint DEFAULT 0,
    status smallint DEFAULT 0 NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 17382)
-- Name: sequencer; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sequencer
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 208 (class 1259 OID 17360)
-- Name: todos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    "desc" text,
    staus smallint DEFAULT 0,
    list_id uuid NOT NULL
);


--
-- TOC entry 3058 (class 0 OID 17352)
-- Dependencies: 207
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lists (id, title, "desc", color, status) FROM stdin;
a43d52e0-9ce3-4562-bf01-d57e33e46370	School	Some tasks to do for school	45	0
90caa22d-3d16-4d5f-9e15-13dd978a62a0	Home	string	0	0
\.


--
-- TOC entry 3059 (class 0 OID 17360)
-- Dependencies: 208
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.todos (id, title, "desc", staus, list_id) FROM stdin;
62f44cc9-9075-4cca-8323-da3f64cdc041	Study history	\N	0	a43d52e0-9ce3-4562-bf01-d57e33e46370
a74b09a5-02af-4d84-8fc7-3f236fd1e313	Do histroy book	\N	0	a43d52e0-9ce3-4562-bf01-d57e33e46370
3c7e8887-ffee-4f6b-90af-70207d2b4b3e	Gift for Teacher	string	0	a43d52e0-9ce3-4562-bf01-d57e33e46370
26bb6473-fbd8-462d-92e6-efcb4a8de734	Clean the table	string	0	90caa22d-3d16-4d5f-9e15-13dd978a62a0
077b38f8-9bb6-41f1-aba5-fadae4ca98b3	Iron the t-shirt	\N	2	90caa22d-3d16-4d5f-9e15-13dd978a62a0
9664d74f-f146-4b57-b34e-1bc668a063b6	Fıx the chaır	\N	2	90caa22d-3d16-4d5f-9e15-13dd978a62a0
b8bde42b-182c-48aa-9597-a1da9961ea97	Fiixo	\N	4	90caa22d-3d16-4d5f-9e15-13dd978a62a0
\.


--
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 209
-- Name: sequencer; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sequencer', 1, false);


--
-- TOC entry 2925 (class 2606 OID 17359)
-- Name: lists list_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT list_pk PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 17367)
-- Name: todos todo_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todo_pk PRIMARY KEY (id);


-- Completed on 2020-12-05 13:35:14 +03

--
-- PostgreSQL database dump complete
--

