CREATE TABLE `app` (
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`updateCounter` integer DEFAULT 0,
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`slug` text(255) NOT NULL,
	`description` text(1000),
	`url` text(600),
	`icon` text(100),
	`category` text(100),
	`type` text NOT NULL,
	`featured` integer DEFAULT 0 NOT NULL,
	`status` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `app_slug_idx` ON `app` (`slug`);--> statement-breakpoint
CREATE TABLE `post` (
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`updateCounter` integer DEFAULT 0,
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text(255) NOT NULL,
	`content` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `post_user_id_idx` ON `post` (`userId`);--> statement-breakpoint
CREATE TABLE `request` (
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`updateCounter` integer DEFAULT 0,
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`projectName` text(255),
	`description` text(2000) NOT NULL,
	`domainType` text(50) NOT NULL,
	`status` text(50) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `request_email_idx` ON `request` (`email`);--> statement-breakpoint
CREATE TABLE `user_app` (
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`updateCounter` integer DEFAULT 0,
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`appId` text NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`appId`) REFERENCES `app`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_app_user_id_idx` ON `user_app` (`userId`);--> statement-breakpoint
CREATE INDEX `user_app_app_id_idx` ON `user_app` (`appId`);--> statement-breakpoint
CREATE INDEX `user_app_user_app_idx` ON `user_app` (`userId`,`appId`);--> statement-breakpoint
ALTER TABLE `user` ADD `activeAppCount` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `storageUsage` integer DEFAULT 0 NOT NULL;