/**
 * This script is used to build the database locally. To use it, follow these steps:
 * 1. Open the Terminal.
 * 2. Replace 'your_username' with your PostgreSQL username.
 * 3. Run the following command:
 *    psql -U your_username -d your_database_name -f database.sql
 * 
 * This command will execute the 'database.sql' script and create the database using the specified username and name.
 */

 
-- to build the FamiliCare database locally, Open the Terminal and run this command:

psql -U your_username -d famlicare -f database.sql

-- Create Loved Ones table
\ir ./database/LovedOnes.sql
-- Create users table
\ir ./database/Users.sql
-- Create message table
\ir ./database/Messages.sql
-- Create vault table
\ir ./database/Vault.sql
--Create invitations table
\ir ./database/Invitations.sql