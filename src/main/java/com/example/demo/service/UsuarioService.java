package com.example.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.Usuario;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvarUsuario(Usuario novoUsuario) {
        System.out.println("Usuario salvo com sucesso: " + novoUsuario.getNome());
        return usuarioRepository.save(novoUsuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}
