CREATE TABLE "feedback" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "feedback_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"rating" integer NOT NULL,
	"feedback" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
