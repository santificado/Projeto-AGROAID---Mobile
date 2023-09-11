<h1 align="center">Desafio Global Solution 2023</h1>
 
<h2> Solução desenvolvida para o projeto Global Solution do primeiro semestre com a criação de uma API RESTful que ajude no combate a fome com o uso de inteligência artificial</h2>

<h2> Link do Snack: https://snack.expo.dev/@henrique_freitas/global-solution--projeto-ivern </h2>
 

<h2 align="center">Endpoints</h2>

### Cadastro de Usuário ╹users╷ **`/registrar`**:

#### POST ➡️

**Exemplo 👇**
```js
{
	"nome": "Henrique Freitas",
	"email": "haffiap@gmail.com",
	"senha": "|(:oUuC<UZ",
	"telefone":"(11) 95954-0882"
}
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
✔️ | `201` | Usuário cadastrado com sucesso.
❌ | `403` | Não foi possível cadastrar o usuário.


### Login Validado ╹users╷ **`/login`**:

#### POST ➡️

**Exemplo 👇**
```js
{
	"email": "haffiap@gmail.comm",
	"senha": "|(:oUuC<UZ"
}
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
| ✔️ | `201` | Login validado com sucesso.
| ❌ | `403` | Não foi possivel validar o login.

### Mandar prompt para o ChatGPT ╹ChatGPT╷ **`/chatbot/api`**:

#### POST ➡️

**Exemplo 👇**
```js
{
	"pergunta": "Gere dicas sobre a rotação de cultura em uma fazenda de médio porte no interior de São Paulo com 4 hectares de terreno disponível para plantação e com média de temperatura anual de 25 graus.",
}
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
✔️ | `200` | Prompt inserido com sucesso.
❌ | `403` | Não foi possível inserir o prompt.



### Cadastro de anotações ╹users╷ **`/{id}/anotacoes/registrar`**:

#### POST ➡️

**Exemplo 👇**
```js
{
	"id": 1,
	"nome": "Plantio de coco",
	"descricao": "O plantio de coco pode ser ralizado de diversas maneiras..." 
}
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
| ✔️ | `200` | Anotação cadastrada com sucesso.
| ❌ | `403` | Não foi possivel realizar o cadastro.

### Pesquisa de anotações por usuário ╹users╷ **`/{id}/anotacoes/{id_anotacoes}`**:

#### GET ⬅️

**Exemplo 👇**
```js
https://projeto-ivern-default-rtdb.firebaseio.com/users/1/anotacoes/1
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
| ✔️ | `200` | Anotações do usuário com o id {id} encontrada.
| ❌ | `403` | Anotações do usuário com o id {id} não foi encontrada.


### Deletar Anotação por id ╹users╷ **`/{id}/anotacoes/{id_anotacao}`**:

#### DELETE ⬇️

**Exemplo 👇**
```js
https://projeto-ivern-default-rtdb.firebaseio.com/users/1/anotacoes/1
```

**Saída 👇**

|  | <font color="#aa31f5">código</font> | <font color="#e0af0d">descrição</font> |
|:------:|:------:|-----------|
| ✔️ | `204` | Anotação deletada com sucesso.
| ❌ | `403` | Anotação com o id {id} não foi encontrada.