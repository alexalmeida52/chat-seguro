# Chat Seguro
Chat criptografado com cifra Simple Des, utilizando a troca de chaves por meio Diff Hellman.

### Autores
#### Jośe Alex Alves Pereira
#### Marcio Venicio Nascimento Silva

### Sobre o projeto

O chat seguro é um projeto da disciplina de Segurança de Redes da UFRN, que consiste em desenvolver um meio de comunicação segura através de sockets. Para realizarmos esse trabalho tivemos que estudar sobre cifras de blocos, especificamente o Simple DES, apesar da atividade requerir a utilização do RC4, mas esse não fizemos. A principal dificuldade na execução desse trabalho foi a utilização de sockets (algo novo até então), foi onde perdemos mais tempo de desenvolvimento e que acabou nos impossibilitando de implementar o RC4. O passa a passo do algoritmo SDES estava bem descrito nos slides de aula, cabendo a nós transferir as rotinas ali expressas para alguma linguagem, que no caso foi NodeJs. A partir daí foi só questão de sintaxe e como executar certas operações no javascript, assim como utilizar sockets de forma a possibilitar a comunicação pela rede.

### Como executar

1. Baixe o projeto do git
```
git clone https://github.com/alexalmeida52/chat-seguro
```
2. Com o projeto baixado, entre no diretório do projeto em seu computador:
```
cd chat-seguro
```
Execute o seguinte comando, para instalar todas as dependências:

```
npm install
```
E esse, para executar o servidor:
```
node server.js
```
3. O arquivo server.js será um dos lados do chat, o outro será o main.js, ou seja, baixe esse mesmo projeto em outro computador e lá será executado apenas o main.js. Você terá que executar o main.js para conversar com o computador que está executando o server.js. Antes de executar o main.js altere a sua segunda linha, para indicar qual endereço o socket deve apontar. Por exemplo, io.connect("http://10.51.67.140:5354"), certifique-se de colocar o ip do computador que está executando o server.js. Obs.: Os dois computadores devem estar na mesma rede (é claro).

4. Após isso, pode executar o main.js com o seguinte comando:

```
node main.js
```

5. O computador que executar o main.js começará o chat, enviando um número para trocar chaves e em seguida o computador enviará também um número de volta. A partir daí, o chat está livre para conversar.
