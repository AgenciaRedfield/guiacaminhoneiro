export function LoginPage() {
  return (
    <main className="login-shell">
      <section className="panel login-card">
        <span className="sidebar-kicker">Acesse sua conta</span>
        <h1 style={{ fontSize: 52, marginTop: 18 }}>Entre no Guia Caminhoneiro</h1>
        <p style={{ marginTop: 14, color: "var(--muted)", lineHeight: 1.8 }}>
          Gerencie seus anuncios, acompanhe oportunidades e mantenha sua empresa visivel para quem roda todos os dias.
        </p>
        <div className="form-grid" style={{ marginTop: 24 }}>
          <label>
            E-mail
            <input className="input" defaultValue="motorista@guia.com" />
          </label>
          <label>
            Senha
            <input className="input" type="password" defaultValue="123456" />
          </label>
        </div>
        <button className="button" style={{ marginTop: 22, width: "100%" }}>Entrar</button>
      </section>
    </main>
  );
}
