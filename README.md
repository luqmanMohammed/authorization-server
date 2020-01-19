# Micro-Studies
Micro-Studies is an open project that would help developers learn micro-services and the technologies that support it in a practical manner by developing a project, with proper logging, testing and CI/CD. Micro-Studies would also focus on containerization of the services using Docker.

## This!
*   Part One of Micro Studies. Development of a service (Work In Progress)
*   Development of a micro service, according to the 12 factors of micro services is crucial
*   As the 1st Service. Authentication/Authorization was selected because its one of the most common services, be it any kind       of a project

# micro-studies-auth-server
This service has being built using NodeJS as the the runtime, ExpressJS as the REST Frameword and JWT as the authentication/authorization method. Authorization is delegated using RBAC (Role Based Access Control).
MongoDB is used to store basic user details(Refer Auth Model) and Roles which includes details of finer authorization for services(To be Implemented).
Redis Key Store is used to store revoked token.

## Endpoints

### Register Auth

### Authenticate

### Token Introspect

### Revoke


## Auth Model

{
    email: email of the user,
    password : bcrypt hashed password,
    role : role of the user
}
