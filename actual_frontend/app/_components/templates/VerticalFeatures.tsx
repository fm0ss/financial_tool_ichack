import { VerticalFeatureRow } from "../feature/VerticalFeatureRow";
import { Section } from "../layout/Section";

const VerticalFeatures = () => (
  <Section
    id="features"
    title="Key Features"
    description="Discover the power of our cutting-edge platform designed to elevate market analysis. Our key features are engineered to provide unparalleled precision and depth to your financial document analysis."
  >
    <VerticalFeatureRow
      title="Precise Sentiment Analysis"
      description="Uncover financial document nuances with our advanced sentiment analysis. Our machine learning model highlights key positive and negative sentences, ensuring a comprehensive understanding."
      image="/images/feature.svg"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Information Cards"
      description="Easily access deeper insights. Easily access profound insights. Hover over sentences to reveal cards backed by real-time online data, reinforcing sentiment analysis claims with curated source links."
      image="/images/feature2.svg"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="Dynamic Stock Data Graph"
      description="Explore real-time stock data with our integrated graph feature. Uncover valuable insights alongside extra cards presenting potential data points of interest, providing a holistic view of the current market scenario."
      image="/images/feature3.svg"
      imageAlt="Third feature alt text"
    />
  </Section>
);

export { VerticalFeatures };
