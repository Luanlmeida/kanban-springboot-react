package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByQuadroId(Long quadroId);
}