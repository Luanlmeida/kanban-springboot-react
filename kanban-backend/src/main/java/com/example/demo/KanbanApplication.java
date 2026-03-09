package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.domain.Usuario;
import com.example.demo.repository.UsuarioRepository;

@SpringBootApplication
public class KanbanApplication {

    public static void main(String[] args) {
        SpringApplication.run(KanbanApplication.class, args);
    }

	@Bean
	public CommandLineRunner testarBancoDeDados(UsuarioRepository usuarioRepository) {
		return args -> {
			System.out.println("================================");
			System.out.println("Testando conexão com o banco de dados...");
			
			Usuario novoUsuario = new Usuario();
			novoUsuario.setNome("Usuário de Teste");
			novoUsuario.setEmail("usuario@teste.com");
			novoUsuario.setSenha("123456");

			usuarioRepository.save(novoUsuario);
			System.out.println("Usuário de teste salvo com sucesso!");

			Usuario usuariosalvo = usuarioRepository.findAll().get(0);

		System.out.println("Usuário encontrado: " + usuariosalvo.getNome() + " - " + usuariosalvo.getEmail());
		System.out.println("================================");
		};
	}
}