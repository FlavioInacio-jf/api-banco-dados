module.exports = usersDoc = {
  "/users": {
    post: {
      security: [
        {
          bearer: [],
        },
      ],
      tags: ["users"],
      summary: "Create a new user",
      description: "Create a new user",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  description: "User name",
                  type: "string",
                  required: true,
                },
                email: {
                  description: "This e-mail will be used for login",
                  type: "string",
                  required: true,
                },
                photo: {
                  description: "Photo url",
                  type: "string",
                  required: false,
                },
                role: {
                  description: "This password will be used for login",
                  type: "string",
                  required: true,
                },
                permissions: {
                  description: "This password will be used for login",
                  type: "array",
                  required: true,
                },
                password: {
                  description: "This password will be used for login",
                  type: "string",
                  required: true,
                },
              },
              example: {
                name: "Carlos",
                email: "jCarlos@gmail.com",
                photo:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                role: "user",
                permissions: ["create"],
                password: "123456789",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
        },
        "409": {
          description: "Email already exists",
        },
      },
    },
    get: {
      security: [
        {
          bearer: [],
        },
      ],
      tags: ["users"],
      summary: "Get all users",
      description: "List all users",
      responses: {
        "200": {
          description: "Success",
        },
      },
    },
  },
  "/users/{id}": {
    delete: {
      security: [
        {
          bearer: [],
        },
      ],
      tags: ["users"],
      summary: "Delete user by ID",
      description: "Delete user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            type: "string",
          },
          required: true,
        },
      ],
      responses: {
        "201": {
          description: "User removed successfully",
        },
        "401": {
          description: "Token invalid, Token expired or Unauthorized",
        },
        "403": {
          description: "User does not have access to this feature.",
        },
        "404": {
          description: "User doesn't exist!",
        },
      },
    },
    patch: {
      security: [
        {
          bearer: [],
        },
      ],
      tags: ["users"],
      summary: "Update a user by ID",
      description: "Update a user by ID",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  description: "User name",
                  type: "string",
                  required: false,
                },
                photo: {
                  description: "Photo url",
                  type: "string",
                  required: false,
                },
                role: {
                  description: "Role user",
                  type: "string",
                  required: false,
                  enum: ["admin", "user"],
                },
                permissions: {
                  description: "Permissions user",
                  type: "array",
                  required: false,
                },
              },
              example: {
                name: "Carlos",
                email: "jCarlos@gmail.com",
                photo:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                role: "user",
                permissions: ["create"],
              },
            },
          },
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            type: "string",
          },
          required: true,
        },
      ],
      responses: {
        "201": {
          description: "User updated successfully",
        },
        "401": {
          description: "Token invalid, Token expired or Unauthorized",
        },
        "404": {
          description: "User doesn't exist!",
        },
      },
    },
  },
};