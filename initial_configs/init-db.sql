--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 17.5


-- COMMANDS:
-- Enter the container:
-- docker compose exec app /bin/sh
-- Connect to the database:
-- psql postgresql://postgres:password@db:5432/molecular_app
-- To create a backup of the database:
-- pg_dump -h db -p 5432 -U postgres -W -F plain -f molecular_app_backup.sql molecular_app
-- Load the initial database configuration:
-- psql -h db -U postgres -d molecular_app -p 5432 -f initial_configs/database_init.sql

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: evaluations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    molecule_id integer NOT NULL,
    evaluation text NOT NULL,
    notes text,
    issue_solubility boolean DEFAULT false,
    issue_synthetic_accessibility boolean DEFAULT false,
    issue_dimension boolean DEFAULT false,
    issue_permeability boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.evaluations OWNER TO postgres;

--
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluations_id_seq OWNER TO postgres;

--
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluations_id_seq OWNED BY public.evaluations.id;


--
-- Name: molecules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.molecules (
    id integer NOT NULL,
    smiles text NOT NULL,
    molecular_weight numeric(10,4),
    log_p numeric(10,4),
    hbd integer,
    hba integer,
    sas numeric(10,4),
    created_at timestamp without time zone DEFAULT now(),
    sdf text
);


ALTER TABLE public.molecules OWNER TO postgres;

--
-- Name: molecules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.molecules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.molecules_id_seq OWNER TO postgres;

--
-- Name: molecules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.molecules_id_seq OWNED BY public.molecules.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    value jsonb NOT NULL,
    description text,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.settings_id_seq OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    last_login_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Create table for API tokens
--

CREATE TABLE public.api_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

-- Add index for faster lookup
-- CREATE INDEX idx_api_tokens_user_id ON public.api_tokens(user_id);
ALTER TABLE public.api_tokens OWNER TO postgres;


--
-- Name: evaluations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations ALTER COLUMN id SET DEFAULT nextval('public.evaluations_id_seq'::regclass);


--
-- Name: molecules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.molecules ALTER COLUMN id SET DEFAULT nextval('public.molecules_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluations (id, user_id, molecule_id, evaluation, notes, created_at) FROM stdin;
\.


--
-- Data for Name: molecules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.molecules (id, smiles, molecular_weight, log_p, hbd, hba, sas, created_at, sdf) FROM stdin;
36	CCO	46.0690	-0.0014	1	1	10.0000	2025-06-22 09:38:41.949184	RDKit          3D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.9254    0.0742    0.0328 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5123   -0.4192   -0.0743 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3778    0.4494    0.6044 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0225    1.0731   -0.4429 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6044   -0.6368   -0.4832 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2236    0.1472    1.1002 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8058   -0.5060   -1.1451 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5852   -1.4274    0.3853 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4948    1.2455    0.0227 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  4  1  0\n  1  5  1  0\n  1  6  1  0\n  2  7  1  0\n  2  8  1  0\n  3  9  1  0\nM  END\n>  <MolecularWeight>  (1) \n46.06900000000002\n\n>  <SMILES>  (1) \nCCO\n\n>  <LogP>  (1) \n-0.0014000000000000123\n\n>  <HBD>  (1) \n1\n\n>  <HBA>  (1) \n1\n$$$$
37	CC(=O)OC1=CC=CC=C1C(=O)O	180.1590	1.3101	1	4	10.0000	2025-06-22 09:38:41.949184	RDKit          3D\n\n 21 21  0  0  0  0  0  0  0  0999 V2000\n   -2.9758   -2.2238   -0.0206 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0921   -1.1148   -0.4802 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3793   -0.4895   -1.5367 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8996   -0.8595    0.2093 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0955    0.2807    0.0477 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.6678    1.5282   -0.2707 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1334    2.6608   -0.4165 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5116    2.5688   -0.2368 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0941    1.3456    0.0982 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3046    0.1895    0.2509 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9664   -1.0921    0.6095 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3000   -2.1549    0.7323 O   0  0  0  0  0  0  0  0  0  0  0  0\n    3.3435   -1.1331    0.8147 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.0374   -1.9828   -0.2398 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8602   -2.3699    1.0738 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.6961   -3.1610   -0.5451 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7385    1.6357   -0.3777 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3171    3.6143   -0.6605 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1306    3.4497   -0.3492 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1670    1.3076    0.2384 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.8082   -1.9995    1.0591 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\n  4  5  1  0\n  5  6  2  0\n  6  7  1  0\n  7  8  2  0\n  8  9  1  0\n  9 10  2  0\n 10 11  1  0\n 11 12  2  0\n 11 13  1  0\n 10  5  1  0\n  1 14  1  0\n  1 15  1  0\n  1 16  1  0\n  6 17  1  0\n  7 18  1  0\n  8 19  1  0\n  9 20  1  0\n 13 21  1  0\nM  END\n>  <MolecularWeight>  (2) \n180.15900000000005\n\n>  <SMILES>  (2) \nCC(=O)OC1=CC=CC=C1C(=O)O\n\n>  <LogP>  (2) \n1.3101\n\n>  <HBD>  (2) \n1\n\n>  <HBA>  (2) \n4\n$$$$
38	CCN(CC)CCCC(C)NC1=C2C=CC=CC2=CC=C1	284.4470	4.7622	1	2	10.0000	2025-06-22 09:38:41.949184	RDKit          3D\n\n 49 50  0  0  0  0  0  0  0  0999 V2000\n    4.0511    2.3155    0.3886 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6042    2.7168    0.0568 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6584    1.5802   -0.0602 N   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8957    1.2751    1.1727 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7564    0.8710    2.3719 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.1659    0.4001   -0.7940 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0227   -0.3704   -1.4954 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9131   -1.8224   -0.9859 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2070   -2.6832   -1.6309 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3096   -2.5446   -3.1547 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5135   -2.5023   -0.9791 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.1346   -1.2300   -0.7403 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.2504   -0.7164    0.5732 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7534   -1.4206    1.6891 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8405   -0.8693    2.9699 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4238    0.3841    3.1584 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9307    1.0938    2.0684 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8508    0.5545    0.7748 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.3543    1.2706   -0.3201 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.2758    0.7343   -1.6052 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.6792   -0.5095   -1.8139 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.5467    1.8623   -0.4951 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.1031    1.6004    1.2312 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6273    3.2233    0.6664 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6105    3.2680   -0.9077 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.2471    3.4402    0.8228 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1770    0.4598    0.9753 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2850    2.1607    1.4531 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3499    1.7346    2.7363 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4248    0.0225    2.1226 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0921    0.5485    3.2015 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7571   -0.2568   -0.1203 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8636    0.7338   -1.5941 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0592    0.1627   -1.3700 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2403   -0.3861   -2.5850 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7766   -1.8194    0.1169 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8858   -2.3241   -1.1865 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0915   -3.7412   -1.4517 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0893   -3.2341   -3.5427 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6605   -2.8151   -3.6233 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5698   -1.5124   -3.4597 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9300   -3.3327   -0.5007 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2815   -2.3880    1.5795 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4468   -1.4131    3.8189 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4835    0.8071    4.1530 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.3810    2.0652    2.2353 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.8164    2.2411   -0.1813 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.6836    1.2834   -2.4446 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.6605   -0.9180   -2.8147 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  6  7  1  0\n  7  8  1  0\n  8  9  1  0\n  9 10  1  0\n  9 11  1  0\n 11 12  1  0\n 12 13  2  0\n 13 14  1  0\n 14 15  2  0\n 15 16  1  0\n 16 17  2  0\n 17 18  1  0\n 18 19  2  0\n 19 20  1  0\n 20 21  2  0\n 21 12  1  0\n 18 13  1  0\n  1 22  1  0\n  1 23  1  0\n  1 24  1  0\n  2 25  1  0\n  2 26  1  0\n  4 27  1  0\n  4 28  1  0\n  5 29  1  0\n  5 30  1  0\n  5 31  1  0\n  6 32  1  0\n  6 33  1  0\n  7 34  1  0\n  7 35  1  0\n  8 36  1  0\n  8 37  1  0\n  9 38  1  0\n 10 39  1  0\n 10 40  1  0\n 10 41  1  0\n 11 42  1  0\n 14 43  1  0\n 15 44  1  0\n 16 45  1  0\n 17 46  1  0\n 19 47  1  0\n 20 48  1  0\n 21 49  1  0\nM  END\n>  <MolecularWeight>  (3) \n284.44699999999943\n\n>  <SMILES>  (3) \nCCN(CC)CCCC(C)NC1=C2C=CC=CC2=CC=C1\n\n>  <LogP>  (3) \n4.7622000000000035\n\n>  <HBD>  (3) \n1\n\n>  <HBA>  (3) \n2\n$$$$
39	O=CC1=CC=CC=C1	106.1240	1.4991	0	1	10.0000	2025-06-22 09:38:41.949184	RDKit          3D\n\n 14 14  0  0  0  0  0  0  0  0999 V2000\n   -1.9174    0.1062   -0.0925 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1441    1.2398   -0.3561 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2511    1.1680   -0.2901 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8836   -0.0416    0.0408 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0981   -1.1784    0.3047 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2969   -1.1015    0.2375 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3554   -0.1001    0.1059 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9515   -1.1703    0.3999 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9970    0.1636   -0.1440 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6257    2.1748   -0.6116 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8364    2.0557   -0.4972 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5600   -2.1233    0.5621 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8970   -1.9789    0.4414 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9419    0.7861   -0.1007 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  2  0\n  4  7  1  0\n  7  8  2  0\n  6  1  1  0\n  1  9  1  0\n  2 10  1  0\n  3 11  1  0\n  5 12  1  0\n  6 13  1  0\n  7 14  1  0\nM  END\n>  <MolecularWeight>  (4) \n106.12399999999995\n\n>  <SMILES>  (4) \nO=CC1=CC=CC=C1\n\n>  <LogP>  (4) \n1.4990999999999999\n\n>  <HBD>  (4) \n0\n\n>  <HBA>  (4) \n1\n$$$$
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expire) FROM stdin;
EngxIDZa-ndjLM5CW6MUfxK9scE6KIbr	{"role": "admin", "cookie": {"path": "/", "secure": false, "expires": "2025-07-15T23:48:09.223Z", "httpOnly": true, "originalMaxAge": 604800000}, "userId": 8, "username": "Admin"}	2025-07-15 23:48:10
4sq_7Rvsvpd46b07godFVsHQRZh_-kFj	{"role": "admin", "cookie": {"path": "/", "secure": false, "expires": "2025-07-17T15:25:29.031Z", "httpOnly": true, "originalMaxAge": 604800000}, "userId": 8, "username": "Admin"}	2025-07-17 15:27:20
2pQqaKmzY7MLpbP_uFL1mdx4s3DM4_2e	{"role": "admin", "cookie": {"path": "/", "secure": false, "expires": "2025-07-17T15:40:44.311Z", "httpOnly": true, "originalMaxAge": 604800000}, "userId": 10, "username": "admin"}	2025-07-17 15:41:49
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (id, key, value, description, updated_at) FROM stdin;
1	allow_guest_viewing	true	Allow guests to view molecular structures without logging in	2025-06-22 11:21:24.383
2	evaluation_mode	"unevaluated"	Controls which molecules users can evaluate: all or only unevaluated	2025-06-22 12:14:59.312
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role, created_at, updated_at, last_login_at) FROM stdin;
10	admin	$2b$10$C1RQo89YQCDxquBo5WRuZO6SXtwEPo2q633t.UBifuOR/o7PtmS9C	admin	2025-07-10 15:36:43.976157	2025-07-10 15:40:44.306	2025-07-10 15:40:44.306
\.


--
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluations_id_seq', 20, true);


--
-- Name: molecules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.molecules_id_seq', 39, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: evaluations evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);


--
-- Name: molecules molecules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.molecules
    ADD CONSTRAINT molecules_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: settings settings_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_key_key UNIQUE (key);


--
-- PostgreSQL database dump complete
--

