# chat-seguro
Chat criptografado com cifra Simple Des, utilizando a troca de chaves por meio Diff Hellman.

## Autores
### Jośe Alex Alves Pereira
### Marcio Venicio Nascimento Silva

## Sobre este projeto

O chat seguro é um projeto da disciplina de Segurança de Redes da UFRN, que consiste em desenvolver um meio de comunicação segura através de sockets. Para realizarmos esse trabalho tivemos que estudar sobre cifras de blocos, especificamente o Simple DES, apesar da atividade requerir a utilização do RC4, mas esse não fizemos. A principal dificuldade na execução desse trabalho foi a utilização de sockets (algo novo até então), foi onde perdemos mais tempo de desenvolvimento e que acabou nos impossibilitando de implementar o RC4. O passa a passo do algoritmo SDES estava bem descrito nos slides de aula, cabendo a nós transferir as rotinas ali expressas para alguma linguagem, que no caso foi NodeJs. A partir daí foi só questão de sintaxe e como executar certas operações no javascript, assim como utilizar sockets de forma a possibilitar a comunicação pela rede.