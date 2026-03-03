package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Quadro;
import com.example.demo.service.QuadroService;

@RequestMapping("/api/quadro")
@RestController

public class QuadroController {

    private final QuadroService quadroService;

    public QuadroController(QuadroService quadroService) {
        this.quadroService = quadroService;
    }

    @PostMapping("/usuario/{usuarioId}")
    public Quadro criarQuadro(@PathVariable Long usuarioId, @RequestBody Quadro quadro) {
        return quadroService.criarQuadro(usuarioId, quadro);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Quadro> listarQuadros(@PathVariable Long usuarioId) {
        return quadroService.listarQuadrosPorUsuario(usuarioId);
    }
}
