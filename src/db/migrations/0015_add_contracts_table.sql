CREATE TABLE `contract` (
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL,
  `updateCounter` integer DEFAULT 0,
  `id` text PRIMARY KEY NOT NULL,
  `userId` text NOT NULL,
  `title` text(255) NOT NULL,
  `status` text NOT NULL DEFAULT 'active',
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE INDEX `contract_user_id_idx` ON `contract` (`userId`);
