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
  `featured` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `app_slug_idx` ON `app` (`slug`);
