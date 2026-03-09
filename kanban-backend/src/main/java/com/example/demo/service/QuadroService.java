package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.Quadro;
import com.example.demo.domain.Usuario;
import com.example.demo.repository.QuadroRepository;
import com.example.demo.repository.UsuarioRepository;

@Service
public class QuadroService {
    private final QuadroRepository quadroRepository;
    private final UsuarioRepository usuarioRepository;

    public QuadroService(QuadroRepository quadroRepository, UsuarioRepository usuarioRepository) {
        this.quadroRepository = quadroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Quadro criarQuadro(Long usuarioId, Quadro novoQuadro){
        Usuario donoDoQuadro = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        novoQuadro.setUsuario(donoDoQuadro);

        System.out.println(donoDoQuadro.getNome() + ""+ "Quadro criado: " + novoQuadro.getTitulo() + " por ");
        return quadroRepository.save(novoQuadro);
    }

    public List<Quadro> listarQuadrosPorUsuario(Long usuarioId) {
        return quadroRepository.findByUsuarioId(usuarioId);
    }
    

}
