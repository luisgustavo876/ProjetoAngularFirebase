<?php

    // Inclui o arquivo de conexão com o BD
    include '../habilitar_cors.php';
    include '../conexao.php';

    $data = file_get_contents("php://input");

    // Decodifica o JSON para um objeto PHP
    $requestData = json_decode($data);
    var_dump($requestData);
    // Declaração SQL a ser executada
    $sql = "UPDATE funcionarios SET $requestData->Sobrenome, $requestData->Nome, $requestData->Cargo, $requestData->DataNasc, $requestData->Endereco, $requestData->Cidade, $requestData->CEP, $requestData->Pais, $requestData->Fone, $requestData->Salario  WHERE CodFun='$requestData->CodFun'";

    // Executa a declaração SQL
    if ($connection->query($sql) === true) {
        echo "Dados atualizados com sucesso.";
    } else {
        echo "Erro ao atualizar dados: " . $connection->error;
    }

?