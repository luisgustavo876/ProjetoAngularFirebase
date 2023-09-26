<?php

    // Inclui o arquivo de conexão com o BD
    include '../habilitar_cors.php';
    include '../conexao.php';

    $data = file_get_contents("php://input");

    // Decodifica o JSON para um objeto PHP
    $requestData = json_decode($data);
    var_dump($requestData);

    // Declaração SQL a ser executada
    $sql = "INSERT INTO funcionarios (Sobrenome, Nome, Cargo, DataNasc, Endereco, Cidade, CEP, Pais, Fone, Salario) VALUES ($requestData->Sobrenome, $requestData->Nome, $requestData->Cargo, $requestData->DataNasc, $requestData->Endereco, $requestData->Cidade, $requestData->CEP, $requestData->Pais, $requestData->Fone, $requestData->Salario)";

    // Executa a declaração SQL
    if ($connection->query($sql) === true) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir dados: " . $connection->error;
    }

?>