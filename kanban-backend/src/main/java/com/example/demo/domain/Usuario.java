package com.example.demo.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @Email(message = "O e-mail deve ser válido")
    @NotBlank(message = "O e-mail é obrigatório")
    @Column(nullable = false, unique = true)
    private String email;

    /*/@Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Column(nullable = false)/*/
    private String senha;

    @Column(columnDefinition = "varchar(255) default 'A_FAZER'")
    private String status = "A_FAZER";

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}