<p align="center">
<img src="https://changewindows.org/images/logo.svg" width="100px" height="auto">
</p>

<h3 align="center">ChangeWindows Horizon</h3>

<p align="center">
Changing Horizon one commit at a time
<br />
<br />
<a href="https://preview.changewindows.org">ChangeWindows Preview</a>
&middot;
<a href="https://changewindows.org">ChangeWindows</a>
</p>

## About ChangeWindows
ChangeWindows does what Microsoft doesn't: document every change we can possibly find in Windows on any platform.

## Open source
After ChangeWindows viv, we've decided to bring ChangeWindows Horizon - our 7th major itteration - to an open source repository near you too. Built with Laravel and React, this is a more modern version of our website.

## Using
To run ChangeWindows, you'll need the following:

* PHP 8.1.0 or higher, including extensions required by Laravel 9.x
* MySQL
* Composer
* npm

### Setup
Clone this repository to any given directory and setup the `.env` file with all required parameters. An example of an `.env` file can be found in `.env.example`. Then execute the following commands.

```
composer install
npm install
php artisan migrate
php artisan db:seed
```

To run ChangeWindows, use the following command:

```
php artisan serve
```

This will launch a server at `127.0.0.1:8000`. Also run this NPM command.

```
npm run watch
```

This will compile various files, mostly SCSS and keep an eye out for changes.

For a production build, execute the following commands:

```
composer install --prefer-dist --no-scripts --no-dev -o
npm run prod
```

The `node_modules` folder is not required in a production environment as long as the production-script has been run. All relevant JavaScript will be compiled to the `public`-folder.

## Contributing
We are open to contributions to ChangeWindows. Do you have a feature that you really want to see but we are not spending any time on it ourselves? Feel free to open a pull request for it!

Not into coding, but like to support us nonetheless? We're always happy with [a donation](https://www.patreon.com/changewindows). Our patrons will be shown on the [About](https://www.changewindows.org/settings/about)-page.

## Security Vulnerabilities
If you discover a security vulnerability within ChangeWindows, please contact us through private means. Most successful would probably be to contact us on [Twitter](https://twitter.com/changewindows).

## License
The ChangeWindows website is open-sourced software licensed under the [AGPL license v3](LICENSE). Note however that the content on our website isn't unless stated otherwise.

## ChangeWindows 7.7/8.0
create table `flags` (`id` bigint unsigned not null auto_increment primary key, `name` varchar(255) not null, `feature_name` varchar(255) not null, `feature_id` int not null, `description` text null, `added` int not null, `removed` int null, `slug` varchar(255) not null, `created_at` timestamp null, `updated_at` timestamp null) default character set utf8mb4 collate 'utf8mb4_unicode_ci'
create table `flag_status` (`id` bigint unsigned not null auto_increment primary key, `flag_id` bigint unsigned not null, `build` int not null, `status` varchar(255) not null, `created_at` timestamp null, `updated_at` timestamp null) default character set utf8mb4 collate 'utf8mb4_unicode_ci'
alter table `flag_status` add constraint `flag_status_flag_id_foreign` foreign key (`flag_id`) references `flags` (`id`) on delete cascade
create table `flag_authors` (`id` bigint unsigned not null auto_increment primary key, `flag_id` bigint unsigned not null, `user_id` bigint unsigned not null) default character set utf8mb4 collate 'utf8mb4_unicode_ci'
alter table `flag_authors` add constraint `flag_authors_flag_id_foreign` foreign key (`flag_id`) references `flags` (`id`) on delete cascade
alter table `flag_authors` add constraint `flag_authors_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on delete cascade
create table `flag_suggestions` (`id` bigint unsigned not null auto_increment primary key, `flag_id` bigint unsigned not null, `name` varchar(255) not null, `feature_name` varchar(255) not null, `feature_id` int not null, `description` text null, `created_at` timestamp null, `updated_at` timestamp null) default character set utf8mb4 collate 'utf8mb4_unicode_ci'
alter table `flag_suggestions` add constraint `flag_suggestions_flag_id_foreign` foreign key (`flag_id`) references `flags` (`id`) on delete cascade
