export function calcularPrecio(config, precios) {
  if (!precios) return null;

  const base = precios.base || 0;

  const altura =
    precios.altura?.[config.altura] || 0;

  const nucleo =
    precios.nucleo?.[config.nucleo] || 0;

  const capa =
    precios.capas?.[config.capas?.[0]] || 0;

  const tela =
    precios.telas?.[config.tela] || 0;

  const total =
    base + altura + nucleo + capa + tela;

  return {
    base,
    altura,
    nucleo,
    capa,
    tela,
    total,
  };
}

