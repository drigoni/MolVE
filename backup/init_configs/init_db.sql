\copy users (id, username, password, role, created_at, updated_at, last_login_at)
FROM '/app/initial_configs/users.csv'
DELIMITER ','
CSV HEADER;

\copy settings (id, key, value, description, updated_at)
FROM '/app/initial_configs/settings.csv'
DELIMITER ','
CSV HEADER;

\copy sessions (sid, sess, expire)
FROM '/app/initial_configs/sessions.csv'
DELIMITER ','
CSV HEADER;

-- Copy data from CSV
\copy molecules (id, smiles, formula, molecular_weight, log_p, hbd, hba, structure_2d, structure_3d, created_at, sdf)
FROM '/app/initial_configs/molecules.csv'
DELIMITER ','
CSV HEADER;

\copy evaluations (id, user_id, molecule_id, evaluation, notes, created_at)
FROM '/app/initial_configs/evaluations.csv'
DELIMITER ','
CSV HEADER;