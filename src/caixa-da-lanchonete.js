class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    // caso de não ter itens comprados
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!'
    }

    // caso do pagamento não aceito/inválido
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

    // verificador de se o acessório acompanha o principal
    // (metodoPagamento, ['cafe,1','chantily,1'])
    itens.forEach(element => {
      let orderArrayTest = []
      orderArrayTest = element.split(',')
      if (orderArrayTest[0] === 'chantily') {
        nChantily++
      }
      if (orderArrayTest[0] === 'cafe') {
        nCafe++
      }
      if (orderArrayTest[0] === 'queijo') {
        nQueijo++
      }
      if (orderArrayTest[0] === 'sanduiche') {
        nSanduicho++
      }
    })

    if ((nChantily > 0 && nCafe < 1) || (nQueijo > 0 && nSanduicho < 1)) {
      return 'Item extra não pode ser pedido sem o principal'
    }

    let codPrices = {
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

      if (!(order in codPrices)) {
        return 'Item inválido!'
      }

      if (quantity < 1) {
        return 'Quantidade inválida!'
      }
      value += codPrices[order] * quantity
    }

    if (metodoDePagamento === 'dinheiro') {
      let discount = 5 / 100
      value = value - value * discount
    }

    if (metodoDePagamento === 'credito') {
      let charge = 3 / 100
      value = value + value * charge
    }

    return 'R$ ' + value.toFixed(2).toString().replace('.', ',')
  }
}

export { CaixaDaLanchonete }
