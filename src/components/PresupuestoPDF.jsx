import { calcularPrecio } from "../utils/precio";

export default function PresupuestoPDF({ config }) {
  const { total, detalle } = calcularPrecio(config);

  return (
    <div className="pdf">
      <h1>Presupuesto Colchón Totem</h1>

      <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>

      <h2>Configuración</h2>
      <ul>
        <li>Altura: {config.altura} cm</li>
        <li>Núcleo: {config.nucleo}</li>
        <li>Capa: {config.capas[0]}</li>
        <li>Tela: {config.tela}</li>
      </ul>

      <h2>Detalle de precio</h2>
      <table>
        <tbody>
          {detalle.map((item, i) => (
            <tr key={i}>
              <td>{item.label}</td>
              <td>${item.valor.toLocaleString("es-AR")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="pdf-total">
        Total: ${total.toLocaleString("es-AR")}
      </h2>

      <p className="pdf-footer">
        Presupuesto válido por 7 días
      </p>
    </div>
  );
}
