CREATE TABLE `app_category` (
  `slug` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `emoji` text,
  `description` text
);

CREATE TABLE `app` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL,
  `description` text,
  `url` text,
  `icon` text,
  `categorySlug` text NOT NULL,
  `type` text,
  `featured` integer DEFAULT 0 NOT NULL,
  `createdAt` integer NOT NULL,
  `updatedAt` integer NOT NULL,
  FOREIGN KEY (`categorySlug`) REFERENCES `app_category`(`slug`)
);
CREATE UNIQUE INDEX `app_slug_idx` ON `app` (`slug`);
CREATE INDEX `app_category_idx` ON `app` (`categorySlug`);
