# 🏁 KImóveis - TypeORM com Relacionamentos

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- TypeScript
- Express
- Typeorm
- NodeJS
- Nodemon
- Sucrase
- Uuid
- PostegresSQL
- Jsonwebtoken
- Bcryptjs
- Dotenv
- Yup
- Express-async-errors
</br>

Endpoints do serviço:</br>

POST	/users	Criação de usuário</br>
GET	/users	Lista todos os usuários</br>
PATCH	/users	Atualiza um usuário</br>
DELETE	/users/<id>	Realiza um soft delete no usuário</br>
POST	/login	Gera o token de autenticação</br>
POST	/categories	Criação de categoria</br>
GET	/categories/<id>/properties	Lista todos imóveis que pertencem a uma categoria</br>
POST	/properties	Criação de um imóvel</br>
GET	/properties	Lista todos os imóveis</br>
POST	/schedules	Agenda uma visita a um imóvel</br>
GET	/schedules/properties/<id>	lista todos os agendamentos de um imóvel</br>

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````
<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local


Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````

<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

#
