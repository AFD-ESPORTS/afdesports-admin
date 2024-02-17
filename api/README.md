# <center>AFD.ESPORTS Admin API</center>

![nodejs](https://img.shields.io/badge/-NodeJS-339933?logo=nodedotjs&logoColor=white) ![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=tsnode&logoColor=white) ![jwt.io](https://img.shields.io/badge/-JsonWebTokens-000000?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MiIgdmlld0JveD0iMCAwIDQzNCA0MzgiPjxwYXRoIGQ9Ik0tMjAwLTE5NS44MzNoODMzLjMzM1Y2MzcuNUgtMjAweiIvPjxwYXRoIGQ9Ik0yNDcuOTE3IDEyNC41ODNWMTIuNWgtNjIuNXYxMTIuMDgzbDMxLjI1IDQyLjkxNyAzMS4yNS00Mi45MTdaTTE4NS40MTcgMzE3LjA4M3YxMTIuMDg0aDYyLjVWMzE3LjA4M2wtMzEuMjUtNDIuOTE2LTMxLjI1IDQyLjkxNloiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJtMjQ3LjkxNyAzMTcuMDgzIDY1LjgzMyA5MC44MzQgNTAuODMzLTM3LjA4NC02Ni4yNS05MC40MTYtNTAuNDE2LTE2LjY2N3Y1My4zMzNaTTE4NS40MTcgMTI0LjU4MyAxMTkuNTgzIDMzLjc1IDY4Ljc1IDcwLjgzMyAxMzUgMTYxLjI1bDUwLjQxNyAxNi42Njd2LTUzLjMzNFoiIHN0eWxlPSJmaWxsOiMwMGYyZTYiLz48cGF0aCBkPSJNMTM1IDE2MS4yNSAyOC4zMzMgMTI2LjY2NyA4Ljc1IDE4Ni4yNWwxMDYuNjY3IDM0LjU4MyA1MC44MzMtMTYuMjVMMTM1IDE2MS4yNVpNMjY3LjA4MyAyMzcuMDgzbDMxLjI1IDQzLjMzNEw0MDUgMzE1bDE5LjU4My01OS41ODMtMTA2LjY2Ni0zNC41ODQtNTAuODM0IDE2LjI1WiIgc3R5bGU9ImZpbGw6IzAwYjlmMSIvPjxwYXRoIGQ9Im0zMTcuOTE3IDIyMC44MzMgMTA2LjY2Ni0zNC41ODNMNDA1IDEyNi42NjcgMjk4LjMzMyAxNjEuMjVsLTMxLjI1IDQzLjMzMyA1MC44MzQgMTYuMjVaTTExNS40MTcgMjIwLjgzMyA4Ljc1IDI1NS40MTcgMjguMzMzIDMxNSAxMzUgMjgwLjQxN2wzMS4yNS00My4zMzQtNTAuODMzLTE2LjI1WiIgc3R5bGU9ImZpbGw6I2Q2M2FmZiIvPjxwYXRoIGQ9Im0xMzUgMjgwLjQxNy02Ni4yNSA5MC40MTYgNTAuODMzIDM3LjA4NCA2NS44MzQtOTAuODM0VjI2My43NUwxMzUgMjgwLjQxN1pNMjk4LjMzMyAxNjEuMjVsNjYuMjUtOTAuNDE3TDMxMy43NSAzMy43NWwtNjUuODMzIDkwLjgzM3Y1My4zMzRsNTAuNDE2LTE2LjY2N1oiIHN0eWxlPSJmaWxsOiNmYjAxNWIiLz48L3N2Zz4=) ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white) ![Sentry](https://img.shields.io/badge/-Sentry-362D59?logo=sentry&logoColor=white)

## Deploying the API

API rely on secrets held in a `.env` file. So, first thing to do it to copy `.env.sample`, call the new file `.env` and fill it with your credentials, secrets and URLs.

### Third party middleware

`.env` file includes the setting of a [Sentry Instance](https://sentry.io). Sentry helps error tracking and provides interesting insights, allowing a better debug. As Sentry is called as a middleware, it is quite mandatory to link the API to your Sentry Instance.

## Routes management

Adding a new route is quite simple. All that is needed is a new directory in `routes`, called after the route you want to add.
The new route's directory will need mandatory files to be considered as _available_ by the API:

- **_routeName_.route.ts**: The default route entrypoint
- **_routeName_.ctrl.ts**: The controller for the route
- **schema.json**: The express-validator JSON Schema that will garantee the route won't have unexpected input datas
- **config.json**: The route's overall behaviour

Some routes may need other files to work properly, as Models, Services, but this is totally linked to the route's needs.

## Auth

When needed, the API uses JWT, **J**son**W**eb**T**oken to auth users when managing requests. Though, auth is not mandatory in all circumtances.

The route will require auth if:

- **config.json** has `requireAuth: true`: meaning each and every call to the route, regardless the HTTP method used, will need to provide JWT Bearer auth
- **config.json** has `requireAuth: ["GET"]`: then the route will require auth only if you are using _GET_ HTTP method. Using _POST_, _DELETE_,... won't ask for auth
- **config.json** does **_NOT_** have `requireAuth`set: meaning the API will use default behaviour which is equal to `requireAuth: true`and, therefor, will ask for auth

### JWT - JsonWebTokens

API uses JWT to auth requests _(when needed)_ so requests will have to send JWT Bearer in request headers.

JWT Bearer is composed with 3 datas, resulting in a string like `AAA.BBB.CCC`:

- `AAA`: The JWT header

```JSON
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `BBB`: The payload, user auth

```JSON
{
  "id": 1,
  "username": "dev",
  "iat": 1516239022
}
```

- `CCC`: The encoded shared secret

```BASH
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  CreateASecretAndPutItHere)
```

This JWT will result in a hash version:

```Text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkZXYiLCJpYXQiOjE1MTYyMzkwMjJ9.10srzrS5ZwtXh_TAAhP0er2AfzJJ_8Wn5jXvEGyAFe0
```

## Enabling routes in specific environments

Each route must provide it's _enabled environments_ so the API knows if the route has to be added and charged.

A route enabled in `development`won't, therefor, be available in `preproduction`or `production` or any other environments you would need until you add this specific environment in route's **config.json**.

To do so, add an array of available environments to `envEnabled`:

```JSON
{
    "envEnabled": ["development", "production"],
}
```

You may change _development_ for _dev_ if you see fit. Just remember that environment name has to be set accordingly in your `.env` file
