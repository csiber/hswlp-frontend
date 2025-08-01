ALTER TABLE `user_app` ADD COLUMN `notes` text;
ALTER TABLE `contract` ADD COLUMN `fileUrl` text(600);
ALTER TABLE `contract` ADD COLUMN `userAppId` text REFERENCES `user_app`(`id`);
CREATE INDEX IF NOT EXISTS `contract_user_app_id_idx` ON `contract` (`userAppId`);
