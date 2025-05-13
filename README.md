## Primeiras considerações:
O intuito deste projeto é educar qualquer pessoa interessada no desenvolvimento de sites.

Nele, detalho a funcionalidade de coleta de dados, autenticação e validação de dados, ou seja, de "sign-in" e de "login".

O projeto será uma ideia de um login para um site de doadores chamado "doame", e precisará coletar os dados de cada usuário que deseja usá-lo.

Neste projeto não entrarei em detalhes no desenvolvimento da aparência do site, portanto discorrerei apenas sobre a lógica utilizada.

Não descreverei lógica de captura de erros, nem das importações de cada elemento.


Ferramentas Utilizadas: 
1. VSCode
2. NextJS/React
3. NextAuth
4. MongoDB
5. Bcrypt


## Passo 1: Setup do projeto com NextJS
Para iniciarmos nosso projeto, no console integrado com VSCode utilizamos o comando `npx create-next-app@latest .`, e excluiremos o conteúdo em app/page.jsx.


## Passo 2: Coleta de dados de Login
Para uma página de login, criamos a pasta 'components' e nela o arquivo 'LoginForm.jsx', onde retornamos os _inputs_ de email e senha envolvidos na tag _form_, com o intuito de coletar os dados do usuário. 

Também incluiremos um botão de Login, sob a tag _button_.

Enquanto isso todo o conteúdo estético está contido nas instâncias de _classname_ de cada elemento.

## Passo 3: Página de coleta de dados para registro de um novo usuário
Neste passo começamos criando numa pasta 'register' um arquivo page.jsx, que receberá um componente assim como o desenvolvido no passo anterior na pasta 'components', porém com o nome de 'RegisterUserForm.jsx'.

O código deste novo componente será extremamente similar ao de login, porém com um novo campo a serem preenchidos, o de nome completo do usuário.

## Passo 4: Linkando as páginas
Para conectar essas páginas, basta incluirmos o elemento _Link_, que deve ser importado de 'next/link', e especificar o link da página que irá nos levar; neste caso encontrado na tag _href_.

## Passo 5: Para a validação e autenticação dos dados, com criptografia
A fim de fazer o setup da autenticação, instalaremos três pacotes através do terminal com o comando `npm i next-auth mongoose bcryptjs`.

## Passo 6: Lógica da coleta dos dados inseridos
No arquivo 'RegisterUserForm', na função 'RegisterUserForm' adicionamos o "estado" dos dados com _useState_, que torna o nosso código encapsulado e mais seguro. 

Seguinte, aplicamos a lógica de _onChange_, que retorna nosso input à medida que o usuário preenche os dados, e o aplica à cada uma das variáveis correspondentes.

## Passo 7: Preenchimento correto dos dados inseridos
Agora, com a função _handleSubmit_ evitaremos o preenchimento incompleto dos dados com _preventDefault_, e com o método _if_ checaremos se qualquer um dos campos está vazio, e, se este for o caso, retornaremos um erro com _setError_.

## Passo 8: Setup da base de dados com MongoDB
Após a criação de uma conta, criaremos um novo projeto com o plano gratuito. É importante que nos atentamos ao dado 'senha' apresentado no site, que será utilizado agora no novo arquivo '.env' na raiz do projeto, onde estará registrado os dados pessoais do desenvolvedor para o uso local dessa database. (Este não está incluído nesta repo, pois seus dados são individuais do desenvolvedor).

Seguindo no setup da nossa DB, incluiremos na área 'IP Adress' o valor '0.0.0.0/0', que irá evitar erros na nossa conexão.

Com a database criada, clicaremos em 'Connect' e em 'MongoDB for VSCode', onde copiaremos o código apresentado, e colaremos no nosso arquivo '.env', substituindo a sessão `<password>` com o password adquirido anteriormente, completando o código `MONGODB_URI=...` onde as reticências representam o código copiado e completado com sua senha.

E, por fim, incluiremos o nome escolhido da sua database após a `/` final deste código.

## Passo 9: Conectando nosso site ao MongoDB
Em uma nova pasta 'lib', iremos inserir um arquivo 'mongodb.js' e, nele, a lógica de 'mongoose.connect', que irá ser aguardado pelo método _await_, numa função assíncrona, por isso incluído a palavra _async_ na função.

## Passo 10: Modelando os dados dos usuários
Novamente criaremos uma nova pasta, que chamaremos de 'models' onde se encontrará um novo arquivo 'user.js', e o preencheremos com as características dos novos usuários registrados.

Contém em cada um desse objetos o nome, email, senha e momento de criação(timestamp) de cada usuário, onde todos os dados sáo necessários, portanto o uso de `required: true`.

Por fim a lógica de criação de um novo modelo na linha 19.

## Passo 11: Registrando os dados com uma API e criptografia da senha
Para esse passo adicionaremos o diretório 'api/register', e dentro desta última pasta teremos um arquivo 'route.js'. Nele, teremos a lógica de uma função assíncrona(async) que espera o json(ou seja, os dados do usuário) e cria um usuário em nossa base de dados com `User.create`.

Para que nossa senha seja secreta, utilizaremos o comando `bcrypt.hash(password, 10)` que cria um hash(um código criptografado) de 10 caracteres.

## Passo 12: Para evitar contas duplicadas
Para este passo, em uma nova pasta dentro de 'api' chamada 'userExists', criaremos um arquivo 'routejs'.

Agora, com o método `User.findOne({email}).select("_id")`, buscamos na database o 'id' do email inserido, e se ele já existe.

Para completar a lógica, no nosso arquivo 'RegisterForm', coletamremos os dados com `fetch("api/register"` com cada parte do objeto sendo requerido, e ainda com uma nova função 'resUserExists' aguarda se o código retornará um email, e, se sim, impedirá o registro de um novo usuário.

## Passo 13: Autenticação com NextAuth
Primeiro, para o funcionamento do nosso site, e o sucesso do método de autenticação, começaremos criando um arquivo nomeado 'Providers.js', que certificará de termos uma sessão no nosso site, ou seja, um estado em que temos nossos dados inseridos ativos em nosso site; e com o código de 'AuthProvider' envolveremos nossa página 'layout.js'.

Com isso, implementaremos um código muito similar ao encontrado em 'RegisterForm' no nosso arquivo 'LoginForm', recebendo os dados inseridos pelo usuário.

Para completar o código teremos uma nova pasta em 'api' chamada 'auth', onde outra pasta nomeada '[...nextauth]' guardará nosso código de autenticação propriamente dito, sendo num novo arquivo 'route.js'. Nele, teremos uma lógica bem simples, de retorno de credenciais, comparação de dados com `bcrypt.compare`, e abaixo especificaremos nossa função como 'handler', e este 'handler' declararemos como POST, que será utilizado no método de coleta de dados tanto em 'LoginForm', quanto em 'RegisterUserForm', assim como o tipo de dados "credentials".

## Passo 14: Autorização de um usuário existente
Neste momento implementaremos a autorização de login de um usuário, e para isso completaremos o arquivo 'route.js' em 'auth'. Tudo isso será encontrado na função `authorize(credentials)`, na checagem de dados com `await User.findOne({ email )}`, e na comparação da senha inserida com `await bcrypt.compare(password, user.password)`

## Passo 15: Retorno dos dados ao usuário
Finalmente, para que o usuário saiba que seus dados estão sendo processados corretamente, iremos desenvolver uma lógica de retorno dos dados inseridos ao concluir o login.

Para isso, primeiramente criaremos uma pasta em 'app' chamada 'dashboard', que só receberá os dados de um também novo arquivo 'UserInfo' em 'components'. E, de maneira simples, implementamos uma tag _span_ que receberá os dados do usuário em `{session?.user?.name}` e `{session?.user?.email}`, com, por fim, um botão de 'logout'.
