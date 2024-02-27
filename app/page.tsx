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

      <h1 className="sticky top-36 z-[5] mb-8 mt-16 rounded-full bg-white px-4 py-2 text-2xl font-bold">
        recents
      </h1>

      <section className="mb-20 w-full space-y-4 px-4">
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://thispersondoesnotexist.com/"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://thispersondoesnotexist.com/"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://thispersondoesnotexist.com/"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://thispersondoesnotexist.com/"
        />
        <CardComponent
          title="acer monitor"
          description="tech tools"
          imageUrl="https://thispersondoesnotexist.com/"
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
  <Card className="w-full sm:mx-auto sm:flex sm:max-w-[500px] sm:justify-between">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="sm:flex sm:h-full sm:flex-col sm:justify-between">
        <p>{description}</p>
        <div className="hidden sm:block sm:space-y-2">
          <Button>save post</Button>
          <Button
            variant="outline"
            className="border-red-200 text-red-500 hover:bg-red-100 hover:text-red-500"
          >
            stop following tag
          </Button>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent className="relative h-64 sm:w-1/2">
      <Image src={imageUrl} alt={title} fill className="sm:rounded-r-xl" />
    </CardContent>
    <CardFooter className="mt-6 justify-between sm:hidden sm:flex-none">
      <Button>save post</Button>
      <Button
        variant="outline"
        className="border-red-200 text-red-500 hover:bg-red-100 hover:text-red-500"
      >
        stop following tag
      </Button>
    </CardFooter>
  </Card>
);
