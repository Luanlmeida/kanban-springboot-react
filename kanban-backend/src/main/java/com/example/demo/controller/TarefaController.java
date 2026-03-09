package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Tarefa;
import com.example.demo.service.TarefaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tarefas")
@RequiredArgsConstructor
public class TarefaController {

    private final TarefaService tarefaService;

    @PostMapping("/quadro/{quadroId}")
    public Tarefa criarTarefa(@PathVariable Long quadroId,@Valid @RequestBody Tarefa tarefa) {
        return tarefaService.criarTarefa(quadroId, tarefa);
    }

    @GetMapping("/quadro/{quadroId}")
    public List<Tarefa> listarTarefasPorQuadro(@PathVariable Long quadroId) {
        return tarefaService.listarPorQuadro(quadroId);
    }
}
