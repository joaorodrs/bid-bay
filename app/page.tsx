import Image from "next/image";

import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="my-8 text-2xl font-bold">for you</h1>

      <section className="w-full space-y-4 px-4">
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <div className="flex w-full">
          <Button className="mx-auto px-8">load more</Button>
        </div>
      </section>

      <h1 id="recents" className="mb-8 mt-16 text-2xl font-bold">
        recents
      </h1>

      <section className="w-full space-y-4 px-4">
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://github.com/joaorodrs.png"
        />
        <div className="flex w-full">
          <Button className="mx-auto px-8">load more</Button>
        </div>
      </section>
    </main>
  );
}

interface ICardComponent {
  title: string;
  description: string;
  imageUrl: string;
}

const CardComponent = ({ title, description, imageUrl }: ICardComponent) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="relative h-64">
      <Image src={imageUrl} alt={title} fill />
    </CardContent>
    <CardFooter className="mt-6 justify-between">
      <Button>save post</Button>
      <Button variant="outline">stop following tag</Button>
    </CardFooter>
  </Card>
);
