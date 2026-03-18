# 📋 Kanban Board Enterprise (Estilo Jira)

Um sistema Full-Stack de gerenciamento de tarefas inspirado na interface corporativa do Jira Software. Desenvolvido para demonstrar a construção de uma API REST no backend e o consumo dinâmico no frontend.

## 🚀 Funcionalidades

- **Criação de Tarefas:** Cadastro rápido com geração automática de Avatar (UI Avatars) baseado no nome do usuário.
- **Movimentação Dinâmica:** Avanço e retrocesso de tarefas entre as colunas "A Fazer", "Fazendo" e "Feito".
- **Identidade Visual Dinâmica:** Bordas e botões mudam de cor automaticamente dependendo do status da tarefa.
- **Interface Responsiva e Limpa:** Design focado em produtividade utilizando Tailwind CSS.

## 💻 Tecnologias Utilizadas

### Frontend
- **React.js** (com Vite para build rápido)
- **Tailwind CSS** (Estilização avançada)
- **Axios** (Comunicação com a API REST)

### Backend
- **Java 17**
- **Spring Boot** (Spring Web, Spring Data JPA, Validation)
- **H2 Database** (Banco de dados em memória para testes rápidos)
- **Padrão MVC/API:** Controllers, Services, Entities e Repositories.

### DevOps / Infraestrutura
- **Docker** (Arquivos `Dockerfile` já configurados para deploy em contêineres do Front e Backend).

---

## 🛠️ Como rodar o projeto na sua máquina

Certifique-se de ter o **Java 17+** e o **Node.js** instalados na sua máquina.

### 1. Rodando o Backend (Spring Boot)
1. Abra o terminal na pasta raiz do backend.
2. Execute o comando:
   ```bash
   ./mvnw spring-boot:run
