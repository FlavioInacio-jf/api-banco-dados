module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Place Dream API",
    description: "APIREST Place Dream",
    version: "1.0.0",
    contact: {
      email: "jflavioinacio22@gmail.com",
    },
    license: {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  components: {
    securitySchemes: {
      bearer: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  security: {
    bearer: [],
  },
  paths: {
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
                    nome: "Nome do usuário",
                    type: "string",
                    required: true,
                  },
                  cpf: {
                    description: "CPF do usuário",
                    type: "string",
                    required: true,
                  },
                  nascimento: {
                    description: "Data de nascimento do usuário",
                    type: "string",
                    required: false,
                  }
                },
                example: {
                  nome: "Carlos",
                  cpf: "xxx.xxx.xxx-xx",
                  nascimento: "xx/xx/xxxx",
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuário criado com sucesso",
          },
          "409": {
            description: "Usuário já cadastrado no sistema",
          },
        },
      },
    },
    "/users/{cpf}": {
      get: {
        security: [
          {
            bearer: [],
          },
        ],
        tags: ["users"],
        summary: "Get a single user by CPF",
        description: "Get a single user by CPF",
        parameters: [
          {
            name: "cpf",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
          "404": {
            description: "Usuário não encontrado",
          },
        },
      },
    }
  }
};