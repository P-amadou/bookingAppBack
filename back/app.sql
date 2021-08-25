CREATE TYPE "solutions_enum" AS ENUM ('4inShield','4inRadar','4inEnrich','4inGen');

CREATE TABLE "users"(
    "idUser" serial primary key not null,
    "nom" varchar(255) not null,
    "prenom" varchar(255) not null,
    "tel" varchar(25),
    "company" varchar(255) not null
);

CREATE TABLE "booking" (
    "idBooking" serial primary key not null,
    "solutions" solutions_enum not null default('4inShield'),
    "date" DATE NOT NULL,
    "disponible" BOOLEAN,
    "userId" integer not null,
    FOREIGN KEY ("userId") REFERENCES "users"("idUser")
    );

DROP TABLE "booking";DROP TABLE "users";  DROP TYPE "solutions_enum";