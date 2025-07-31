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
CREATE INDEX `user_app_user_id_idx` ON `user_app` (`userId`);
--> statement-breakpoint
CREATE INDEX `user_app_app_id_idx` ON `user_app` (`appId`);
--> statement-breakpoint
CREATE INDEX `user_app_user_app_idx` ON `user_app` (`userId`,`appId`);
