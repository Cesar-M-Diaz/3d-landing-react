import { Container, TopLeft } from './styles';

export default function Overlay() {
  return (
    <Container>
      <TopLeft>
        <div className="landing">
          <h1>Tech-Prep</h1>
          <p>A collaborative interview prep platform</p>
          <button>Start</button>
        </div>
      </TopLeft>
    </Container>
  );
}
