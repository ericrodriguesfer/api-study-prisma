# Api de estudo ao ORM Prisma

Está api/back-end foi implementada como solução de implementação prática dos meus estudos ao ORM [Prisma](https://prisma.io/), um *Object Relational Mapping* ou traduzindo, Mapeamento de Objeto Relacional, que consiste em uma interface de alto nível de abstração para gerenciamento de bancos de dados/SGBDs, facilitando tudo que se trate de utilizar um bando de dados, desde a criação de bancos de dados de forma automática, criação de tabelas no banco, relacionar tabelas/entidades, e gerenciar tudo o quanto seja possível entre as mesmas que um banco de dados tenha suporte. E uma das coisas mais incríveis que achei deste ORM, é sua integração/funcionamento nátivo com o Typescript, que facilita demais o desenvolvimento sem contar em poder utilizar todas as praticidades que o Typescript nós traz. Esse meu projeto consiste de um back-end/api em que um usuário pode se cadastrar utilizando alguns dados, como nome, e-mail e senha, pode vir a atualizar seu perfil, funcionalidade de login de um usuário, com autenticação feita utilizando JWT, um usuário logado tem a possibilidade de criar o que chamei na aplicação de *type finance*, ou melhor dizendo, categoria de finança, além de criar a mesma, ele tem a opção de listar todas e vir a deletar alguma, com isso o mesmo pode vir a cadastrar suas *finances*/fincanças, que basicamente podem ser as despesas e entradas finançeiras do usuário, quando ele vai cadastrar uma finança, ele tem que passar um nome para a mesma, o tipo da finança, se é entrada ou saída, o valor da finança, e a qual categoria citada anteriormente essa finança está associada, com isso ele pode vir a depois de criar uma finança, listar, deletar, atualizar e etc, em listar ele pode vir a listar todas as finanças, todas as finanças somente de entrada ou somente as de saída, e também pedir um balanço, que basicamente faz o cálculo de todas as finanças de entradas por todas de saídas e gerar o cálculo e com isso o balanço. Este back-end foi implementando em Node, com Typescript, o ORM Prisma para gerenciar o banco de dados e o PostgreSQL como SGBD.

# Tecnologias e Boas práticas utilizadas
* NodeJs
* Typescript
* Prisma
* JWT
* PostgreSQL
* Docker
* docker-compose

## CASO QUEIRA SABER MAIS SOBRE O PROJETO

Pode entrar em contato comigo pelo seguinte email: ericdesenvolvedor7@gmail.com
