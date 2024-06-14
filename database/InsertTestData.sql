INSERT INTO "user" ("username", "first_name", "last_name", "email", "password", phone_number, profile_picture_url, loved_one_ID, is_admin) 
VALUES 
    ('testAdmin', 'Tyler', 'Jones', 'famlicareappclientproject@gmail.com','$2a$10$bbZu8YEZy2T8cG3W.MfxEuUfWUmIRilwQGNBQhrET9GoMYNCulJ8C',
'555-867-5309','url', 1, true),
    ('testStandard', 'Alex', 'Jones', 'famlicareappclientproject@gmail.com','$2a$10$bbZu8YEZy2T8cG3W.MfxEuUfWUmIRilwQGNBQhrET9GoMYNCulJ8C',
'555-555-5555','url', 1, false);

INSERT INTO loved_ones(
    "first_name", "last_name", "age", "main_condition", "street_address", "street_address2", "city", "state_province", "country", "postal_code")
VALUES
    ('Mustafe', 'Jones', 62, 'Dementia', '1230 Wonder Land Ave S.', 'Apt 20', 'South Pole', 'Minnesota', 'New Mexico', '20202');

