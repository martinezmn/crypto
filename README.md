# Megabot

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou o `NodeJS`.
* Você tem um banco de dados `MySQL` ou `PostgreSQL`.

## 🚀 Instalação

Para instalar o Megabot, siga estas etapas:

Clone o projeto:
```
git clone https://github.com/martinezmn/megabot.git
```

Instale as depêndencias:
```
npm install
```

Crie um arquivo `.env` com base no `.env.example` e configure os valores.

## ☕ Execução

Colocando o Megabot online:

```
npm start
```

## 📫 Adicionando no servidor

Para adicionar o Megabot no seu servidor, acesse e copie o `CLIENT_ID` do seu bot:

```
https://discord.com/developers/applications/
```

Com o `CLIENT_ID` acesse o link abaixo e adicione o bot no servidor desejado:

```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=8
```
