const mysql = require('mysql2/promise'); //Importa o módulo mysql2/promise para permitir a conexão com o banco de dados MySQL usando Promises, facilitando o uso de async/await.
const connect = mysql.createPool({
    host: 'endereço de servidor MySQL',      // endereço de servidor MySQL
    user: 'usuário MySQL',           // usuário MySQL
    password: 'senha MySQL',      // senha MySQL
    database: 'nome do banco de dados'    // nome do banco de dados
});

module.exports = connect;

const readline = require('readline'); //Importa o módulo readline do Node.js para permitir a leitura de entrada do usuário via terminal.
const rl = readline.createInterface({ //Cria uma interface de leitura para capturar a entrada do usuário.
    input: process.stdin,
    output: process.stdout
});
function input(pergunta) { //Declara uma função chamada input que recebe uma pergunta como parâmetro.
    return new Promise((value) => {
        rl.question(pergunta, value)
    });
};

/* Variáveis globais para controle de estado */
const lista_de_usuarios = {}; //Objeto para armazenar os dados dos usuários cadastrados.
let usuario = 0; //Controla o número de usuários (índice no objeto).

/*Variáveis para armazenar dados individuais do usuário e cálculos nutricionais.*/
let nome, email, idade, peso, altura, sexo_numero;
let carboidrato, proteina, gordura, total_nutrientes, min_agua, ideal_agua;
let TMB, total_calorias;
let kcal_carboidrato, kcal_proteina, kcal_gordura



async function dados() {
    //Função que coleta os dados básicos do usuário.
    nome = await input('\ndigite seu nome: ')
    email = await input('\ndigite seu email: ')
    idade = parseInt(await input('\ndigite sua idade: '))
    peso = parseInt(await input('\ndigite seu peso: '))
    altura = parseInt(await input('\ndigite sua altura: '))
    console.log('\n\t\t1-Masculino 2-Feminino')
    sexo_numero = await input('digite seu sexo: ')
    /*Verifica se o sexo é válido (1 ou 2) e se idade, peso e altura são números.
    Se algum valor for inválido, exibe uma mensagem e retorna ao menu.*/
    if (!['1', '2'].includes(sexo_numero) || isNaN(idade) || isNaN(peso) || isNaN(altura)) {
        console.log('\num dos indices está invalido')
        menu()
    } else {      //Se todos os dados forem válidos, chama a função masculino() ou feminino() de acordo com a entrada do usuário.
        switch (sexo_numero) {
            case '1':
                masculino()
                break
            case '2':
                feminino()
                break
        }
    }
};

//Define a função assíncrona masculino(), chamada quando o usuário se identifica como do sexo masculino.
async function masculino() {
    //Calcula a Taxa Metabólica Basal (TMB) para homens usando a fórmula de Harris-Benedict.
    TMB = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
    console.log(`    \n1-Sedentário (pouco ou nenhum exercício) 
2-Levemente ativo (exercício leve 1-3 dias por semana) 
3-Moderadamente ativo (exercício moderado 3-5 dias por semana) 
4-Muito ativo (exercício intenso 6-7 dias por semana)`)

    let fisico = await input('\n\t\tQuão intenso costuma ser o seus treinos?: ')
    //Verifica se a entrada é válida (entre 1 e 4). Se não for, exibe erro e retorna ao menu principal.
    if (!['1', '2', '3', '4'].includes(fisico)) {
        console.log('\nindice invalido')
        menu()
    } else {
        switch (fisico) {
            case '1':
                fisico1()
                break
            case '2':
                fisico2()
                break
            case '3':
                fisico3()
                break
            case '4':
                fisico4()
                break
        }
    }
};

//Define a função assíncrona feminino(), chamada quando o usuário se identifica como do sexo feminino.
async function feminino() {
    //Calcula a Taxa Metabólica Basal (TMB) para homens usando a fórmula de Harris-Benedict.
    TMB = 447.593 + (9.247 * peso) + (3.1 * altura) - (4.330 * idade)
    console.log(`   \n1-Sedentária (pouco ou nenhum exercício) 
2-Levemente ativa (exercício leve 1-3 dias por semana) 
3-Moderadamente ativa (exercício moderado 3-5 dias por semana) 
4-Muito ativa (exercício intenso 6-7 dias por semana)`)

    let fisico = await input('\n\t\tQuão intenso costuma ser o seus treinos?: ')
    //Verifica se a entrada é válida (entre 1 e 4). Se não for, exibe erro e retorna ao menu principal.
    if (!['1', '2', '3', '4'].includes(fisico)) {
        console.log('\nindice invalido')
        menu()
    } else {
        switch (fisico) {
            case '1':
                fisico1()
                break
            case '2':
                fisico2()
                break
            case '3':
                fisico3()
                break
            case '4':
                fisico4()
                break
        }
    }
};

//Declara uma função assíncrona chamada fisico1, que será usada quando o usuário indicar que é sedentário (nível de atividade 1).
async function fisico1() {
    carboidrato = peso * 3.5
    proteina = peso * 1
    gordura = peso * 1
    total_nutrientes = carboidrato + proteina + gordura
    total_calorias = TMB * 1.2
    kcal_carboidrato = total_calorias * 0.56
    kcal_proteina = total_calorias * 0.19
    kcal_gordura = total_calorias * 0.25
    cadastro_feito()//Chama a função calculos-feitos(), que calcula os gramas de macronutrientes e o consumo de água, e salva os dados do usuário.
};

//Declara uma função assíncrona chamada fisico2, que será usada quando o usuário indicar que é levemente ativo (nível de atividade 2).
async function fisico2() {
    carboidrato = peso * 4.5
    proteina = peso * 1.2
    gordura = peso * 1
    total_nutrientes = carboidrato + proteina + gordura
    total_calorias = TMB * 1.375
    kcal_carboidrato = total_calorias * 0.56
    kcal_proteina = total_calorias * 0.19
    kcal_gordura = total_calorias * 0.25
    cadastro_feito()//Chama a função calculos-feitos(), que calcula os gramas de macronutrientes e o consumo de água, e salva os dados do usuário.
};

//Declara uma função assíncrona chamada fisico3, que será usada quando o usuário indicar que é moderadamente ativo (nível de atividade 3).
async function fisico3() {
    carboidrato = peso * 7.5
    proteina = peso * 1.6
    gordura = peso * 1
    total_nutrientes = carboidrato + proteina + gordura
    total_calorias = TMB * 1.55
    kcal_carboidrato = total_calorias * 0.56
    kcal_proteina = total_calorias * 0.19
    kcal_gordura = total_calorias * 0.25
    cadastro_feito()//Chama a função calculos-feitos(), que calcula os gramas de macronutrientes e o consumo de água, e salva os dados do usuário.
};

//Declara uma função assíncrona chamada fisico4, que será usada quando o usuário indicar que é muito ativa (nível de atividade 4).
async function fisico4() {
    carboidrato = peso * 10
    proteina = peso * 1.8
    gordura = peso * 1
    total_nutrientes = carboidrato + proteina + gordura
    total_calorias = TMB * 1.725
    kcal_carboidrato = total_calorias * 0.56
    kcal_proteina = total_calorias * 0.19
    kcal_gordura = total_calorias * 0.25
    cadastro_feito()//Chama a função calculos-feitos(), que calcula os gramas de macronutrientes e o consumo de água, e salva os dados do usuário.
};
/*Declara uma função assíncrona chamada calorias_detalhado, responsável 
por exibir o gasto calórico total e o detalhamento das calorias provenientes de macronutrientes.*/
async function calorias_detalhado() {
    console.log('\n\t\tGASTO CALÓRICO TOTAL')//Exibe o título para a seção de gasto calórico total.
    console.log(`\nSEU GASTO CALÓRICO TOTAL é  ${total_calorias.toFixed(0)} calorias.`)//Mostra o valor do total_calorias (Taxa Metabólica Basal ajustada ao nível de atividade)
    console.log('\n\t\tCONSUMO DE CALORIAS')//Exibe o título para a seção de calorias provenientes de macronutrientes.
    console.log(`\nCalorias em carboidratos que voce precisa: ${kcal_carboidrato.toFixed(0)} kcal 
Calorias em proteinas que você precisa: ${kcal_proteina.toFixed(0)} kcal 
Calorias em gorduras que vocÊ precisa: ${kcal_gordura.toFixed(0)} kcal`)
    /*Mostra a quantidade de calorias que devem ser consumidas por dia vindas de:
      Carboidratos
      Proteínas
      Gorduras
      (com valores arredondados para o número inteiro mais próximo)*/
    console.log('\n1-menu | 2-consumo total de macronutrientes detalhado | 3-sair')//Exibe um menu de opções para o usuário escolher o próximo passo.
    let escolha = await input('\ndigite sua escolha: ')//Aguarda a entrada do usuário, que deve digitar uma das opções listadas acima (1, 2 ou 3).
    //Verifica se a entrada é válida (entre 1 e 3). Se não for, exibe erro e retorna ao menu principal
    if (!['1', '2', '3'].includes(escolha)) {
        console.log('\nindice invalido')
        menu()
    } else {
        switch (escolha) {
            case '1':
                menu()
                break
            case '2':
                macronutrientes_detalhado()
                break
            case '3':
                sair()
        }
    }
};

/*Declara uma função assíncrona chamada macronutrientes_detalhado, que mostra a quantidade 
de macronutrientes (em gramas) que a pessoa deve consumir por dia. */
async function macronutrientes_detalhado() {
    console.log('\n\t\tCONSUMO DE MACRONUTRIENTES')//Exibe o título da seção sobre o consumo de macronutrientes.
    console.log(`Valor total de MACRONUTRIENTES: ${total_nutrientes.toFixed(0)}g 
    
Carboidratos que você precisa: ${carboidrato.toFixed(0)}g 
Proteinas que você precisa: ${proteina.toFixed(0)}g 
Gorduras que você precisa: ${gordura.toFixed(0)}g`)
    /*Total de gramas de macronutrientes (total_nutrientes)
    Gramas necessárias de carboidratos
    Gramas necessárias de proteínas
    Gramas necessárias de gorduras
    Todos os valores são arredondados para 0 casas decimais usando*/
    console.log('\n1-menu | 2-consumo total de calorias detalhado | 3-sair')
    let escolha = await input('\ndigite sua escolha: ')
    //Verifica se a entrada é válida (entre 1 e 3). Se não for, exibe erro e retorna ao menu principal
    if (!['1', '2', '3'].includes(escolha)) {
        console.log('\nindice invalido')
        menu()
    } else {
        switch (escolha) {
            case '1':
                menu()
                break
            case '2':
                calorias_detalhado()
                break
            case '3':
                sair()
        }
    }
};

//Declara uma função assíncrona chamada calculos_feitos. Ela é responsável por calcular 
//macronutrientes, água e registrar os dados do usuário.
async function cadastro_feito() {
    //Calcula a quantidade de carboidratos, proteínas e gorduras com base na proporção sobre o peso.
    //Soma o total de macronutrientes em gramas.
    //Calcula o consumo mínimo e ideal de água por dia com base no peso (30 ml e 50 ml por kg, respectivamente).
    min_agua = 0.030 * peso
    ideal_agua = 0.050 * peso

    if (sexo_numero === '1') { //Verifica se o sexo é masculino.
        let sexo = 'masculino'
        lista_de_usuarios[usuario] = {//Armazena os dados do usuário em um objeto, adicionando-o à lista de usuários.
            //Define as propriedades do usuário com os dados calculados e formatados.
            nome: nome,
            email: email,
            idade: idade,
            peso: peso,
            altura: altura,
            sexo: sexo,
            'total de calorias': (`${total_calorias.toFixed(0)}kcal`),
            'total de nutrientes': (`${total_nutrientes.toFixed(0)}g`),
            'cons minimo de agua': (`${min_agua.toFixed(1)} litros`),
            'cons ideal de agua': (`${ideal_agua.toFixed(1)} litros`)
        };

        // No trecho de inserção para usuário masculino (dentro do if (sexo_numero==='1'))
        await inserir_bancoDB(
            nome, email, idade, peso, altura, sexo, total_calorias, total_nutrientes, min_agua, ideal_agua, kcal_carboidrato,
            kcal_proteina,  // Trocado com gordura
            kcal_gordura,   // Trocado com proteina
            carboidrato,
            proteina,
            gordura
        );

        usuario++//Incrementa o índice para o próximo usuário.
        console.table(lista_de_usuarios)//Exibe a lista de usuários em formato de tabela
        console.log('\n1-menu | 2-consumo total de calorias detalhado | 3-consumo total de macronutrientes detalhado | 4-sair')
        //Mostra o menu de opções e aguarda a entrada do usuário.
        let escolha = await input('\ndigite sua escolha: ')
        if (!['1', '2', '3', '4'].includes(escolha)) {//Verifica se a escolha é válida. Se não for, exibe erro e volta ao menu.
            console.log('\nindice invalido')
            menu()
        } else {
            switch (escolha) {//Executa a função correspondente à escolha do usuário.
                case '1':
                    menu()
                    break
                case '2':
                    calorias_detalhado()
                    break
                case '3':
                    macronutrientes_detalhado()
                    break
                case '4':
                    sair()
            }
        }
    }

    else if (sexo_numero === '2') {//verifica se o sexo é feminino
        let sexo = 'feminino'

        lista_de_usuarios[usuario] = {//Armazena os dados do usuário em um objeto, adicionando-o à lista de usuários.
            //Define as propriedades do usuário com os dados calculados e formatados.
            nome: nome,
            email: email,
            idade: idade,
            peso: peso,
            altura: altura,
            sexo: sexo,
            'total de calorias': (`${total_calorias.toFixed(0)}kcal`),
            'total de nutrientes': (`${total_nutrientes.toFixed(0)}g`),
            'cons minimo de agua': (`${min_agua.toFixed(1)} litros`),
            'cons ideal de agua': (`${ideal_agua.toFixed(1)} litros`)
        }

        // No trecho de inserção para usuário masculino (dentro do if (sexo_numero==='1'))
        await inserir_bancoDB(
            nome, email, idade, peso, altura, sexo, total_calorias, total_nutrientes, min_agua, ideal_agua, kcal_carboidrato,
            kcal_proteina,  // Trocado com gordura
            kcal_gordura,   // Trocado com proteina
            carboidrato,
            proteina,
            gordura
        );

        usuario++//Incrementa o índice para o próximo usuário.
        console.table(lista_de_usuarios)//Exibe a lista de usuários em formato de tabela
        console.log('\n1-menu | 2-consumo total de calorias detalhado | 3-consumo total de macronutrientes detalhado | 4-sair')
        //Mostra o menu de opções e aguarda a entrada do usuário.
        let escolha = await input('digite sua escolha: ')
        if (!['1', '2', '3', '4'].includes(escolha)) {//Verifica se a escolha é válida. Se não for, exibe erro e volta ao menu.
            console.log('\nindice invalido')
            menu()
        } else {
            switch (escolha) {//Executa a função correspondente à escolha do usuário.
                case '1':
                    menu()
                    break
                case '2':
                    calorias_detalhado()
                    break
                case '3':
                    macronutrientes_detalhado()
                    break
                case '4':
                    sair()
            }
        }
    }
};

//Define uma função chamada ver_usuario (não é assíncrona pois não há await dentro).
async function ver_usuario() {
    try {
        const connection = await connect.getConnection();
        const [rows] = await connection.query('SELECT * FROM usuario');
        connection.release();

        if (rows.length === 0) {
            console.log('nenhum usuario encontrado.')
        } else {
            rows.forEach((usuario, index) => {
                console.log(`\nUsuário ${index + 1}:`);
                console.log(`Nome: ${usuario.nome}`);
                console.log(`Idade: ${usuario.idade}`);
                console.log(`Peso: ${usuario.peso}`);
                console.log(`Altura: ${usuario.altura}`);
                console.log(`Sexo: ${usuario.sexo}`);
                console.log(`Água mínima: ${usuario.min_agua}L`);
                console.log(`Água ideal: ${usuario.ideal_agua}L`);
                console.log(`Total de nutrientes: ${usuario.total_nutrientes}g`);
                console.log(`Carboidrato: ${usuario.carboidrato}g`);
                console.log(`Proteína: ${usuario.proteina}g`);
                console.log(`Gordura: ${usuario.gordura}g`);
                console.log(`Total de calorias: ${usuario.total_calorias}kcal`);
                console.log(`Carboidrato em calorias: ${usuario.kcal_carboidrato}kcal`)
                console.log(`Proteina em calorias: ${usuario.kcal_proteina}kcal`)
                console.log(`Gordura em calorias: ${usuario.kcal_gordura}kcal`)
                console.log('-----------------------------');
            })
        }
    } catch (err) {
        console.error('Erro ao buscar usuários:', err.message);
    }
    console.log('\n1-menu | 2-sair')
    let escolha = await input('digite sua escolha: ')
    if (!['1', '2'].includes(escolha)) {
        console.log('\nindice invalido')
        menu()
    } else {
        switch (escolha) {
            case '1':
                menu()
                break
            case '2':
                sair()
        }
    }
};

//Declara uma função assíncrona chamada deletar, permitindo o uso de await para entrada do usuário.
async function deletar() {

    let usuario_deletar = parseInt(await input('digite o numero do usuario que você quer deletar da lista: '))//pede ao usuário o número (índice) do usuário que deseja deletar da lista e espera pela resposta.
    if (lista_de_usuarios[usuario_deletar]) {//Verifica se existe um usuário na posição especificada (índice válido e não undefined).
        delete lista_de_usuarios[usuario_deletar]//Remove o usuário do objeto lista_de_usuarios usando o operador delete.
        console.log('\n\t\tusuario deletado')//Informa que o usuário foi deletado com sucesso.
        console.table(lista_de_usuarios)
    } else { //Se o número digitado não corresponde a um usuário válido...
        console.log('\nusuario não encontrado') //Informa que o índice informado não pertence a nenhum usuário cadastrado.
    }
    menu()
};

async function sair() {//Declara uma função assíncrona chamada sair, permitindo o uso de await se necessário (mesmo que não esteja sendo usado aqui).
    console.log('\nsaindo...')//Exibe no terminal a mensagem "saindo..." para indicar que o programa será encerrado.
    rl.close()//Fecha a interface de leitura (readline) do Node.js, encerrando a entrada de dados do usuário e finalizando o programa.
};

async function menu() {//Declara uma função assíncrona chamada menu, permitindo o uso de await.
    console.log('\n1-iniciar | 2-ver lista de usuarios | 3-deletar | 4-sair')//Exibe no terminal um menu de opções para o usuário escolher o que deseja fazer.
    let escolha = await input('\ndigite sua escolha: ')//Aguarda o usuário digitar uma escolha (de 1 a 4) e armazena a entrada em escolha.
    if (!['1', '2', '3', '4'].includes(escolha)) {//Verifica se a escolha do usuário não está entre as opções válidas.
        console.log('\nindice invalido')//Mostra uma mensagem de erro se a entrada for inválida.
        menu()//Rechama a função menu() caso a entrada seja inválida, reiniciando o menu.
    } else {//Inicia o bloco para tratar escolhas válidas (1 a 4).
        switch (escolha) {
            case '1':
                dados()
                break
            case '2':
                ver_usuario()
                break
            case '3':
                deletar()
                break
            case '4':
                sair()
                break
        }
    }
};

// Na função inserir_bancoDB, ajuste a ordem dos parâmetros
async function inserir_bancoDB(nome, email, idade, peso, altura, sexo, total_calorias,
    total_nutrientes, min_agua, ideal_agua, kcal_carboidrato,
    kcal_proteina, kcal_gordura, carboidrato, proteina, gordura) {
    try {
        const [result] = await connect.execute(
            `INSERT INTO usuario (
        nome, email, idade, peso, altura, sexo, total_calorias, total_nutrientes, min_agua,
         ideal_agua, kcal_carboidrato, kcal_proteina, kcal_gordura, carboidrato, proteina, gordura
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nome, email, idade, peso, altura, sexo, total_calorias, total_nutrientes,
                min_agua, ideal_agua, kcal_carboidrato, kcal_proteina, kcal_gordura, carboidrato, proteina, gordura
            ]
        );
        return result;
    } catch (error) {
        console.error('Erro no banco de dados:', error);
        throw error;
    }
}

menu();//Chama imediatamente a função menu() para iniciar o programa assim que ele for executado.