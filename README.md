# Consulta DF-e

## 📖 Sobre o Projeto

**Consulta DF-e** é uma ferramenta web desenvolvida para simplificar e agilizar a consulta de Documentos Fiscais Eletrônicos (DF-e) no Brasil. A aplicação permite que o usuário consulte um MDF-e ou CT-e inserindo a chave de 44 dígitos e oferece um atalho para o portal de consulta de NF-e.

O projeto foi criado para ser uma solução rápida e centralizada, direcionando o usuário para os portais oficiais de consulta do governo após a validação da chave, otimizando o tempo e evitando erros de digitação.

O site do projeto pode ser acessado em: [https://kanashiidesu.github.io/Consulta-DF-e/](https://kanashiidesu.github.io/Consulta-DF-e/)

## ✨ Funcionalidades

* **Consulta de MDF-e**: Permite a inserção da chave de 44 dígitos para consultar um Manifesto Eletrônico de Documentos Fiscais.
* **Consulta de CT-e**: Permite a inserção da chave de 44 dígitos para consultar um Conhecimento de Transporte Eletrônico.
* **Atalho para NF-e**: Um botão direciona o usuário para o portal oficial de consulta da Nota Fiscal Eletrônica.
* **Validação de Documento**: O sistema identifica o modelo do documento (55 para NF-e, 57 para CT-e, 58 para MDF-e) a partir da chave e informa ao usuário caso ele esteja usando o campo incorreto.
* **Interface Responsiva**: O design se adapta a diferentes tamanhos de tela, funcionando bem tanto em desktops quanto em dispositivos móveis.
* **Feedback ao Usuário**: Modais interativos são usados para exibir mensagens de erro (ex: chave inválida) ou alertas, garantindo uma experiência de uso clara.
* **Validação de Entrada**: Os campos de chave aceitam apenas a inserção de números, prevenindo erros de digitação.

## 🛠️ Tecnologias Utilizadas

* **HTML5**: Estrutura principal da aplicação.
* **CSS3**: Estilização e design responsivo.
* **JavaScript (Vanilla)**: Lógica do cliente, validação de chaves e interatividade.
* **Font Awesome**: Biblioteca de ícones utilizada na interface.

## 🚀 Como Usar

1.  **Acesse o site**: Abra o link [https://kanashiidesu.github.io/Consulta-DF-e/](https://kanashiidesu.github.io/Consulta-DF-e/).
2.  **Para consultar MDF-e ou CT-e**:
    * Digite ou cole os 44 números da chave do documento no campo correspondente (`Chave do MDF-e` ou `Chave do CT-e`).
    * Clique no botão **"Consultar"** da respectiva seção.
    * Você será redirecionado para o portal oficial com os dados do documento.
3.  **Para consultar NF-e**:
    * Clique no botão **"Abrir Portal Oficial NF-e"**.
    * Você será levado ao site da Fazenda para realizar a consulta, onde será necessário resolver um hCaptcha.

## 👤 Autor

* **Thalis Gomes**
    * [GitHub](https://github.com/kanashiidesu)
    * [LinkedIn](https://linkedin.com/in/thalisgomes)
