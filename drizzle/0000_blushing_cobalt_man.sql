CREATE TYPE "public"."task_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TABLE "group_tasks" (
	"group_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	CONSTRAINT "group_tasks_group_id_task_id_pk" PRIMARY KEY("group_id","task_id")
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"status" "task_status" DEFAULT 'pending' NOT NULL,
	"is_urgent" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_generated_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "group_tasks" ADD CONSTRAINT "group_tasks_group_id_user_generated_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."user_generated_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_tasks" ADD CONSTRAINT "group_tasks_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;