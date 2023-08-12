CREATE TABLE `users` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`username` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
