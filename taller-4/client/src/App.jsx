import { useEffect, useState } from 'react';
import { Alert, Badge, Card, CardBody, CardHeader, Col, Container, Row, Spinner } from 'reactstrap';

function App() {
  const [health, setHealth] = useState({ loading: true, data: null, error: '' });
  const [info, setInfo] = useState({ loading: true, data: null, error: '' });

  useEffect(() => {
    const load = async (path, setter) => {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        setter({ loading: false, data: await response.json(), error: '' });
      } catch (error) {
        setter({ loading: false, data: null, error: `${error.message}. Comprueba que la API Express esté iniciada.` });
      }
    };
    load('/api/health', setHealth);
    load('/api/info', setInfo);
  }, []);

  return (
    <main>
      <header className="hero">
        <Container className="hero-inner">
          <div className="eyebrow"><span className="eyebrow-dot" /> PROGRAMACIÓN WEB · CICLO 02, 2026</div>
          <h1>Taller <span>IV</span></h1>
          <p className="hero-copy">Frontend y API REST conectados con React y Express.</p>
          <div className="hero-tags"><Badge color="light" pill>Vite + React</Badge><Badge color="light" pill>Reactstrap</Badge><Badge color="light" pill>Express API</Badge></div>
        </Container>
      </header>

      <Container className="content">
        <section aria-labelledby="health-heading" className="mb-4">
          <div className="section-label">01 · ESTADO DEL SERVICIO</div>
          <Card className="health-card">
            <CardBody className="health-body">
              <div className={`status-icon ${health.data?.ok ? 'is-online' : health.error ? 'is-error' : ''}`}>
                <i className={`fa-solid ${health.data?.ok ? 'fa-check' : health.error ? 'fa-triangle-exclamation' : 'fa-heart-pulse'}`} aria-hidden="true" />
              </div>
              <div className="health-copy">
                <h4 id="health-heading">Estado de la API</h4>
                {health.loading ? <p><Spinner size="sm" /> Consultando /api/health…</p>
                  : health.error ? <p className="text-danger mb-0">{health.error}</p>
                    : <p className="mb-0">{health.data.message}</p>}
              </div>
              {!health.loading && <Badge color={health.data?.ok ? 'success' : 'danger'} pill>{health.data?.ok ? 'EN LÍNEA' : 'SIN CONEXIÓN'}</Badge>}
            </CardBody>
          </Card>
        </section>

        <section aria-labelledby="info-heading">
          <div className="section-label">02 · INFORMACIÓN DEL EQUIPO</div>
          <Card className="info-card">
            <CardHeader className="info-header">
              <div className="info-header-icon"><i className="fa-solid fa-users" aria-hidden="true" /></div>
              <div><h2 id="info-heading">Integrantes</h2><p>Datos recibidos desde el endpoint <code>/api/info</code></p></div>
            </CardHeader>
            <CardBody>
              {info.loading ? <div className="loading-state"><Spinner /> <span>Cargando información…</span></div>
                : info.error ? <Alert color="danger" className="mb-0">{info.error}</Alert>
                  : <Row className="g-3">{info.data.integrantes.map((person, index) => (
                    <Col md="6" key={`${person.nombre}-${index}`}>
                      <Card className="person-card h-100"><CardBody>
                        <div className="person-top"><div className="avatar">{person.nombre.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()}</div><Badge color="primary" pill>INTEGRANTE {String(index + 1).padStart(2, '0')}</Badge></div>
                        <h3>{person.nombre}</h3>
                        <div className="person-detail"><i className="fa-regular fa-calendar" aria-hidden="true" /><span><strong>Edad</strong>{person.edad} años</span></div>
                        <div className="person-detail"><i className="fa-solid fa-graduation-cap" aria-hidden="true" /><span><strong>Carrera</strong>{person.carrera}</span></div>
                        <div className="person-detail"><i className="fa-solid fa-book-open" aria-hidden="true" /><span><strong>Materias aprobadas</strong>{person.materiasAprobadas}</span></div>
                      </CardBody></Card>
                    </Col>
                  ))}</Row>}
              {!info.loading && info.data && <p className="api-note"><i className="fa-solid fa-circle-info" aria-hidden="true" /> {info.data.message}</p>}
            </CardBody>
          </Card>
        </section>
        <footer>UCA · Programación Web <span>·</span> Taller IV <span>·</span> 2026</footer>
      </Container>
    </main>
  );
}

export default App;
