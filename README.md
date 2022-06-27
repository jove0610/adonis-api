# Adonis JS

A simple api made with Adonis JS that has authentication and CRUD.

## Installation

- Clone the project:
  `git clone https://github.com/jove0610/adonis-api.git`

- Go to project directory and run `npm ci`
- Start your MySQL server and create a database.
- Create a `.env` file in the root directory and copy the contents of `.env.example`
- In the `.env` file, edit the following database variables with your own config/settings:

```
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=database_name
```

- In the root directory, run the migrations with `node ace migration:run`
- Then run the seeders with `node ace db:seed`. This will create an admin and normal account plus 15 random users. You may run this again to create another 15 users.
- Finally, run `npm run dev`

## Usage

The api's default baseurl is `http://localhost:3333/api`

#### Auth

##### 1. Login

The seeders comes with an admin and not-admin account. The usernames are `admin` and `not-admin` respectively and both have passwords `123456`.

- endpoint: `/auth/login`
- method: `POST`
- body: `username` and `password`

If login is success, you will receive the user's data and a **bearer token** that is required for the rest of the endpoints.

##### 2. User Details

Get the current user's details from the bearer token.

- endpoint: `/auth/user`
- method: `GET`

##### 3. Logout

Deletes the current api token from the database.

- endpoint: `/auth/logout`
- method: `POST`

#### Users

Note: The following endpoints can only be accessed if the user is admin.

##### 4. Get all users

- endpoint: `/users`
- method: `GET`

##### 5. Get user by its id

- endpoint: `/users/{id}`
- method: `GET`

##### 6. Delete user by its id

- endpoint: `/users/{id}`
- method: `DELETE`

##### 7. Delete multiple users by their id

- endpoint: `/users`
- params: `id`
- method: `DELETE`
- sample: `/users?id=6,7,8,11`

##### 8. Create user

- endpoint: `/users`
- method: `POST`
- body: see below

##### 9. Update user

- endpoint: `/users/{id}`
- method: `PUT`
- body: see below

###### User body

All values are string, except for is_admin, which is `1` or `0`

```
first_name
last_name
address
post_code
phone_number
email
username
password
is_admin
```
