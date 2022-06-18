// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.7;

contract DiceGame {
    // Esse é o dono do contrato
    address owner;

    // No construtor, define-se que o dono é quem fez o deployment
    constructor() {
        owner = msg.sender;
    }

    // O modifier onlyOwner pode ser adicionado aos métodos do contrato, e permite que eles sejam chamados apelas pelo dono.
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can access this function"
        );
        _;
    }

    // Essa função retorna os fundos do contrato
    function getFunds() public view onlyOwner returns (uint256) {
        return (address(this).balance);
    }

    // Permite que o dono resgate todos os fundos do contrato
    function withdrawl() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Permite que o dono adicione fundos ao contrato
    function addFunds() public payable onlyOwner {}

    // Função privada, gera um numero pseudoaleatório entre 1 e 6 (simulando um dado)
    function rollDice() private view returns (uint256) {
        return
            (uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % 6) + 1;
    }

    // Função para apostar
    // Recebe como parametro, um número entre 1 e 6;
    function bet(uint256 number) public payable returns (uint256) {
        // Verifica se foi enviado um valor na aposta
        require(msg.value > 0, "You need to send money to bet");
        // Verifica se o contrato tem dinheiro para cobrir a aposta, caso ela seja vencedora
        require(
            msg.value * 6 < address(this).balance,
            "We don't have enough funds for this bet"
        );
        // Verifica se o numero está entre 1 e 6 inclusivo.
        require(number > 0 && number < 7, "Number should be between 1 and 6");

        // Gera o número do dado
        uint256 diceRoll = rollDice();

        if (diceRoll == number) {
            // Se o valor do dado for o mesmo apostado, devolve o dinheiro multiplicado por 5.94 (margem de 1%)
            payable(msg.sender).transfer((msg.value * 600) / 101);
        }
        // Devolve o valor que foi sorteado
        return diceRoll;
    }
}
