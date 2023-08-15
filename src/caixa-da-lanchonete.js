class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    // caso do pagamento não aceito/inválido
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!'
    }

    if (
      !(
        metodoDePagamento === 'dinheiro' ||
        metodoDePagamento === 'debito' ||
        metodoDePagamento === 'credito'
      )
    ) {
      return 'Forma de pagamento inválida!'
    }

    let value = 0
    let size = itens.length
    let nChantily = 0
    let nCafe = 0
    let nQueijo = 0
    let nSanduicho = 0

    // ['cafe,1','chantily,1']
    for (let i = 0; i < size; i++) {
      let orderArrayTest = []
      orderArrayTest = itens[i].split(',')
      for (let j = 0; j < size; j++) {
        if (orderArrayTest[j] === 'chantily') {
          nChantily++
        }
        if (orderArrayTest[j] === 'cafe') {
          nCafe++
        }
        if (orderArrayTest[j] === 'queijo') {
          nQueijo++
        }
        if (orderArrayTest[j] === 'sanduiche') {
          nSanduicho++
        }
      }
    }
    if (nChantily > nCafe || nQueijo > nSanduicho) {
      return 'Item extra não pode ser pedido sem o principal'
    }

    let obj = {
      cafe: 3,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5
    }

    for (let i = 0; i < size; i++) {
      // ['cafe,1','chantily,1']

      let orderArray = itens[i].split(',')

      let order = orderArray[0]
      let quantity = orderArray[1]

      if (!(order in obj)) {
        return 'Item inválido!'
      }

      if (quantity < 1) {
        return 'Quantidade inválida!'
      }
      value += obj[order] * quantity
    }

    if (metodoDePagamento === 'dinheiro') {
      let discount = 5 / 100
      value = value - value * discount
    }

    if (metodoDePagamento === 'credito') {
      let charge = 3 / 100
      value = value + value * charge
    }

    value = value.toFixed(2)

    return 'R$ ' + value.toString().replace('.', ',')
  }
}

export { CaixaDaLanchonete }
