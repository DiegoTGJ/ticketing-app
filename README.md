# ticketing-app
An App to buy tickets for different events.
A production grade microservices implementation

# Current Services
- Auth: In charge of everythin auth related, Signin, Signout, Signup, modifying users, creating JWT token and setting them in cookies, etc. Using Express.
- Ticket: Has the business logic to manage tickets: Create, Update,etc. Using Express.
- Client: The frontend of the app, an SSR app using NextJS,
