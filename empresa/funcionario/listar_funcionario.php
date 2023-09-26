<?php

    require '../habilitar_cors.php';
    require '../conexao.php';

    // Declaração SQL a ser executada
    $sql = "SELECT * FROM funcionarios;";

    // Executa a declaração SQL e retorna o resultado
    $result = $connection->query($sql);

    // Verificar se há linhas de registros no resultado
    if ($result->num_rows > 0) {
        $funcionarios = [];
        // Faz Loop em cada registro recuperado
        while ($row = $result->fetch_assoc()) {
            // Access the data in each row
                array_push($funcionarios, $row);
        }
        $response = [
            'funcionarios' => $funcionarios
        ];
        echo json_encode($response);

    } else {
        $response = [
            'funcionarios' => 'Nenhum registro encontrado!'
        ];
        
        echo "Nenhum registro encontrado!";
    }

?>