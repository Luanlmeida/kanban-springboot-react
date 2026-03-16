package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Usuario;
import com.example.demo.service.UsuarioService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/usuarios")

public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listarTodosUsuarios() {
        System.out.println("Garçom recebeu pedido para listar todos os usuários!");
        return usuarioService.listarTodos();
    }

    @PostMapping
    public Usuario criarUsuario(@Valid @RequestBody Usuario novoUsuario) {
        System.out.println("Garçom recebeu pedido para criar um novo usuário: " + novoUsuario.getNome());
        return usuarioService.salvarUsuario(novoUsuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        System.out.println("Garçom recebeu pedido para deletar ID: " + id);
        usuarioService.deletarUsuario(id);
    }

    @PatchMapping("/{id}/status")
    public Usuario mudarStatus(@PathVariable Long id, @RequestBody String novoStatus) {
        String statusLimpo = novoStatus.replace("\"", "");
        return usuarioService.atualizarStatus(id, statusLimpo);
    }
}
