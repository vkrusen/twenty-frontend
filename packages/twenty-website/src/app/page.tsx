import { ContentContainer } from './components/ContentContainer';

export default function Home() {
  return (
    <ContentContainer>
      <div style={{ minHeight: '60vh', marginTop: '50px' }}>
        Part of the website is built directly with Framer, including the
        homepage. <br />
        We use Clouflare to split the traffic between the two sites.
      </div>
    </ContentContainer>
  );
}
