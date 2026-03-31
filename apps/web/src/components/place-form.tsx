export function PlaceForm() {
  return (
    <form className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <span className="badge">Anuncie no portal</span>
          <h2 style={{ marginBottom: 0 }}>Cadastre sua empresa no Guia Caminhoneiro</h2>
        </div>
        <button className="button" type="submit">Publicar anuncio</button>
      </div>

      <div className="form-grid">
        <label>
          Nome da empresa
          <input className="input" defaultValue="Posto Serra Azul" />
        </label>
        <label>
          Categoria principal
          <select className="select" defaultValue="posto">
            <option value="posto">Posto</option>
            <option value="oficina">Oficina</option>
            <option value="restaurante">Restaurante</option>
            <option value="ponto-de-apoio">Ponto de apoio</option>
          </select>
        </label>
        <label>
          Telefone comercial
          <input className="input" defaultValue="(11) 94000-0001" />
        </label>
        <label>
          WhatsApp para contato
          <input className="input" defaultValue="(11) 94000-0001" />
        </label>
      </div>

      <label style={{ display: "block", marginTop: 16 }}>
        Descricao do anuncio
        <textarea className="textarea" rows={4} defaultValue="Posto completo com diesel, patio vigiado, banho e conveniencia para quem precisa parar com seguranca e seguir viagem bem atendido." />
      </label>

      <div className="form-grid" style={{ marginTop: 16 }}>
        <label>
          Endereco
          <input className="input" defaultValue="BR-116, Km 224" />
        </label>
        <label>
          Cidade
          <input className="input" defaultValue="Guarulhos" />
        </label>
        <label>
          Estado
          <input className="input" defaultValue="SP" />
        </label>
        <label>
          Horario de atendimento
          <input className="input" defaultValue="Seg-Dom 24h" />
        </label>
      </div>
    </form>
  );
}
