import React, { useState, useContext } from "react";
import { Button, TextField, Switch, FormControlLabel } from "@mui/material";
import ValidacoesCadastro from "../../contexts/ValidacoesCadastro";

function DadosPessoais({ aoEnviar }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [promocoes, setPromocoes] = useState(true);
  const [novidades, setNovidades] = useState(true);

  const [erros, setErros] = useState({ cpf: { valido: true, texto: "" } });

  const validacoes = useContext(ValidacoesCadastro);

  function validarCampos(e) {
    const { name, value } = e.target;
    const novoEstado = {...erros}
    novoEstado[name] = validacoes[name](value);
    setErros(novoEstado);
  }

  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }

    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (possoEnviar()) {
          aoEnviar({ nome, sobrenome, cpf, promocoes, novidades });
        }
      }}
    >
      <TextField
        id="nome"
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />

      <TextField
        id="sobrenome"
        label="Sobrenome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={sobrenome}
        onChange={(e) => {
          setSobrenome(e.target.value);
        }}
      />

      <TextField
        id="cpf"
        name="cpf"
        label="CPF"
        variant="outlined"
        fullWidth
        margin="normal"
        value={cpf}
        onChange={(e) => {
          setCpf(e.target.value);
        }}
        error={!erros.cpf.valido}
        helperText={erros.cpf.texto}
        onBlur={validarCampos}
      />

      <FormControlLabel
        label="Promoções"
        control={
          <Switch
            onChange={(e) => {
              setPromocoes(e.target.checked);
            }}
            name="promocoes"
            checked={promocoes}
            color="primary"
          />
        }
      />

      <FormControlLabel
        label="Novidades"
        control={
          <Switch
            onChange={(e) => {
              setNovidades(e.target.checked);
            }}
            name="Novidades"
            checked={novidades}
            color="primary"
          />
        }
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        margin="normal"
        size="large"
      >
        Próximo
      </Button>
    </form>
  );
}

export default DadosPessoais;
