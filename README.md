## About Horizon

Horizon is the next major version of ChangeWindows. For version 5, see Viv.

## Migrations
### Alpha 2
create table `tweet_streams` (`id` bigint unsigned not null auto_increment primary key, `name` varchar(255) not null, `account` varchar(255) not null, `consumer_key` varchar(255) not null, `consumer_secret` varchar(255) not null, `access_token` varchar(255) not null, `access_token_secret` varchar(255) not null, `created_at` timestamp null, `updated_at` timestamp null) default character set utf8mb4 collate 'utf8mb4_unicode_ci';
alter table `platforms` add `tweet_template` text null before `slug`, add `tweet_stream_id` bigint unsigned null before `slug`, add `retweet_stream_id` bigint unsigned null before `slug`;
alter table `platforms` add constraint `platforms_tweet_stream_id_foreign` foreign key (`tweet_stream_id`) references `tweet_streams` (`id`) on delete set null;
alter table `platforms` add constraint `platforms_retweet_stream_id_foreign` foreign key (`retweet_stream_id`) references `tweet_streams` (`id`) on delete set null;