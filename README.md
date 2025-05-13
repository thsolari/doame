Primeiras considerações:
O intuito deste projeto é educar qualquer pessoa interessada no desenvolvimento de sites.
Nele, detalho a funcionalidade de coleta de dados, autenticação e validação de dados, ou seja, de "sign-in" e de "login".
O projeto será uma ideia de um login para um site de doadores chamado "doame", e precisará coletar os dados de cada usuário que deseja usá-lo.
Neste projeto não entrarei em detalhes no desenvolvimento da aparência do site, portanto discorrerei apenas sobre a lógica utilizada.


Ferramentas Utilizadas: 
1. VSCode
2. NextJS/React
3. NextAuth
4. MongoDB
5. Bcrypt


Passo 1: Setup do projeto com NextJS
Para iniciarmos nosso projeto, no console integrado com VSCode utilizamos o comando `npx create-next-app@latest .`, e excluiremos o conteúdo em app/page.jsx.


Passo 2: Coleta de dados de Login
Para uma página de login, criamos a pasta 'components' e nela o arquivo 'LoginForm.jsx', onde retornamos os _inputs_ de email e senha envolvidos na tag _form_, com o intuito de coletar os dados do usuário. Também incluiremos um botão de Login, sob a tag _button_.
Enquanto isso todo o conteúdo estético está contido nas instâncias de _classname_ de cada elemento.

Passo 3: Página de coleta de dados para registro de um novo usuário
Neste passo começamos criando numa pasta 'register' um arquivo page.jsx, que receberá um componente assim como o desenvolvido no passo anterior na pasta 'components', porém com o nome de 'RegisterForm.jsx'.
O código deste novo componente será extremamente similar ao de login, porém com um novo campo a serem preenchidos, o de nome completo do usuário.

Passo 4: Linkando as páginas
Para conectar essas páginas, basta incluirmos o elemento _Link_, que deve ser importado de 'next/link', e especificar o link da página que irá nos levar; neste caso encontrado na tag _href_.

Passo 5: Para a validação e autenticação dos dados, com criptografia pt.1
A fim de fazer o setup da autenticação, instalaremos três pacotes através do terminal com o comando `npm i next-auth mongoose bcryptjs`.

Passo 6: Lógica da coleta dos dados inseridos
No arquivo 'RegisterForm', na função 'RegisterForm' adicionamos o "estado" dos dados com _useState_, que torna o nosso código encapsulado e mais seguro. Seguinte, aplicamos a lógica de _onChange_, que retorna nosso input à medida que o usuário preenche os dados, e o aplica à cada uma das variáveis correspondentes.

Passo 7: Preenchimento correto dos dados inseridos
Agora, com a função _handleSubmit_ evitaremos o preenchimento incompleto dos dados com _preventDefault_, e com o método _if_ checaremos se qualquer um dos campos está vazio, e, se este for o caso, retornaremos um erro com _setError_.

Passo 8: Setup da base de dados com MongoDB
Após a criação de uma conta, 

Passo X: API dos dados
Para esse passo adicionaremos o diretório 'api/register', e dentro desta última pasta teremos um arquivo 'route.js'. Nele, teremos 




