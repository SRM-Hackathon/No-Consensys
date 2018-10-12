CREATE TABLE donation_requests (
    id serial primary key,
    ngo_id integer references ngos(id),
    min_contribution numeric,
    contract_address varchar,
    completed boolean
);