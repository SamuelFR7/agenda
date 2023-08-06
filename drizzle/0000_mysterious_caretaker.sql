CREATE TABLE `contacts` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`phone_1` varchar(191) NOT NULL,
	`phone_2` varchar(191),
	`phone_3` varchar(191),
	`phone_4` varchar(191),
	`phone_5` varchar(191),
	`contact_1` varchar(191),
	`contact_2` varchar(191),
	`contact_3` varchar(191),
	`contact_4` varchar(191),
	`contact_5` varchar(191),
	`email` varchar(191),
	`address` varchar(191),
	`observations` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`username` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
