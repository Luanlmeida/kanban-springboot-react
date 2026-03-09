package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.Quadro;
import com.example.demo.domain.Tarefa;
import com.example.demo.repository.QuadroRepository;
import com.example.demo.repository.TarefaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final QuadroRepository quadroRepository;

    public Tarefa criarTarefa(Long quadroId, Tarefa novaTarefa) {
        Quadro quadro = quadroRepository.findById(quadroId)
                .orElseThrow(() -> new RuntimeException("Quadro não encontrado"));

        novaTarefa.setQuadro(quadro);
        novaTarefa.setStatus("TODO");

        return tarefaRepository.save(novaTarefa);
    }

    public List<Tarefa> listarPorQuadro(Long quadroId) {
        return tarefaRepository.findByQuadroId(quadroId);
    }

}
