import Link from "next/link";

import { CTABanner } from "../cta/CTABanner";
import { Section } from "../layout/Section";
import { Button } from "@/components/ui/button";

const Banner = () => (
  <Section>
    <CTABanner
      title="Support Ongoing Development with Your Contribution"
      subtitle="Donate Now"
      button={
        <Link href="/">
          <Button>Donate</Button>
        </Link>
      }
    />
  </Section>
);

export { Banner };
