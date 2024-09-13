## Todo:

* Fazer o tratamento do barramento de dos servicoes se eles estiverem fora do ar  ✔️
* Fazer o tratamento dos erros de cada servico com status code✔️
* Adicionar o banco de dados de Tokens ✔️
* Criar dockers para cada banco ✔️
* fazer o CRUD nos bancos para replicar os dados nos eventos ✔️

## topicos importantes
* criar um lugar compartilhado entre todos os microsservicos, nele colocar a definição de todos os tipos que precisam estar em mais de um microsservico, colocar todos os routes compartilhados, e todos os middlewares compartilhados ✔️

* alem de comandos de criação de databases compartilhadas



## 09/09 
* arrumar todos os microsservicos para funcionar com novo rabbitmq-utility 
* lista de endpoint, nomes aos bois, definir em variaveis de ambientes no frontend quais urls representam os endpoints 
* fazer o frontend
    * login
    * registrar usuario
    * fazer upload de imagens
    * classificação
    * validação das classificações
        * fazer um endpoint no ImageService, para fornecer todas as imagens
        * fazer um endpoint no ClassificationService para fornecer todas image_id associados a um usuario
        * avaliar a mudança de image_id para image_token
 


 * ImageConsumer.proccessMessage() insere imagem no BD, mas a classe filha ClassificationServiceImageConsumer faz override, inserindo "imageAllocation" no BD,
    então a função original nunca é usada?

 * O ClassificationService não está replicando a tabela Sessions, embora use authMiddleWare, que acessa ela